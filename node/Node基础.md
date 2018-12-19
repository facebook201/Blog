### Node



Nodejs 的组成部分。

* 引入required模块 可以使用require指令来载入Nodejs模块
* 创建服务器 服务器可以监听客户端的请求 类似Apache、Nginx 等Http服务器
* 接收请求与响应请求 



```javascript
// 引入required模块
const http = require('http');
// 创建服务器
http.createServer((request, response) => {
  // 发送HTTP头部 状态值 内容类型
  response.writeHead(200, {'Content-Type': 'text/plain'});
  // 发送响应数据 ‘hello world'
  response.end('hello world');
}).listen(8888);

console.log('server running at http://127.0.0.1:8888');
```





#### npm 安装

```javascript
npm install express // 本地安装

npm install express -g // 全局安装
```

















