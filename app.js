const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Static folder
app.use('/images', express.static(path.join(__dirname, 'images')));

// Home Page
app.get("/", (req, res) => {
    res.send(`
        <h1>Welcome to Sanchit Technologies 🚀</h1>
    `);
});

// About Page
app.get("/about", (req, res) => {
    res.send("About Sanchit Technologies");
});

// Contact Page
app.get("/contact", (req, res) => {
    res.send("Contact Us");
});

// API Route
app.get("/api/info", (req, res) => {
    res.json({
        company: "Sanchit Technologies",
        focus: "DevOps & Cloud Training"
    });
});

// Function for testing
function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return NaN;
  }
  return a + b;
}

function multiply(a, b) {
    if (a === 0 || b === 0) return 0;
    return a * b;
}

// ✅ EXPORT BOTH
module.exports = { app, add, multiply };

// ✅ Start server ONLY when running directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
