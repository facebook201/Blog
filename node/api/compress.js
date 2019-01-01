


const fs = require('fs');
const zlib = require('zlib');


fs.createReadStream('./out.text')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('./out.text.gz'))

console.log('文件压缩完成');


