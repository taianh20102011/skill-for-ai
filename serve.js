const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const FILE = path.join(__dirname, 'index.html');

const server = http.createServer((req, res) => {
  fs.readFile(FILE, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Error loading index.html: ' + err.message);
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n✨ Porcelain Studio Web App is running at: http://localhost:${PORT}`);
  console.log(`👉 Press Ctrl+C to stop.\n`);
});
