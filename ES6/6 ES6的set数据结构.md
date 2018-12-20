### 模拟 Set 数据结构



#### 基本介绍

Set类似于数组 但是成员都是唯一的值 没有重复。

```javascript
let set = new Set([1, 2, 3, 3, 5, 6]);
set; // {1, 2, 3, 5, 6}
set.size; // 5
```



> 操作方法

1. add(value)：添加某个值，返回 Set 结构本身。
2. delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
3. has(value)：返回一个布尔值，表示该值是否为 Set 的成员。
4. clear()：清除所有成员，无返回值。



```javascript
let set = new Set();
console.log(set.add(1).add(2)); // Set [ 1, 2 ]

console.log(set.delete(2)); // true
console.log(set.has(2)); // false

console.log(set.clear()); // undefined
console.log(set.has(1)); // false
```

1. keys()：返回键名的遍历器
2. values()：返回键值的遍历器
3. entries()：返回键值对的遍历器
4. forEach()：使用回调函数遍历每个成员，无返回值

