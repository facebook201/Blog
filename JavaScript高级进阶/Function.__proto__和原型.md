#### Function.____proto____ === Function.prototype  201803120



##### 1、JavaScript 函数的new关键字做了什么？



var obj = new Base(); // new了一个对象

这行代码 在JavaScript引擎中看到的对象模型是：

![border](http://img4.07net01.com/upload/images/2016/02/12/2061904120740051.png)

从图就可以看出 new关键字做的事情

* 生成了一个空对象
* 将这个空对象的  _ _proto_ _指向 Base函数对象prototype对象
* 将Base函数对象的this指针替换成obj。然后再调用Base函数 于是我们就给obj对象赋值了一个id成员变量 这个成员变量的值是"base"。



```javascript
new Animal('cat') = {
    var obj = {};
	// 把生成的隐式原型指向构造函数的显式原型
	obj.__proto__ = Animal.prototype;
	// 把this指向生成的实例
	var result = Animal.call(obj, 'cat');
	// 判断是否是一个对象 返回
	return typeof result === 'object' ? result : obj;
};
```



##### 什么是原型对象 什么是实例对象？

> 原型

**为其他对象提供共享属性的对象。** 

只有函数有prototype(原型) 属性。但是不是所有的函数都有prototype属性。

```javascript
var a = Object.prototype.toString.bind(Array);
typeof a; // 'function'
a.prototype; // undefined
```

**Function.prototype.bind 创建的函数对象没有prototype属性。**

原型的作用？

> prototype 对象是实现面向对象的重要机制。 每个函数也是一个对象，它们对应的类就是Function。每个函数对象都有具有一个子对象prototype。prototype就是一个类的属性的集合。当通过new来生成一个类的对象时候。prototype对象的属性就会成为实例化对象的属性。



##### __ proto __

每个JS对象一定对应一个原型对象。 并从原型对象继承属性和方法。

```javascript
var one = {x: 1};
var two = new Object();

one.__proto__ === Object.prototype;
two.__proto__ === Object.prototype;
one.toString === one.__proto__.toString;
```



##### 实例对象

实例和对象的区别？

* 1 实例是类的具象化产品
* 2 而对象是一个具有多种属性的内容结构
* 3 实例都是对象 而对象不一定是实例(object.prototype)

Array是一个构造函数、只要是函数 那么他就是Function的实例。



##### Function

**Array 、Date 、Number、String、Boolean、Error 甚至Object都是Function的一个实例 那么Function是谁的实例呢？**  

```javascript
function Person() {
    //... 自定义的code
}
Person.__proto__ === Function.prototype; // true
Person.prototype instanceof Object; // true

// 主要内容
Person.__proto__ === Function.prototype; // true
Function.__proto__ === Function.prototype; // true
```

Person 函数是一个Function的一个实例，那么最后一行代码能够说明 Function函数对象是由Function构造函数创建的一个实例?

因为我们普遍认知的事情就是：实例对象(A) 的 __ proto __ 属性指向它的构造函数的原型对象(prototype)。

**Function构造函数的prototype属性和__ proto __ 属性都指向同一个原型。是否可以说Function对象是由Function 构造函数创建的一个实例? ** 



Object.prototype 并不是Object的实例。Object.prototype.__ proto __ === null; 这也印证了上面的一句话 实例是对象。但是对象不全是实例。



#### 结论

先有Object.prototype 原型链顶端。 Function.prototype 继承Object.prototype而产生。 最后 Function和Object和其他的构造函数都是继承Function.prototype 而产生。

> 先有 Object.prototype，再有 Object，那么先有 Object.prototype 里面的这个 Object 代表的是什么呢

> Function.**proto**=== Function.prototype;Function 构造函数的 prototype 属性和__proto__属性都指向同一个原型，是否可以说 Function 对象是由 Function 构造函数创建的一个实例？

> Object instanceof Function // true
>
> Function instanceof Object // true
> Object 本身是构造函数，继承了 Function.prototype;Function 也是对象，继承了 Object.prototype。感觉成了鸡和蛋的问题了。

> 比如说：
> function Person(){}
> Person.prototype 是一个对象，为什么 Function.prototype 却是一个函数呢，当然函数也是一个对象，为什么要这么设计呢？