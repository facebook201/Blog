###  let + const



const 定义的是**不可重新赋值**的值，与不可变的值（immutable value）不同。const定义的Object，在定义之后仍可以修改其属性。 所以const的应用场景很广。**常量、配置项、引用、中间变量** let相对比较少。 只会在loop（for、while循环使用）以及少量必须定义的变量上。



### 箭头函数

* 箭头函数没有独立执行的上下文(this), 所以其内部引用this对象会直接访问父级。而且他没有独立的arguments，所以如果需要取不定参的时候。要么使用function 要么就使用rest 
* 只有一个参数或者一句表达式做方法体 可以省略相应括号




#### rest + spread ...

```javascript
// rest 得到的是一个真正的数组 而不是一个伪数组
const getOption = function(...args){
  console.log(args.join(); //args是一个数组 可以直接调用 join方法
}
              
// rest 可以配合箭头函数使用 达到取得所有参数的目的
const getOptions = (...args) => {
  console.log(args);      
}
```



#### Module 是ES6新特性

> Module是动态加载 导入的是变量的只读引用 而不是拷贝

```javascript
export default 5; // 默认导出

import b from './b.js';

// 动态加载
export let a = 10;
export const getOption = res => {
    console.log(a);
}

```



#### Symbol 

是一个ES6的新特性。 

* symbol是一个新的**基础数据类型** 从ES6起。javascript的基础数据类型变为：string、number、boolean、null、undefined、symbol
* Symbol 可以作用Object的key
* ​





#### Iterator + For … of

 for…of  是对象迭代器的遍历 (只要部署了Symbol.iterator属性，就被视为具有iterator接口。可以用for。。。of循环遍历成员，包括调用数据结构的Symbol.iterator方法) 

for…in 对象中可枚举值的遍历

```javascript
var arr = ['a', 'b', 'c', 'd'];

// 对象的键名
for (let a in arr) {
  console.log(a); // 0 1 2 3
}
// 对象的键值
for (let a of arr) {
  console.log(a); // a b c d
}
```



#### Map

map和object的区别

* `Map` 与 `Object` 都可以存取数据，`Map` 适用于存储需要 **常需要变化（增减键值对）或遍历** 的数据集，而 `Object` 适用于存储 **静态** （例如配置信息）数据集

* `Object` 的 key 必须是 `String` 或 `Symbol` 类型的，而 `Map` 无此限制，可以是任何值

* `Map` 可以很方便的取到键值对数量，而 `Object` 需要用额外途径

  ​

#### Set

* Set可以存储任何类型的值 遍历顺序与插入顺序相同
* Set内无重复的值 且无法插入重复的值 这样可以**数组去重** […new Set(arr)]























