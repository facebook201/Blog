> new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一



```javascript
// Otaku 御宅族，简称宅
function Otaku (name, age) {
    this.name = name;
    this.age = age;

    this.habit = 'Games';
}

// 因为缺乏锻炼的缘故，身体强度让人担忧
Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}

var person = new Otaku('Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Kevin
```





因为new的结果是一个新对象。所以在模拟实现的时候 我们也要建立一个新对象。假设这个对象叫obj。因为obj会具有Person构造函数里的属性，可以使用Person.apply(obj, arguments)来给obj添加新的属性。

> 根据高程的介绍列出new操作符的四个过程
>
> * 创建一个新对象
> * 将构造函数的作用域赋给新对象 this就指向了这个对象
> * 指向构造函数中的代码 为对象添加属性
> * 返回新对象

```javascript
// 模拟实现new的功能
var person1 = newFunc(Person, 'name', 'age');

//
function newFunc(name) {
    // 创建一个对象
    var obj = {};
    // 绑定构造函数的原型
    obj.__proto__ = Person.prototype;
    Person.call(o, name);
    return o;
}

// 抽象一下 就可以传入构造函数了
function newFunc(constructor) {
    var obj = {};
    o.__proto__ = constructor.prototype;
    constructor.apply(o, Array.prototype.slice.call(arguments, 1));
    return o;
}

// 鲁小夫
function instantiate(fn, ...rest) {
    // 这行代码写的真是好 不仅创建了一个对象 而且绑定了fn的原型
    var f = Object.create(fn.prototype);
    var value = fn.apply(f, rest);
    return isPrimitive(val) ? f : value;
}

function A() {}
a = instantiate(A);
```





















