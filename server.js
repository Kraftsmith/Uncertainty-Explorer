const express = require('express');
const path = require('path');
const multer = require('multer');
const db = require('./db/database');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log('Request received for:', req.originalUrl);
    next();
});

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Basic setup for multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API Routes
app.post('/api/users', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ 
                success: false, 
                error: 'Email is required' 
            });
        }

        const user = await db.createUser(email);
        res.json({ 
            success: true, 
            user: { 
                id: user.id, 
                email: user.email 
            } 
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to create user' 
        });
    }
});

app.post('/api/assessments/stacey', async (req, res) => {
    try {
        const { userId, assessment } = req.body;
        const id = await db.saveStaceyAssessment(userId, assessment);
        res.json({ success: true, assessmentId: id });
    } catch (error) {
        console.error('Error saving Stacey assessment:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to save assessment' 
        });
    }
});

app.post('/api/assessments/cynefin', async (req, res) => {
    try {
        const { userId, assessment } = req.body;
        const id = await db.saveCynefinAssessment(userId, assessment);
        res.json({ success: true, assessmentId: id });
    } catch (error) {
        console.error('Error saving Cynefin assessment:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to save assessment' 
        });
    }
});

app.get('/api/users/:userId/assessments', async (req, res) => {
    try {
        const { userId } = req.params;
        const assessments = await db.getUserAssessments(userId);
        res.json({ success: true, assessments });
    } catch (error) {
        console.error('Error fetching assessments:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch assessments' 
        });
    }
});

// --- Routes to serve HTML pages ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'View', 'index.html'));
});

app.get('/stacey', (req, res) => {
    res.sendFile(path.join(__dirname, 'View', 'stacey.html'));
});

app.get('/cynefin', (req, res) => {
    res.sendFile(path.join(__dirname, 'View', 'Cynefin.html'));
});

app.get('/summary', (req, res) => {
    res.sendFile(path.join(__dirname, 'View', 'summary.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

