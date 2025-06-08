const express = require('express');
const path = require('path');
const multer = require('multer'); // For handling PDF blob from client
// const nodemailer = require('nodemailer'); // For sending email

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS) from the current directory
app.use(express.static(path.join(__dirname)));

// Request logging middleware - moved to execute for all requests before routes
app.use((req, res, next) => {
    console.log('Request received for:', req.originalUrl);
    next(); // Important to call next() to pass control to the next middleware/route
});

// --- API Endpoints ---

// Basic setup for multer to handle file uploads (the PDF blob)
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

// Endpoint to handle sending email (as seen in summary.html)
app.post('/api/send-email', upload.single('pdf'), async (req, res) => {
    const { email, subject, message } = req.body;
    const pdfFile = req.file; // This is the PDF blob

    console.log('Received email request:');
    console.log('To:', email);
    console.log('Subject:', subject);
    console.log('Message:', message);
    if (pdfFile) {
        console.log('PDF attached:', pdfFile.originalname, pdfFile.mimetype, pdfFile.size, 'bytes');
    }

    // **Placeholder for actual email sending logic**
    // You would use nodemailer here to send the email with the PDF attachment.
    // Example (requires nodemailer setup and credentials):
    /*
    try {
        // Configure your transporter (e.g., using SMTP or a service like SendGrid)
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Or your email provider
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password-or-app-password'
            }
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: subject,
            text: message,
            attachments: pdfFile ? [{
                filename: pdfFile.originalname || 'diagnose-summary.pdf',
                content: pdfFile.buffer,
                contentType: pdfFile.mimetype || 'application/pdf'
            }] : []
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
    */

    // For now, just send a success response
    res.json({ success: true, message: 'Email request received (not actually sent by this placeholder).' });
});

// --- Routes to serve your HTML pages ---
// It's good practice to define routes for your main pages,
// though express.static will serve them if names match.

app.get('/', (req, res) => {
    // Assuming your main landing page is now index.html in the View folder
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

app.get('/approachbuilder', (req, res) => {
    // Assuming 'deliveryapproachbuilder.html' is the correct one
    res.sendFile(path.join(__dirname, 'View', 'deliveryapproachbuilder.html'));
});

app.get('/radar', (req, res) => {
    res.sendFile(path.join(__dirname, 'View', 'radar.html'));
});

app.get('/home', (req, res) => { // If you have a specific home.html in View
    res.sendFile(path.join(__dirname, 'View', 'home.html'));
});

// Add other routes as needed for agilequestions.html, etc.
// If you have an 'agilequestions.html', add:
// app.get('/agilequestions', (req, res) => {
//     res.sendFile(path.join(__dirname, 'agilequestions.html'));
// });


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});