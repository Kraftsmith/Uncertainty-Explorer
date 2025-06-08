-- Users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Stacey Matrix assessments
CREATE TABLE stacey_assessments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_score REAL NOT NULL,
    technical_score REAL NOT NULL,
    team_score REAL NOT NULL,
    area_result TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Cynefin Framework assessments
CREATE TABLE cynefin_assessments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    domain TEXT NOT NULL,
    decision_score REAL NOT NULL,
    cause_effect_score REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Store individual question responses for Stacey Matrix
CREATE TABLE stacey_responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    assessment_id INTEGER NOT NULL,
    question_id TEXT NOT NULL,
    score REAL NOT NULL,
    category TEXT NOT NULL, -- 'product', 'technical', or 'team'
    FOREIGN KEY (assessment_id) REFERENCES stacey_assessments (id)
);

-- Store individual question responses for Cynefin Framework
CREATE TABLE cynefin_responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    assessment_id INTEGER NOT NULL,
    question_id TEXT NOT NULL,
    score REAL NOT NULL,
    category TEXT NOT NULL, -- 'decision' or 'cause_effect'
    FOREIGN KEY (assessment_id) REFERENCES cynefin_assessments (id)
);

-- Indexes for better query performance
CREATE INDEX idx_stacey_user ON stacey_assessments(user_id);
CREATE INDEX idx_cynefin_user ON cynefin_assessments(user_id);
CREATE INDEX idx_stacey_responses ON stacey_responses(assessment_id);
CREATE INDEX idx_cynefin_responses ON cynefin_responses(assessment_id);
