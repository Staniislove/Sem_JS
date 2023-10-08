import http from 'http';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;

  if (filePath === './') {
    filePath = './index.html';
  }

  const extname = path.extname(filePath);
  let contentType = 'text/html';

  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.mjs':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile('./404.html', (err, notFoundContent) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(notFoundContent, 'utf-8');
        });
      } else {
        res.writeHead(500);
        res.end('Internal Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});

const openCommand = process.platform === 'win32' ? 'start' : 'open';

const openIndexHtml = () => {
  exec(`${openCommand} http://localhost:3000`);

  // Загрузка модулей после открытия страницы
  setTimeout(() => {
    import('./main.mjs');
    import('./data.mjs');
    import('./jsonDecoder.mjs');
  }, 2000);
};

setTimeout(openIndexHtml, 2000); // Задержка в 2 секунды для запуска браузера после запуска сервера