const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument();

doc.pipe(fs.createWriteStream('report.pdf'));

doc.fontSize(20).text('Test Report', { align: 'center' });

doc.moveDown();

doc.fontSize(12).text(`Build: ${process.env.BUILD_NUMBER || 'Local'}`);
doc.text(`Status: SUCCESS`);
doc.text(`Generated At: ${new Date().toLocaleString()}`);

doc.end();

console.log("✅ REAL PDF generated successfully");
