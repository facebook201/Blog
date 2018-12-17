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





















