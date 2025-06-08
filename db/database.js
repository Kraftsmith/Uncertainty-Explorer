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

        this.db = new sqlite3.Database(path.join(dbDir, 'UncertaintyExplorer.db'), (err) => {
            if (err) {
                console.error('Error opening database:', err);
            } else {
                console.log('Connected to database');
                this.initializeDatabase();
            }
        });
    }

    initializeDatabase() {
        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        this.db.exec(schema, (err) => {
            if (err) {
                console.error('Error initializing database:', err);
            } else {
                console.log('Database schema initialized');
            }
        });
    }

    // User operations
    createUser(email) {
        return new Promise((resolve, reject) => {
            const sqlInsert = 'INSERT OR IGNORE INTO users (email) VALUES (?)';
            this.db.run(sqlInsert, [email], function(err) { // Use 'function' for 'this' context
                if (err) {
                    return reject(err);
                } else {
                    // If no row was inserted (this.changes === 0), it means the user likely already exists
                    // due to the UNIQUE constraint on email and IGNORE clause.
                    if (this.changes === 0) {
                        const sqlSelect = 'SELECT id, email FROM users WHERE email = ?';
                        this.db.get(sqlSelect, [email], (selectErr, row) => {
                            if (selectErr) {
                                return reject(selectErr);
                            }
                            if (row && row.id) { // Ensure row exists and has an id
                                resolve(row);
                            } else {
                                // This case should ideally not be reached if INSERT OR IGNORE
                                // failed due to a UNIQUE constraint, as the row should exist.
                                reject(new Error(`User with email ${email} not found after IGNORE, and not inserted.`));
                            }
                        });
                    } else {
                        // New user was inserted
                        resolve({ id: this.lastID, email: email });
                    }
                }
            });
        });
    }

    // Assessment operations
    saveStaceyAssessment(userId, assessment) {
        return new Promise((resolve, reject) => {
            this.db.run('BEGIN TRANSACTION');
            
            const sql = `INSERT INTO stacey_assessments 
                        (user_id, product_score, technical_score, team_score, area_result) 
                        VALUES (?, ?, ?, ?, ?)`;
            
            this.db.run(sql, 
                [userId, assessment.productScore, assessment.technicalScore, 
                 assessment.teamScore, assessment.areaResult], 
                function(err) {
                    if (err) {
                        this.db.run('ROLLBACK');
                        reject(err);
                        return;
                    }

                    const assessmentId = this.lastID;
                    const responses = assessment.responses || [];
                    
                    // Insert individual responses
                    const responsePromises = responses.map(response => {
                        return new Promise((resolve, reject) => {
                            const sql = `INSERT INTO stacey_responses 
                                       (assessment_id, question_id, score, category) 
                                       VALUES (?, ?, ?, ?)`;
                            this.db.run(sql, 
                                [assessmentId, response.questionId, 
                                 response.score, response.category], 
                                (err) => {
                                    if (err) reject(err);
                                    else resolve();
                                });
                        });
                    });

                    Promise.all(responsePromises)
                        .then(() => {
                            this.db.run('COMMIT');
                            resolve(assessmentId);
                        })
                        .catch(err => {
                            this.db.run('ROLLBACK');
                            reject(err);
                        });
            });
        });
    }

    saveCynefinAssessment(userId, assessment) {
        return new Promise((resolve, reject) => {
            this.db.run('BEGIN TRANSACTION');
            
            const sql = `INSERT INTO cynefin_assessments 
                        (user_id, domain, decision_score, cause_effect_score) 
                        VALUES (?, ?, ?, ?)`;
            
            this.db.run(sql, 
                [userId, assessment.domain, assessment.decisionScore, 
                 assessment.causeEffectScore], 
                function(err) {
                    if (err) {
                        this.db.run('ROLLBACK');
                        reject(err);
                        return;
                    }

                    const assessmentId = this.lastID;
                    const responses = assessment.responses || [];
                    
                    // Insert individual responses
                    const responsePromises = responses.map(response => {
                        return new Promise((resolve, reject) => {
                            const sql = `INSERT INTO cynefin_responses 
                                       (assessment_id, question_id, score, category) 
                                       VALUES (?, ?, ?, ?)`;
                            this.db.run(sql, 
                                [assessmentId, response.questionId, 
                                 response.score, response.category], 
                                (err) => {
                                    if (err) reject(err);
                                    else resolve();
                                });
                        });
                    });

                    Promise.all(responsePromises)
                        .then(() => {
                            this.db.run('COMMIT');
                            resolve(assessmentId);
                        })
                        .catch(err => {
                            this.db.run('ROLLBACK');
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
