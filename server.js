const express = require('express');
const path = require('path');
const multer = require('multer');
const db = require('./db/database');
const nodemailer = require('nodemailer');


const app = express();
const port = process.env.PORT || 3000;


// Middleware to parse JSON and URL-encoded data (must be before all routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/email-summary', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }
    try {
        // Read the summary.html file
        const fs = require('fs');
        const summaryPath = path.join(__dirname, 'View', 'summary.html');
        let html = fs.readFileSync(summaryPath, 'utf8');

        // Optionally, you can inject dynamic data here if needed

        // Setup nodemailer transporter (move this inside the route for clarity and to avoid undefined error)
        // IMPORTANT: MailerSend SMTP does NOT use API tokens. You must use SMTP username/password and a verified sender domain.
        // Update the "from" address to match a verified domain in your MailerSend account.
        const transporter = nodemailer.createTransport({
            host: 'smtp.mailersend.net',
            port: 587,
            secure: false, // use STARTTLS, not SSL
            auth: {
                user: 'MS_T6SkVy@test-zkq340ej8d2gd796.mlsender.net', // Your MailerSend SMTP username
                pass: 'mssp.Kgf8e1K.vywj2lp5exmg7oqz.jPEIvVb', // Your MailerSend SMTP password
            },
        });

        await transporter.sendMail({
            from: 'noreply@test-zkq340ej8d2gd796.mlsender.net', // Use a verified sender domain
            to: email,
            subject: 'Your Delivery Summary',
            html,
        });
        res.json({ message: 'Summary emailed successfully.' });
    } catch (err) {
        // Provide more detailed error feedback for troubleshooting
        console.error('Email error:', err);
        if (err && err.responseCode === 450) {
            res.status(500).json({ error: 'Failed to send email: The sender domain is not verified in MailerSend. Please verify your domain in MailerSend and use a matching "from" address.' });
        } else {
            res.status(500).json({ error: 'Failed to send email.' });
        }
    }
});




// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the project root so /common-styles.css and other root-level assets work
// Only serve the project root, not the View directory, to avoid conflicts with HTML routes
app.use(express.static(__dirname));

// --- HTML Page Routes ---
// IMPORTANT: These are placed BEFORE static middleware to ensure they are matched first.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'View', 'index.html'));
});

app.get(['/stacey', '/View/stacey.html'], (req, res) => {
    console.log("--- DEBUG: /stacey route handler triggered ---");
    const filePath = path.join(__dirname, 'View', 'stacey.html');
    console.log(`Attempting to serve file from: ${filePath}`);

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(`Error sending file: ${err.message}`);
            // Ensure a response is sent to the client even on error
            if (!res.headersSent) {
                res.status(err.status || 500).send("Error serving the requested file.");
            }
        }
    });
});

app.get(['/cynefin', '/View/cynefin.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'View', 'Cynefin.html'));
});

app.get(['/summary', '/View/summary.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'View', 'summary.html'));
});

// --- Static Asset Routes ---
// Serve assets from their specific directories.
// IMPORTANT: We are NOT serving the 'View' directory statically anymore to avoid conflicts with page routes.
app.use('/JavaScript', express.static(path.join(__dirname, 'JavaScript')));
app.use('/Data', express.static(path.join(__dirname, 'Data')));
app.use('/test', express.static(path.join(__dirname, 'test')));
app.use('/Context', express.static(path.join(__dirname, 'Context')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// --- Test Page Routes ---
// Standardizing all test routes to handle clean URLs and direct paths
app.get(['/test-decision-matrix', '/test/test-decision-matrix-complete.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'test', 'test-decision-matrix-complete.html'));
});

app.get(['/debug-table', '/test/debug-table-test.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'test', 'debug-table-test.html'));
});

app.get(['/quick-test', '/test/quick-table-test.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'test', 'quick-table-test.html'));
});

app.get(['/simple-test', '/test/simple-table-test.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'test', 'simple-table-test.html'));
});

app.get(['/deep-debug', '/test/deep-debug.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'test', 'deep-debug.html'));
});


// --- API and Other Routes ---

// Basic setup for multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API endpoint to get all practices
app.get('/api/practices', (req, res) => {
    const query = "SELECT * FROM delivery_practices";
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ practices: rows });
    });
});

// API endpoint to get results descriptions
app.get('/api/results-descriptions', (req, res) => {
    const filePath = path.join(__dirname, 'Data', 'results-descriptions.json');
    res.sendFile(filePath);
});

// Endpoint to save assessment results
app.post('/save-assessment', upload.none(), (req, res) => {
    const { type, results } = req.body;
    console.log('Received data for saving:', { type, results });

    if (!type || !results) {
        return res.status(400).send('Missing assessment type or results.');
    }

    const parsedResults = JSON.parse(results);
    const { area, product, technical, team, timestamp } = parsedResults;

    const sql = `INSERT INTO stacey_results (area, product_uncertainty, technical_uncertainty, team_complexity, timestamp)
                 VALUES (?, ?, ?, ?, ?)`;
    const params = [area, product.average, technical.average, team.average, timestamp];

    db.run(sql, params, function(err) {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).send('Failed to save assessment results.');
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
        res.status(200).send({ message: 'Assessment saved successfully.', id: this.lastID });
    });
});

// --- Server Start ---
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

