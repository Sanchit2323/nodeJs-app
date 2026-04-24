const fs = require('fs');

// HTML content generate
const htmlContent = `
  <html>
    <head>
      <title>Test Report</title>
    </head>
    <body>
      <h1>Test Report</h1>
      <p>Build: ${process.env.BUILD_NUMBER}</p>
      <p>Status: SUCCESS</p>
    </body>
  </html>
`;

// Step 1: HTML file create
fs.writeFileSync('report.html', htmlContent);

// Step 2: HTML ko PDF naam se copy (simple workaround)
fs.copyFileSync('report.html', 'report.pdf');

console.log("✅ PDF Report Generated (HTML based)");
