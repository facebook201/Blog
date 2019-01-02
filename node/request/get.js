

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const util = require('util');

// http.createServer((request, response) => {
//   response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
//   response.end(util.inspect(url.parse(request.url, true)));
// }).listen(8088);

// POST

http.createServer((req, res) => {
  let post = '';
  req.on('data', chunk => {
    post += chunk;
  });

  req.on('end', function() {
    post = querystring.parse(post);
    res.end(util.inspect(post));
  });
});




 