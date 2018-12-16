### u深入理解 var let const

通常说的作用域是函数作用域，使用var声明的变量，无论是在代码的哪个地方声明的，都会提升到当前作用域的最顶部，这种行为叫做变量提升(Hoisting)。如果在函数内部声明的变量，都会被提升到该函数开头，而在全局声明的变量，就会提升到全局作用域的顶部。

let和const都能够声明块级作用域，用法和var是类似的，let的特点是不会变量提升，而是被锁在当前块中。

唯一正确的使用方法：先声明，再访问。const 是不可重新赋值的值。



### 字符串

新增字符串方法。需要检测的子字符串，以及开始匹配的索引位置。

includes(str, index);  如果在字符串中检测到指定文本。 返回true 否则返回false

startsWith(str, index)：如果在字符串起始部分检测到指定文本，返回true，否则返回false。

endsWith(str, index)：如果在字符串的结束部分检测到指定文本，返回true，否则返回false。

**如果你只是需要匹配字符串中是否包含某子字符串，那么推荐使用新增的方法，如果需要找到匹配字符串的位置，使用indexOf()**。 

repeat(number)接收一个Number类型的数据，返回一个重复N次的新字符串。即使这个字符串是空字符，也你能返回N个空字符的新字符串。

**模板字面量插入变量的方法：**

使用${params}直接插入你需要添加到字符串的位置。

```javascript
var b = 'asd';
var a = `asdas${b}`;
```





ES6 函数参数默认值，不用想ES5要防止一些参数，来设置默认值。现在可以直接在参数里面赋值。

* 可以清楚的知道 参数是什么类型 
* 函数默认值不能被arguments认识 跟在严格模式下是一样的 arguments不能改变



**箭头函数和普通函数的区别**

1、箭头函数没有this，函数内部的this来自于父级最近的非箭头函数，并且不能改变this的指向。

2、箭头函数没有super

3、箭头函数没有arguments

4、箭头函数没有new.target绑定。

5、不能使用new

6、没有原型

7、不支持重复的命名参数。



### 对象扩展

* 属性初始值简写

* 对象方法简写

* 新增方法

  * **Object.is()** 解决JavaScript中特殊类型 == 或者 === 异常的情况。

  * **Object.assign()** 解决混合的问题

    ```javascript
    // mixin 目标对象和源对象
    function mixin(recriver, supplier){
      Object.keys(supplier).forEach(key => {
         recriver[key] = supplier[key]; 
      });   
      return recriver;
    }
    ```

    **在react的reducer中，每次传入新的参数返回新的state，你都可能用到Object.assign()方法。**

* 改变对象原型，是指在对象实例化之后，可以改变对象原型。我们使用 [Object.setPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) 来改变实例化后的对象原型。

  ```javascript
   let a = {
     name() {
       return 'eryue'
     }
   }
   let b = Object.create(a)
   console.log(b.name()) // eryue
        
   //使用setPrototypeOf改变b的原型
   let c = {
     name() {
       return "sb"
     }
   }    
   Object.setPrototypeOf(b, c)    
   console.log(b.name()) //sb
  ```

  ​

### 解构赋值

解构是将对象或者数组的元素一个个提取出来，而赋值是给元素赋值，解构赋值的作用就是给对象或者数组的元素赋值。

当给函数传递参数时，我们可以对每个参数进行解构，我给option的参数设置了默认值，这样可以防止没有给option传参导致的报错情况

```javascript
 function Ajax(url, options) {
   const {timeout = 0, jsonp = true} = options
   console.log(url, timeout, jsonp)
 };
 Ajax('baidu.com', {
   timeout: 1000,
   jsonp: false
 }) // "baidu.com" 1000 false
```



### Symbol

Symbol 是一种特殊的、不可变的数据类型，可以作为对象属性的标识符使用。Symbol 对象是一个 symbol primitive data type 的隐式对象包装器。是一个原始数据类型。

```javascript
const name = Symbol();
const name1 = Symbol('sym1');
console.log(name, name1) // Symbol() Symbol(sym1)
const name = new Symbol(); //不可以这样做。
//Symbol is not a constructor
```



### Set

Set是有序列表，含有相互独立的非重复值。

```javascript
 let set = new Set();
 console.log(set);
    
 //在浏览器控制台的输出结果
 Set(0) {}
   size:(...)
   __proto__:Set
   [[Entries]]:Array(0)
   length:0
```

API:

Set.prototype.size
返回Set对象的值的个数。

Set.prototype.add(value)
在Set对象尾部添加一个元素。返回该Set对象。

Set.prototype.entries()
返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排列的所有元素的值的[value, value]数组。为了使这个方法和Map对象保持相似， 每个值的键和值相等。

Set.prototype.forEach(callbackFn[, thisArg])
按照插入顺序，为Set对象中的每一个值调用一次callBackFn。如果提供了thisArg参数，回调中的this会是这个参数。

Set.prototype.has(value)
返回一个布尔值，表示该值在Set中存在与否。



#### 迭代Set

Set既然提供了entries和forEach方法，那么他就是可迭代的。但是不能使用for in。 for in是用来迭代对象的key，但是setyu元素没有key。 所以要使用 **for of**  

**forEach操作Set：**Set本身没有key，而forEach方法中的key被设置成了元素本身。

```javascript
for(let value of sets) {
  console.log(value);
}
// "haha"
// Symbol(haha)
    
// 如果你需要key，则使用下面这种方法
for(let [key, value] of sets.entries()) {
  console.log(value, key);
} 
// "haha" "haha"
// Symbol(haha) Symbol(haha)

sets.forEach((value, key) => {
  console.log(Object.is(value, key));
}); 
// true true
```

Set和数组太像了，Set集合的特点是没有key，没有下标，只有size和原型以及一个可迭代的不重复元素的类数组。既然这样，我们就可以把一个Set集合转换成数组，也可以把数组转换成Set。

```javascript
Array.from(arr);
[...new Set(arr)];
```

### Weak Set集合

Set集合本身是强引用，只要new Set()实例化的引用存在，就不释放内存，这样一刀切肯定不好啊，比如你定义了一个DOM元素的Set集合，然后在某个js中引用了该实例，但是当页面关闭或者跳转时，你希望该引用应立即释放内存，Set不听话，那好，你还可以使用 [Weak Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

**和Set的区别：**

1、**WeakSet 对象中只能存放对象值**, 不能存放原始值, 而 Set 对象都可以.

2、WeakSet 对象中存储的对象值都是被弱引用的, 如果没有其他的变量或属性引用这个对象值, 则这个对象值会被当成垃圾回收掉. 正因为这样, **WeakSet 对象是无法被枚举的**, 没有办法拿到它包含的所有元素.

```javascript
	let set = new WeakSet();
    const class_1 = {}, class_2 = {};
    set.add(class_1);
    set.add(class_2);
    console.log(set) // WeakSet {Object {}, Object {}}
    console.log(set.has(class_1)) // true
    console.log(set.has(class_2)) // true
```





### Map

Map是存储许多键值对的有序列表，key和value支持所有数据类型。如果说Set像数组，那么Map更像对象。而对象中的key只支持字符串，Map更加强大，支持所有数据类型，不管是数字、字符串、Symbol等。

**Map集合的原型多了set()和get()方法** Map没有add，使用set()添加key，value，在Set集合中，使用add()添加value，没有key。

```javascript
 let map = new Map();
    map.set('name', 'haha');
    map.set('id', 10);
    console.log(map)
    // 输出结果
    Map(2) {"name" => "haha", "id" => 10}
        size:(...)
        __proto__:Map
        [[Entries]]:Array(2)
            0:{"name" => "haha"}
            1:{"id" => 10}
        length:2

    console.log(map.get('id')) // 10
    console.log(map.get('name')) // "haha"
```

**Map同样可以使用forEach遍历key、value**

```javascript
 let map = new Map();
    const key = {};
    map.set(key, '这是个什么玩意');
    map.set('name', 'haha');
    map.set('id', 1);
    map.forEach((value, key) => {
      console.log(key, value)
    })
    
    //Object {} "这是个什么玩意"
    //"name" "haha"
    //"id" 1
```

### Weak Map

和Set要解决的问题一样，希望不再引用Map的时候自动触发垃圾回收机制。那么，你就需要Weak Map。

```javascript
    let map = new WeakMap();
    const key = document.querySelector('.header');
    map.set(key, '这是个什么玩意');
    
    map.get(key) // "这是个什么玩意"
    
    //移除该元素
    key.parentNode.removeChild(key);
    key = null;
```



### 总结

Set集合可以用来过滤数组中重复的元素，只能通过has方法检测指定的值是否存在，或者是通过forEach处理每个值。

Weak Set集合存放对象的弱引用，当该对象的其他强引用被清除时，集合中的弱引用也会自动被垃圾回收机制回收，追踪成组的对象是该集合最好的使用方式。

Map集合通过set()添加键值对，通过get()获取键值，各种方法的使用查看文章教程，你可以把它看成是比Object更加强大的对象。

Weak Map集合只支持对象类型的key，所有key都是弱引用，当该对象的其他强引用被清除时，集合中的弱引用也会自动被垃圾回收机制回收，为那些实际使用与生命周期管理分离的对象添加额外信息是非常适合的使用方式。

记得刚开始学习JavaScript的时候，不知道各种数据类型有什么用，如果你现在刚学习Map和Set也是这种不知道能用来干什么的想法，那么，恭喜，他们已经开始走入你的编程生涯，慢慢的你就会熟悉他们。







### Class

**ES5中创建类的方法：新建一个构造函数，定义一个方法并且赋值给构造函数的原型。**

```javascript
    'use strict';
    //新建构造函数，默认大写字母开头
    function Person(name) {
      this.name = name;
    }
    //定义一个方法并且赋值给构造函数的原型
    Person.prototype.sayName = function () {
      return this.name;
    };
    
    var p = new Person('eryue');
    console.log(p.sayName() // eryue
    );
```

#### 类声明和函数声明的区别和特点

1、函数声明可以被提升，类声明不能提升。

2、类声明中的代码自动强行运行在严格模式下。

3、类中的所有方法都是不可枚举的，而自定义类型中，可以通过Object.defineProperty()手工指定不可枚举属性。

4、每个类都有一个[[construct]]的方法。

5、只能使用new来调用类的构造函数。

6、不能在类中修改类名。

**关于super使用的几点要求：**

1、只可以在派生类中使用super。派生类是指继承自其它类的新类。

2、在构造函数中访问this之前要调用super()，负责初始化this。

```javascript
class T extends Component {
  constructor(props) {
    this.name = 1 // 错误，必须先写super()
    super(props)
  }
}
```





### Array

ES5中new一个人数组的时候，会存在一个令人困惑的情况。当new一个数字的时候，生成的是一个长度为该数字的数组，当new一个字符串的时候，生成的是该字符串为元素的数组。这样一来，导致new Array的行为是不可预测的，Array.of()出现为的就是解决这个情况。

```javascript
    const a = new Array(2)
    const b = new Array("2")
    console.log(a, b) //[undefined, undefined] ["2"]
    const c = Array.of(2)
    const d = Array.of("2")
    console.log(c, d) // [2] ["2"]
```

**使用Array.of()创建的数组传入的参数都是作为数组的元素，而不在是数组长度，这样就避免了使用上的歧义。**

**Array.from()是将类数组转换成数组**。

**映射转换：**Array.from(arg1, arg2)，我们可以给该方法提供2个参数，第二个参数作为第一个参数的转换。看个简单例子你就懂了。

```javascript
    function test(a, b) {
      let arr = Array.from(arguments)
      console.log(arr)
    }
    test(1, 2) //[1, 2]    
	function test(a, b) {
      let arr = Array.from(arguments, value => value + 2)
      console.log(arr)
    }
    test(1, 2) //[3, 4]
```

**ES6给数组添加了几个新方法：find()、findIndex()、fill()、copyWithin()。**

1、find()：传入一个回调函数，找到数组中符合当前搜索规则的第一个元素，返回它，并且终止搜索

2、findIndex()：传入一个回调函数，找到数组中符合当前搜索规则的第一个元素，返回它的下标，终止搜索。

3、fill()：用新元素替换掉数组内的元素，可以指定替换下标范围。

4、copyWithin()：选择数组的某个下标，从该位置开始复制数组元素，默认从0开始复制。也可以指定要复制的元素范围。

```javascript
const arr = [1, "2", 3, 3, "2"]
console.log(arr.find(n => typeof n === "number")) // 1
const arr = [1, "2", 3, 3, "2"]
console.log(arr.findIndex(n => typeof n === "number")) // 0
const arr = [1, 2, 3]
console.log(arr.fill(4)) // [4, 4, 4] 不指定开始和结束，全部替换
    
const arr1 = [1, 2, 3]
console.log(arr1.fill(4, 1)) // [1, 4, 4] 指定开始位置，从开始位置全部替换
    
const arr2 = [1, 2, 3]
console.log(arr2.fill(4, 0, 2)) // [4, 4, 3] 指定开始和结束位置，替换当前范围的元素
const arr = [1, 2, 3, 4, 5]
console.log(arr.copyWithin(3)) // [1,2,3,1,2] 从下标为3的元素开始，复制数组，所以4, 5被替换成1, 2
    
const arr1 = [1, 2, 3, 4, 5]
console.log(arr1.copyWithin(3, 1)) 
// [1,2,3,2,3] 从下标为3的元素开始，复制数组，指定复制的第一个元素下标为1，所以4, 5被替换成2, 3

const arr2 = [1, 2, 3, 4, 5]
console.log(arr2.copyWithin(3, 1, 2)) 
// [1,2,3,2,5] 从下标为3的元素开始，复制数组，指定复制的第一个元素下标为1，结束位置为2，所以4被替换成2
```



### 模块化代码

模块是自动运行在严格模式下并且没有办法退出运行的JavaScript代码。模块可以是函数、数据、类，需要指定导出的模块名，才能被其他模块访问。

```javascript
//数据模块
    const obj = {a: 1}
    //函数模块
    const sum = (a, b) => {
      return a + b
    }
    //类模块
    class My extends React.Components {
    
    }
```

给数据、函数、类添加一个export，就能导出模块。一个配置型的JavaScript文件中，你可能会封装多种函数，然后给每个函数加上一个export关键字，就能在其他文件访问到。

```javascript
    //数据模块
    export const obj = {a: 1}
    //函数模块
    export const sum = (a, b) => {
      return a + b
    }
    //类模块
    export class My extends React.Components {
    
    }
```

在另外的js文件中，我们可以引用上面定义的模块。使用import关键字，导入分2种情况，一种是导入指定的模块，另外一种是导入全部模块。

```javascript
// 导入obj数据，My类
import {obj, My} from './xx.js'
// 使用
console.log(obj, My)
// 导入全部模块
import * as all from './xx.js' 
// 使用
console.log(all.obj, all.sun(1, 2), all.My)
```









