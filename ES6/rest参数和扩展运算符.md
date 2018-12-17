#### rest 和 扩展运算符都是使用 ... 符号。 用于获取函数的多余参数 

```javascript
// rest 得到的是一个真正的数组而不是一个伪数组
const getOption = function(...args) {
    console.log(args.join()); // 将函数的参数连接成一个字符串
}
```





#### 扩展运算符 ...arg 将一个数组转为逗号分隔参数序列

* 不使用Apply去调用函数

  ```javascript
  // 调用函数的时候 传递一个参数数组 要使用apply 把数组拆分为单个参数传递
  function doStuff(x, y, z) {}
  var arg = [0, 1, 2];

  // 调用函数 传递参数
  doStuff.apply(null, args);

  // 通过扩展运算符 避免apply 
  doStuff(..args);
  ```

  ​

* 合并数组

  ```javascript
  // push unshift 以前合并数组的方法

  var arr = [1, 2];
  var arr2 = [3, 4, 5];

  var arr3 = [...arr, arr2, 6, 7]; //

  // 复制数组
  var arr = [1, 2, 3];
  var arr2 = [...arr]; // 就像 arr.slice();
  ```

* 把arguments或者NodeList转为数组

  ```javascript
  [...document.querySelectorAll('div')]
  [...arguments]
  Array.form(arguments); // 也可以转换一个数组
  ```

  ​

* 使用Math函数

  ```javascript
  let numbers = [1, 3, 5, 7];
  Math.min(...numbers); 
  ```

  ​

* 结构赋值

  ```javascript
  const {x, y, ...z} = {x: 1, y: 2, a: 3, b: 4};
  console.log(z); // {a: 3, b: 4}
  ```

  ​

































