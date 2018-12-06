#### 原型与继承



**原型对象就是指函数所拥有的prototype属性。**



### 1.1 函数

函数本身也是一种对象。和对象一样拥有属性。

```javascript
function F() {}

F.length; // 0 函数的形参
F.constructor; // function Function()
typeof F.prototype; // 'object'
```



prototype 原型属性本身也是一个对象。

```javascript
F = {
    prototype: {
        constructor: F, // 指向当前函数
        name: 'zhangsan'
    }
};

```



### 1.2 创建对象

针对原型 使用构造函数创建对象。上面的F就是构造函数。构造函数一般大写开头。

```javascript
let f = new F();

console.log(f);
```

这里会得到一个空对象。 这个对象的隐式原型 \__proto\__ 指向显示原型prototype。 

* 创建一个新对象
* 将构造函数的作用域赋给新对象。就是把this指向新对象 新对象的proto属性会指向构造函数的prototype 
* 执行函数内代码 就是为新对象添加属性
* 返回新对象 默认返回this this就是新对象



 模拟实现new

```javascript
function newFunc(fn, ...args) {
  let obj = Object.create(fn.prototype);
  let value = fn.apply(obj, args);
  return isPrimitive(val) ? obj : value;  
}
```



