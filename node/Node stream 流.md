### stream 流



Nodejs中处理流式数据的抽象接口。 stream模块构建实现了流接口的对象。HTTP服务器请求和process.stdout都是流的实例。 流是可读的 可写的所有的流都是 EventEmitter的实例。



流的类型:

* Readable 可操作
* Writable 可写操作
* Duplex  可读可写
* Transform 操作被写入数据 然后读出结果



所有的Stream对象都是EventEmitter的实例。常用的事件有

* data 没有数据可读时触发
* end 没有更多数据可读触发
* error 接收和写入过程中发生错误触发
* finish 所有数据已经被写入到底层系统时触发





#### 流中读取数据

```javascript
const fs = require('fs');
const readerStream = fs.createReadStream('input.txt');

let data = '';

// data end  error
readerStream.on('data', (chunk) => {
   data += chunk; 
});
```





#### 写入流

```javascript
const fs = require('fs');
let data = '我是菜鸟 我要学node！';

const writerStream = fs.createWriteStream('./out.text');
writerStream.write(data, 'UTF8');

// 标记末尾
writerStream.end();

writerStream.on('finish', () => {
  console.log('写入完成。');
});
```



#### 管道流

管道流会覆盖流入的那个文件原本的内容。

```javascript
const fs = require('fs');

const read = fs.createReadStream('./data.json');
const writer = fs.createWriteStream('./out.text');

// 读取
read.pipe(writer);
```





#### 链式流 

压缩文件

```javascript
const fs = require('fs');
const zlib = require('zlib');


fs.createReadStream('./out.text')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('./out.text.gz'))

console.log('文件压缩完成');
```















