### Nodejs 模块系统

创建模块 可以通过 exports 对象把 world作为模块的访问接口。在mainjs 中通过require('./hello')加载这个模块，然后就可以直接访问 hells.js 中对象的成员函数；



```javascript
function Hello() {
  let name = 'lisi';

  this.setName = function(name) {
    name = name;
  };

  this.sayName = function(){
    console.log('hello ' + name);
  }
}
// 导出这个模块接口 
module.exports = Hello;


// 然后这边就可以这样使用

const Hello = require('./hello');

const newHello = new Hello();
newHello.sayName(); // hello lisi
```





#### require 方法的内部加载

![border](http://www.runoob.com/wp-content/uploads/2014/03/nodejs-require.jpg)





require优先级

* 文件模块缓存中
* 原生模块加载
* 文件加载



