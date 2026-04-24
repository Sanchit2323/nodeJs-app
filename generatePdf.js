const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const html = `
    <h1>Test Report</h1>
    <p>Build: ${process.env.BUILD_NUMBER}</p>
    <p>Status: SUCCESS</p>
  `;

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setContent(html);

  await page.pdf({
    path: 'report.pdf',
    format: 'A4'
  });

  await browser.close();
})();
