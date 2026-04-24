const pdf = require("html-pdf");

const html = `
<h1>Test Report</h1>
<p>Build: ${process.env.BUILD_NUMBER || "local"}</p>
<p>Status: SUCCESS</p>
<p>Generated from Jenkins Pipeline</p>
`;

pdf.create(html).toFile("report.pdf", function(err, res) {
  if (err) return console.log(err);
  console.log("PDF generated:", res.filename);
});
