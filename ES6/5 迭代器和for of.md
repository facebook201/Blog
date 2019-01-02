#### 迭代器



javascript 原有的表示“集合”的数据机构，主要是数组和对象， ES6又添加了Map 和 Set。这样就有了四种数据结构，迭代器是一种统一的接口机制 处理不同的数据结构。 **只要部署了迭代器接口，就可以完成遍历操作。**



##### 作用

* 为各个数据结构提供统一的、简便的访问接口
* 使得数据结构的成员能够按某种次序排列
* ES6创造了一种新的遍历命令 for of循环 Iterator接口主要供for of 消费



**迭代器就是一个具有next方法的对象，每次调用next 都会返回一个结果对象，该结果对象有两个属性 value 表示当前的值 done表示遍历是否结束。**



```javascript
function createIterator(items) {
  var i = 0;
  return {
    next: function() {
      var done = i >= items.length;
      var value = !done ? items[i++] : undefined;
      return {
        done: done,
        value: value
      };
    }
  };
}

var iterator = createIterator([1, 2, 3]);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

```



#### for of

ES6提供了 for of来遍历 迭代器对象。 遍历上面的对象试试

```javascript
for (let value of iterator) {
  console.log(value);
}
```

但是报错  Uncaught TypeError: iterator is not iterable。表明我们生产的iterator对象并不是 iterable（可遍历的）。**只要数据结构部署了Iterator接口 这种数据结构就可以遍历**

**ES6规定默认的Iterator接口部署在数据结构的Symbol.iterator属性 或者说一个数据结构只要具有Symbol.iterator属性 就可以认为是可遍历的（iterable） **



```javascript
var obj = {
  value: 1
};

obj[Symbol.iterator] = function() {
  return createIterator([1, 2, 3]);
};

for (value of obj) {
  console.log(value);
}
```



由上面的代码我们可以看出 for of 遍历的对象是遍历对象的Symbol.iterator属性



#### 默认的可遍历对象

我们直接遍历一个数组对象:  var colors = ['white', 'black', 'blue']; 

虽然我们没有动手添加这个属性 因为默认部署了，而且可以手动改。

```javascript

var colors = ['white', 'black', 'blue'];

colors[Symbol.iterator] = function() {
  return createIterator([1, 2, 3]);
}

for (color of colors) {
  console.log(color); // 1 2 3
}
```







