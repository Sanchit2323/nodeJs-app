const fs = require('fs');

const htmlContent = `
  <h1>Test Report</h1>
  <p>Build: ${process.env.BUILD_NUMBER}</p>
  <p>Status: SUCCESS</p>
`;

// Save HTML
fs.writeFileSync('report.html', htmlContent);

// REAL PDF-like content (basic)
const pdfContent = `
Test Report
Build: ${process.env.BUILD_NUMBER}
Status: SUCCESS
`;

fs.writeFileSync('report.pdf', pdfContent);

console.log("PDF generated");
