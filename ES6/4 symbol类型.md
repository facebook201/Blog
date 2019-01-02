### Symbol类型



**symbol表示独一无二的值，是一种新的原始数据类型 symbol 可以带一个字符串参数 表示对symbol实例的描述  如果是一个对象 会把对象转成字符串先**。

```javascript
let s = Symbol('s');
typeof s; // symbol
```



**Symbol函数前面不能使用new命令，否则会报错 symbol是原始类型的值 不是对象**



**symbol函数的参数只是表示对当前symbol值的描述。相同参数的Symbol函数的返回值是不相等的**

```javascript
let s1 = Symbol('s1');
let s2 = Symbol('s1');

console.log(s1 === s2); // false
```



**Symbol值可以作为标识符 用于对象的属性名 可以保证不会出现同名的属性**

```javascript
var mySymbol = Symbol();

// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
var a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
console.log(a[mySymbol]); // "Hello!"
```



**Symbol作为属性名 属性不会出现在for in for of循环中，也不会被Object.keys Object.getOwnPropertyNames()、JSON.stringify() 返回。但是，它也不是私有属性，有一个 Object.getOwnPropertySymbols 方法，可以获取指定对象的所有 Symbol 属性名。**



```javascript
var obj = {};
var a = Symbol('a');
var b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

var objectSymbols = Object.getOwnPropertySymbols(obj);

console.log(objectSymbols);
// [Symbol(a), Symbol(b)]

```



**keyFor 方法返回一个已登记的Symbol类型值的key**

```javascript
var s1 = Symbol.for("foo");
console.log(Symbol.keyFor(s1)); // "foo"

var s2 = Symbol("foo");
console.log(Symbol.keyFor(s2) ); // undefined
```

