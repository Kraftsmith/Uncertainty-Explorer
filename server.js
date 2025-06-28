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

// Log all requests for debugging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Serve static files first
app.use('/JavaScript', express.static(path.join(__dirname, 'JavaScript')));
app.use('/Data', express.static(path.join(__dirname, 'Data')));
app.use('/View', express.static(path.join(__dirname, 'View')));
app.use('/test', express.static(path.join(__dirname, 'test'))); // Serve test directory
app.use('/Context', express.static(path.join(__dirname, 'Context'))); // Serve context directory
app.use(express.static(path.join(__dirname))); // For other root files like common-styles.css

// Then HTML routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'View', 'index.html'));
});

app.get(['/stacey', '/stacey.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'View', 'stacey.html'));
});

app.get(['/cynefin', '/cynefin.html', '/Cynefin', '/Cynefin.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'View', 'Cynefin.html'));
});

app.get(['/summary', '/summary.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'View', 'summary.html'));
});

// Route for the Decision Making Table test page
app.get(['/test', '/test.html', '/test-decision-matrix', '/test-decision-matrix.html'], (req, res) => {
    console.log('Test page requested:', req.url);
    res.sendFile(path.join(__dirname, 'test', 'test-decision-matrix-complete.html'));
});

// Route for the debug table test page
app.get(['/debug', '/debug.html', '/debug-table'], (req, res) => {
    console.log('Debug page requested:', req.url);
    res.sendFile(path.join(__dirname, 'test', 'debug-table-test.html'));
});

// Route for the quick table test page
app.get(['/quick', '/quick.html', '/quick-test'], (req, res) => {
    console.log('Quick test page requested:', req.url);
    res.sendFile(path.join(__dirname, 'test', 'quick-table-test.html'));
});

// Route for simple table test
app.get(['/simple', '/simple.html', '/simple-test'], (req, res) => {
    console.log('Simple test page requested:', req.url);
    res.sendFile(path.join(__dirname, 'test', 'simple-table-test.html'));
});

// Route for the deep debug page
app.get(['/deep-debug', '/deep-debug.html'], (req, res) => {
    console.log('Deep debug page requested:', req.url);
    res.sendFile(path.join(__dirname, 'test', 'deep-debug.html'));
});

// Debug route to check if server is working
app.get('/debug', (req, res) => {
    res.json({ 
        message: 'Server is working',
        timestamp: new Date().toISOString(),
        availableRoutes: ['/test', '/test.html', '/test-decision-matrix', '/summary', '/stacey', '/cynefin', '/']
    });
});

// Additional request logging for debugging (after routes)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Basic setup for multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API Routes
app.post('/api/users', async (req, res) => {
    try {
        const { email, projectName } = req.body;
        if (!email || !projectName) {
            return res.status(400).json({ 
                success: false, 
                error: 'Email and project name are required' 
            });
        }

        const user = await db.createUser(email, projectName);
        res.json({ 
            success: true, 
            user: { 
                id: user.id, 
                email: user.email,
                project_name: user.project_name
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

// API Routes for assessments
app.post('/api/assessments/stacey', async (req, res) => {
    try {
        const { userId, assessment } = req.body;
        if (!userId || !assessment) {
            return res.status(400).json({
                success: false,
                error: 'User ID and assessment data are required'
            });
        }

        const id = await db.saveStaceyAssessment(userId, assessment);
        res.json({ 
            success: true, 
            id: id 
        });
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

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

