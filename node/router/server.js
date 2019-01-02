
const http = require('http');

const url = require('url');

function start() {}

function onRequest(request, response) {
    let pathname = url.parse(request.url).pathname;
    console.log('请求' + pathname + ' received.');
    response.writeHead(200, { "Content-Type": "text/plain"});
    response.write('hello world');
    response.end();
}


http.createServer(onRequest).listen(8088);

exports.start = start;

