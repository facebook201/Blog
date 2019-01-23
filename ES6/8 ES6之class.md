### ES6 之 Class

es6的class 只是一个语法糖。 绝大部分功能ES5都可以做。新的class写法只是让原型的写法更加清晰。

```javascript
// ES5 传统的构造函数
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// 如果要扩展原型方法和属性
Person.prototype.getName; // 等等


// ES6
class Person {
    // 构造方法
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    // 原型方法
    toString() {
        // 返回name
        return this.name;
    }
}
```

ES6里面也保存了prototype属性。类的所有方法都定义在prototype属性上面。prototype对象的constructor属性。 直接指向类本身。 跟ES5 也是一致的。

```javascript
Person.prototype.constructor === Person; // true
```

**ES6的类的方式 内部定义的方法都是不可枚举的** 如果是定义在定义在类的prototype上面就是可枚举的。

* 可以通过Object.keys(Person.prototype) 返回一个数组 如果可以枚举的属性 就会添加到数组
* 可以通过Object.getOwnPropertyDescriptor(Person.prototype, 'getName'); 可以取得给定属性的描述符。这个方法接收两个参数：属性所在的对象和要读取其描述符的属性名称。返回值是一个对象，如果是访问器属性，这个对象的属性有configurable、enumerable、get 和set；如果是数据属性，这个对象的属性有configurable、enumerable、writable 和value 

```javascript
// 得到一个数组 返回的元素都是原型上的属性和方法 
// 这种方法可以知道哪些是可以枚举的
var ProtoArrayMethods = Object.keys(Person.prototype);

// 也可以通过 getOwnPropertyDescriptor
// 这样是具体到某一个属性 是否可以枚举
var ProtoArrayMethods = Object.getOwnPropertyDescriptor(Person.prototype, 'attribute');
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



##### Class 继承

Class 继承可以通过 extends 关键字实现继承。 

```javascript
class Point {
}
// 本质上class 是一种语法糖。
typeof Point; // 'function'
Point === Point.prototype.constructor;
class ColorPoint extends Point {
	constructor(x, y, color) {
		// 调用父类的constructor
		super(x, y);
		this.color = color;
	}
    toString() {
        return this.color + ' ' + super.toString(); // 调用父类的toString 
    }
}
let cp = new ColorPoint();
```

constructor 方法和 toString 方法中。 出现了super关键字。 它在这里表示父类的构造函数 用来新建父类的this对象。**子类必须在constructor 方法中调用super方法。否则新建实例时会报错。这是因为子类没有自己的this对象。而是继承父类的this对象。** 父类的静态方法 也会被子类继承



> 2 Object.getPropertyOf()

该方法可以用来从子类上获取父类。

```javascript
Object.getPropertyOf(ColorPoint) === Point; // true 也可以判断一个类是否继承另一个类
```

class 通过extends关键字实现继承。比ES5的通过修改原型更加清晰









