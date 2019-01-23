## 数组 Array

**一个存储元素的线性集合 Collection，javascript 是一种特殊的对象。用来表示偏移量的索引是该对象的属性。 Array在javascript被当做对象 所有许多属性和方法都可以在编程时使用 **



#### 创建数组

```javascript
const numbers = [];  numbers = new Array();

numbers.length; // 0 

// 判断是否是一个数组
Array.isArray();
```





#### 字符串生成数组

spilt 方法可以生成数组。

```javascript
let sentence = 'I Love You';
const arr = sentence.split(' ');
arr; // ['I', 'Love', 'You']

```

