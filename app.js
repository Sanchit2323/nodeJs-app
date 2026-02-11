const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve existing images folder
app.use('/images', express.static(path.join(__dirname, 'images')));

// Home Page
app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Kani Technologies</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f6f9;
            }
            header {
                background-color: #1e3a8a;
                color: white;
                padding: 20px;
                text-align: center;
            }
            header img {
                width: 140px;
                margin-bottom: 10px;
            }
            nav {
                background-color: #111827;
                padding: 10px;
                text-align: center;
            }
            nav a {
                color: white;
                margin: 0 15px;
                text-decoration: none;
                font-weight: bold;
            }
            nav a:hover {
                color: #38bdf8;
            }
            section {
                padding: 40px;
                text-align: center;
            }
            footer {
                background-color: #1e3a8a;
                color: white;
                text-align: center;
                padding: 15px;
                position: fixed;
                bottom: 0;
                width: 100%;
            }
        </style>
    </head>
    <body>

        <header>
            <img src="/images/kani-logo.jpg" alt="Kani Logo">
            <h1>Kani Technologies</h1>
            <p>DevOps | Cloud | Automation | CI/CD</p>
        </header>

        <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
        </nav>

        <section>
            <h2>Welcome to Kani Technologies 🚀</h2>
            <p>We provide professional DevOps and Cloud training solutions.</p>
        </section>

        <footer>
            📞 +91-9773819210 | 📧 devopstraining@gmail.com  
            <br>© 2026 Kani Technologies | All Rights Reserved
        </footer>

    </body>
    </html>
    `);
});

// About Page
app.get("/about", (req, res) => {
    res.send(`
    <h1>About Kani Technologies</h1>
    <p>We specialize in DevOps tools like Docker, Kubernetes, Jenkins, AWS, Terraform and more.</p>
    <a href="/">Back to Home</a>
    `);
});

// Contact Page
app.get("/contact", (req, res) => {
    res.send(`
    <h1>Contact Us</h1>
    <p>📞 +91-9773819210</p>
    <p>📧 devopstraining@gmail.com</p>
    <a href="/">Back to Home</a>
    `);
});

// API Route
app.get("/api/info", (req, res) => {
    res.json({
        company: "Kani Technologies",
        focus: "DevOps & Cloud Training",
        contact: "9773819210",
        email: "devopstraining@gmail.com"
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Kani Technologies website running at http://localhost:${PORT}`);
});

