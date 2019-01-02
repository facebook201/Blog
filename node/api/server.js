const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
  const url = request.url;

  if (url === '/') {
    fs.readFile('./index.html', (err, data) => {
      if (!err) {
        response.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
        response.end(data);
      } else {
        throw err;
      }
    });
  } else if (url === '/data') {
    // 如果获取到的路由是/data 就读取 data.json
    fs.readFile('./data.json', (err, data) => {
      if (!err) {
        response.writeHead(200, {"Content-Type": "application/json"});
        response.end(data);
      } else {
        throw err;
      }
    });
  }
});

server.listen(8888);

