## Ramda

Ramda 是一个工具函数库。它跟 underscore 和 lodash 类似 但是又不同。

**Ramda主要的思想是处理的数据放在最后面 函数放前面。而且都支持柯里化**





### API介绍



* 一 比较运算

* 二 数学运算

* 三 逻辑运算

* 四 字符串

* 五 函数

  * 函数的合成

  * 柯里化

  * 函数的执行

* 六 数组

  * 数组的特征判断

  * 数组的截取和添加

  * 数组的过滤

  * 单数组运算

  * 双数组运算

  * 复合数组

* 七 对象

  * 对象的特征判断
  * 对象的过滤
  * 对象的截取
  * 对象的运算
  * 复合对象





## Point-free programming

**把数据处理的过程 定义成一种与参数无关的合成运算。不需要用到代表数据的那个参数 只要把一些简单的运算步骤合成在一起。**



Pointfree: **不使用所要处理的值 只合成运算过程。**

```javascript
const addOne = x => x + 1;
const square = x => x * x;


// 使用 Ramda 把result 变成合成函数
const result = R.pipe(addOne, square);

result(3); // 9
```



#### pointfree的本质

使用一些通用的函数 组合各种复杂的运算 上层运算不要直接操作数据。通过底层函数去处理 。这样就把一些常用的操作封装成函数。

```javascript
// 读取对象 obj的role属性 不要直接写出 obj.role 而是要封装成操作

var prop = (p, obj) => obj[p];

va propRole = R.curry(prop)('role')
```



















































