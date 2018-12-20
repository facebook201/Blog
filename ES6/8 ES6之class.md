### Class

ES6

```javascript
// ES6
class Person {
    constructor(name) {
        this.name = name;
    }
  	hello() {
        return 'hello' + this.name;
    }
}

var p1 = new Person('lisi');
p1.hello();

// ES5
function Person(name) {
    this.name = name;
}
Person.prototype.hello = function() {
    return 'hello' + this.name;
}
var p2 = new Person('zhansgan');

```

ES5的构造函数对应着ES6的Person类的constructor 方法。

**类内部的所有方法都是不可枚举的 在ES5是可枚举的**

```javascript
// ES6
Object.keys(Person.prototype); // []
Object.getOwnPropertyNames(Person.prototype); // ["constructor", "hello"]

// ES5
Object.keys(Person.prototype); // ['sayHello']
Object.getOwnPropertyNames(Person.prototype); // ["constructor", "sayHello"]
```



#### 实例属性

```javascript
class Person {
    // 实例属性
    _count = 0;
	// 静态属性
	static name = 'lisi'; 
}
```

实例属性可以写在最上面，不一定要写在constructor里面。



#### 私有方法和私有属性

```javascript
class Weight {
	// 公有方法
    foo(baz) {
        this._bar(baz);
    }
    // 私有方法
    _bar(baz) {
        return this.sn = baz;
    }
}
```



_bar 前面的下划线表示一个限于内部使用的私有方法。



#### 静态方法

所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上 static 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

```javascript
class Person {
    // 静态属性
    static name = 'lisi'
    static hello() {
        return 'hello';
    }
}

Person.hello() // 'hello'

var p = new Person();
p.hello(); // TypeError: p.hello is not a function

// ES5
function Person() {}

Person.hello = function() {
    return 'hello';
};

Person.hello(); // 'hello'

var p = new Person();
p.hello(); // TypeError: p.hello is not a function
```



### new 调用

类必须使用new调用 否则会报 跟普通构造函数的一个主要区别。后者不使用new也可以



#### class的继承

class 通过extends关键字实现继承。比ES5的通过修改原型更加清晰









