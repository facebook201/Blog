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

f.__proto__ === F.prototype
f.constructor = F.prototype.constructor === F
Object.getPrototypeOf(f) === Person.prototype; // true
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



#### 实例与原型

当读取实例的熟悉时 如果找不到 就会查找与对象关联的原型中的属性。如果找不到就继续找原型的原型。那么原型的原型又是什么。



**原型是一个对象** 那么

```javascript
let obj = new Object();
obj.name = 'zhangsan';
obj.name; // zhangsan 

```

其实Object也是构造函数 他的原型就是 Object.prototype  而Object的原型是null; 当找到这就不会继续找。





#### constructor

构造函数的实例里本身没有constructor属性。那么就回去实例原型里面找 也就是 Fun.prototype 中读取。所以

```javascript
function Fun() {}

let f = new Fun();

f.constructor === Fun; // true
f.constructor === Fun.prototype.constructor;
```





#### \__proto\__

大部分的浏览器都支持这个非标准的属性。 但是不存在与Fun里面。它其实是在Object.prototype 中。 与其说是一个属性 不如说是一个 getter/setter 当使用 f.__proto__ 可以理解 Object.getPrototypeOf(obj)



#### 真的是继承

javascript 你不知道 一书中。 继承意味着复制操作。但是javascript默认并不会复制对象的属性。 相反 js 只是在两个对象之家创建一个关联。这样一个对象就可以委托访问另一个对象的属性和函数。 















