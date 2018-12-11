#### call 和 apply

call和apply方法都是Function原型上的方法。使用一个指定的this值和若干个指定的参数值的前提下调用某个函数或方法。

```javascript
var foo = {
    value: 1
};
function bar() {
    console.log(this.value);
}
bar.call(foo); // 1
```

call函数改变了this的指向，指向foo。同时bar函数执行了。



**从上面的代码我们可以知道this执向了foo。所以我们可以假想foo有一个bar函数 这样 foo.bar()执行的话 this就指向了foo**



模拟步骤

* 将函数设置为对象的属性
* 执行该函数
* 删除这个函数

```javascript
Function.prototype.call1 = function(context) {
  // context可以传 null undefined
  context = context || window;
  context.fn = this;
  var args= [];

  for (let i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']');
  }
  var ret = eval('context.fn(' + args + ')');
  // 删除属性
  delete context.fn;
  return ret;
}

```



Apply 与 call 类似

```javascript
Function.prototype.apply = function(context, arr) {
  var context = Object(context) || window;

  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0; i < arr.length; i++) {
      args.push('arr[' + i + ']');
    }
    result = eval('context.fn(' + ')');
  }
  delete context.fn;
  return result;
}
```







#### bind 

**bind方法会创建一个新函数 这个新函数被调用时 bind的第一个参数将作为它运行时的this，之后的一序列参数将会在传递的实参前传入作为它的参数。**

* 返回一个函数
* 可以传参数



> 第一版本

```javascript
Function.prototype.bind1 = function(ctx) {
  var self = this;
  var args = [].slice.call(arguments, 1);

  return function() {
    var innerArgs = [].slice.call(arguments);
    return self.apply(ctx, args.concat(innerArgs));
  }
}
```

而且bind绑定之后的函数是可以使用new操作符创建对象的 这种行为就想把原函数当初构造器 提供的this值被忽略 但是依然能够使用传入的参数。



> 第二版

```javascript
Function.prototype.bind = Function.prototype.bind || function(ctx) {
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind what is trying to be bound is not callable');
  }

  var self = this;
  var args = [].slice.call(arguments, 1);

  // 中转函数 将它的实例赋给子类型的原型
  var fNOP = function () {};

  var fBound = function() {
    var innerArgs = [].slice.call(arguments);
    // 当作为构造函数时 this指向实例 此时结果为true 将绑定函数的this指向该实例 可以让实例获得来自绑定函数的值
    return self.apply(this instanceof fNOP ? this : ctx, args.concat(innerArgs));
  };
  // 这样就可以不怕修改fBound原型的时候也会去修改绑定函数的原型 
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}
```



分析一下上面的代码

中转函数的作用相当于Object.create();

```javascript
Object.create = function create(o) {
	function f(){};
    f.prototype = o;
    return new f;
}
```

































