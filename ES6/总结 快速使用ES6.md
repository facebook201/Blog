### 解构赋值



> 1 对象的基本解构



```javascript
// 
getFunction(newVal) {
    this.setState({
        active: newVal.active
    })
}

getFunction({active}) {
    this.setState({
        active
    })
}

handleEvent = () => {
    this.setState({
        data: this.state.data.set('key', 'value');
    })
}

// 更好的方式
handleEvent = () => {
    this.setState(({data}) => ({
        data: data.set('key', 'value')
    }))
}

Promise.all([Promise.resolve(1), Promise.resolve(2)]).then(([x, y]) => {
})
```



> 2 数组解构



```jsx
// bad
let str = 'key-value';
const splitRet = str.split('-');  // ['key', 'value']
const [a, b] = splitRet;

```



> 增加对象字面量

```jsx
const some = 'y';
const x = {
    some: some
};

// good
const some = 'y';
const x = {
    some
};
```





### 数组增强的方法

```javascript
// includes good
function test(fruit) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
  if (redFruits.includes(fruit)) {
    console.log('red');
  }
}

// find  用于找出第一个符合条件的数组成员 没有符合的返回undefined
var inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5}
];

function findCherries(fruit) {
    return fruit.name === 'cherries';
}

console.log(inventory.find(findCherries)); // { name: 'cherries', quantity: 5 }

// findIndex 返回第一个符合条件的数组成员的位置 不满足就返回-1
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```



### 扩展运算符

> 1 arguments 转数组



```javascript
// bad
function sortNumbers() {
    return [].slice.call(arguments).sort();
}

// goods
const sortNumbers = (...arguments) => numbers.sort();
```



> 2 调用参数

```javascript
// bad
Math.max.apply(null, [14, 3, 77])

// good
Math.max(...[14, 3, 77])
// 等同于
Math.max(14, 3, 77);
```



> 3 构建对象 剔除部分属性 将剩下的属性构建一个新的对象

```javascript
let [a, b, ...arr] = [1, 2, 3, 4, 5];

// react会经常这样使用 其他的props单独作为一个对象 放入组件属性
const {a, b, ...others} = {a: 1, b: 2, c: 3, d: 4};

// 合并对象
let obj1 = { a: 1, b: 2,c: 3 }
let obj2 = { b: 4, c: 5, d: 6}
let merged = {...obj1, ...obj2};
```



> React

```javascript
const parmas =  {value1: 1, value2: 2, value3: 3}

<Test {...parmas} />
```





###  Set 和 Map 去重

```javascript
[...new Set(array)];

```



#### for of

for...of 循环可以使用的范围包括：

1. 数组
2. Set
3. Map
4. 类数组对象，如 arguments 对象、DOM NodeList 对象
5. Generator 对象
6. 字符串
7. 结合forEach的简洁性和中断循环的能力



