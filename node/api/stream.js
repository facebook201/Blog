
const fs = require('fs');

const read = fs.createReadStream('./data.json');
const writer = fs.createWriteStream('./out.text');

// 读取

read.pipe(writer);
