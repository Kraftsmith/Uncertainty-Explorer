const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

class Database {
    constructor() {
        // Create db directory if it doesn't exist
        const dbDir = path.join(__dirname);
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir);
        }

        const dbPath = path.join(dbDir, 'UncertaintyExplorer.db');
        
        this.db = new sqlite3.Database(dbPath, 
            sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, 
            (err) => {
                if (err) {
                    console.error('Error opening database:', err);
                } else {
                    console.log('Connected to database');
                    this.initializeDatabase();
                }
            }
        );

        // Enable foreign keys
        this.db.run('PRAGMA foreign_keys = ON');
    }

    initializeDatabase() {
        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        
        // Run all statements without transaction since we're creating tables
        const statements = schema.split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0);
        
        statements.forEach(statement => {
            this.db.run(statement, (err) => {
                if (err && !err.message.includes('already exists')) {
                    console.error('Error executing statement:', err);
                }
            });
        });
        
        console.log('Database schema initialized successfully');
    }

    // User operations
    createUser(email, projectName) {
        return new Promise((resolve, reject) => {
            const db = this.db; // Store reference to this.db
            
            const sqlInsert = 'INSERT OR IGNORE INTO users (email, project_name) VALUES (?, ?)';
            db.run(sqlInsert, [email, projectName], function(err) {
                if (err) {
                    return reject(err);
                }
                
                // If no row was inserted, the user might already exist
                if (this.changes === 0) {
                    const sqlSelect = 'SELECT id, email, project_name FROM users WHERE email = ?';
                    db.get(sqlSelect, [email], (selectErr, row) => {
                        if (selectErr) {
                            return reject(selectErr);
                        }
                        if (row && row.id) {
                            // Update project name if it's different
                            if (row.project_name !== projectName) {
                                db.run('UPDATE users SET project_name = ? WHERE id = ?', 
                                    [projectName, row.id], (updateErr) => {
                                    if (updateErr) {
                                        console.error('Error updating project name:', updateErr);
                                    }
                                });
                            }
                            resolve(row);
                        } else {
                            reject(new Error(`User with email ${email} not found after IGNORE, and not inserted.`));
                        }
                    });
                } else {
                    // New user was inserted
                    resolve({ id: this.lastID, email: email, project_name: projectName });
                }
            });
        });
    }

    // Assessment operations
    saveStaceyAssessment(userId, assessment) {
        return new Promise((resolve, reject) => {
            const db = this.db;
            db.serialize(() => {
                db.run('BEGIN TRANSACTION');

                const sql = `INSERT INTO stacey_assessments 
                    (user_id, product_score, technical_score, team_score, area_result) 
                    VALUES (?, ?, ?, ?, ?)`;

                db.run(sql, [
                    userId, 
                    assessment.productScore, 
                    assessment.technicalScore, 
                    assessment.teamScore,
                    assessment.area
                ], function(err) {
                    if (err) {
                        console.error('Error inserting assessment:', err);
                        db.run('ROLLBACK');
                        return reject(err);
                    }

                    const assessmentId = this.lastID;

                    // Insert individual responses if they exist
                    const responses = assessment.responses || [];
                    const responsePromises = responses.map(response => {
                        return new Promise((resolveResponse, rejectResponse) => {
                            const responseSql = `INSERT INTO stacey_responses 
                                (assessment_id, question_id, score, category) 
                                VALUES (?, ?, ?, ?)`;
                            
                            db.run(responseSql, [
                                assessmentId,
                                response.questionId,
                                response.score,
                                response.category
                            ], (err) => {
                                if (err) rejectResponse(err);
                                else resolveResponse();
                            });
                        });
                    });

                    Promise.all(responsePromises)
                        .then(() => {
                            db.run('COMMIT', (commitErr) => {
                                if (commitErr) {
                                    console.error('Error committing transaction:', commitErr);
                                    db.run('ROLLBACK');
                                    reject(commitErr);
                                } else {
                                    resolve(assessmentId);
                                }
                            });
                        })
                        .catch(err => {
                            console.error('Error saving responses:', err);
                            db.run('ROLLBACK');
                            reject(err);
                        });
                });
            });
        });
    }    saveCynefinAssessment(userId, assessment) {
        return new Promise((resolve, reject) => {
            const db = this.db;
            db.run('BEGIN TRANSACTION');
            
            const sql = `INSERT INTO cynefin_assessments 
                        (user_id, domain, decision_score, cause_effect_score) 
                        VALUES (?, ?, ?, ?)`;
            
            db.run(sql, 
                [userId, assessment.domain, assessment.decisionScore, 
                 assessment.causeEffectScore], 
                function(err) {
                    if (err) {
                        db.run('ROLLBACK');
                        reject(err);
                        return;
                    }

                    const assessmentId = this.lastID;
                    const responses = assessment.responses || [];
                    
                    // Insert individual responses
                    const responsePromises = responses.map(response => {
                        return new Promise((resolveResponse, rejectResponse) => {
                            const responseSql = `INSERT INTO cynefin_responses 
                                       (assessment_id, question_id, score, category) 
                                       VALUES (?, ?, ?, ?)`;
                            db.run(responseSql, 
                                [assessmentId, response.questionId, 
                                 response.score, response.category], 
                                (err) => {
                                    if (err) rejectResponse(err);
                                    else resolveResponse();
                                });
                        });
                    });

                    Promise.all(responsePromises)
                        .then(() => {
                            db.run('COMMIT');
                            resolve(assessmentId);
                        })
                        .catch(err => {
                            db.run('ROLLBACK');
                            reject(err);
                        });
            });
        });
    }

    // Get user's assessment history
    getUserAssessments(userId) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT 
                    'stacey' as type,
                    s.id,
                    s.product_score,
                    s.technical_score,
                    s.team_score,
                    s.area_result,
                    s.created_at
                FROM stacey_assessments s
                WHERE s.user_id = ?
                UNION ALL
                SELECT 
                    'cynefin' as type,
                    c.id,
                    c.domain,
                    c.decision_score,
                    c.cause_effect_score,
                    NULL as team_score,
                    c.created_at
                FROM cynefin_assessments c
                WHERE c.user_id = ?
                ORDER BY created_at DESC
            `;
            
            this.db.all(sql, [userId, userId], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }
}

module.exports = new Database();
