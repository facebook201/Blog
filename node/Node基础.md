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





### Content-Type 的类型



#### 常见的媒体格式类型如下

* text/html ： HTML格式
* text/plain ：纯文本格式      
* text/xml ：  XML格式
* image/gif ：gif图片格式    
* image/jpeg ：jpg图片格式 
* image/png：png图片格式



   #### application开头的媒体格式类型

* application/xhtml+xml ：XHTML格式
* application/xml     ： XML数据格式
* application/atom+xml  ：Atom XML聚合格式    
* application/json    ： JSON数据格式
* application/pdf       ：pdf格式  
* application/msword  ： Word文档格式
* application/octet-stream ： 二进制流数据（如常见的文件下载）
*  application/x-www-form-urlencoded ： <form encType="">中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）另外一种常见的媒体格式是上传文件之时使用的



multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式











