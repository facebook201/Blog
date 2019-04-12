### 有意义可读性好的变量名



```javascript
// 有意义的名字
var yearMonthDay = moment().format('YYYY/MM/DD');

// const 定义常量
const FIRST_US_PRESIDENT = "George Washington";

```



#### 保持函数功能的单一性

函数需要做更多的事情之后会变得难以编写 测试 理解 和 组合。 所以要抽离出完成一个动作 他们将能够很容易的进行重构并且代码更容易阅读。**严格的遵守这个规则 将会领先很多开发者**



#### 函数名字明确表明其功能

```javascript
function addMonthToDate(month, date) {
  // ...
}

const date = new Date()
addMonthToDate(1, date)
```



#### 使用默认变量替代短路运算或条件

```javascript
function createMicrobrewery(breweryName = 'hipster') {
  // ... 功能
}
```



#### **函数参数**

函数参数数量避免超过2个。多数的话就封装成一个对象

```javascript
function createMenu({ title, body, buttonText, cancellable }) {
// ...
}

createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true
})
```



#### 避免副作用

当函数产生了除了接受一个值并返回一个结果之外的行为。称这个函数产生了副作用。 比如文件、修改全局变量或将你的钱全转给了一个陌生人。

```javascript
// Bad
const addItemToCart = (cart, item) => {
    cart.push({item, date: Date.now() })
}

// Good
const addItemToCart = (cart, item) => {
  return [...cart, {item, date: Date.now }]  
};
```



#### 避免条件判断



#### 使用 async/await 和 promise 



