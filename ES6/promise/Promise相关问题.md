### 为什么使用promise?



以前 前端异步请求处理会很容易造成回调地狱。所以出现了promise。



```javascript
function init(options) {
  return new Promise((resolve, reject) => {
    // 如果存在id 就成功返回  
    if (options.id) {
      resolve(options.id);
    } else {
      reject();
    }
  });
}

// 使用
init().then(res => {
  // res 是返回的options.id 也就是resolve的参数
})
```



### promise 相关题目

1、 **Promise构造函数是立即执行的，promise.then 中的函数是异步执行的 **

```javascript
const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve();
  console.log(2);
});

promise.then(() => {
  console.log(3);
});

console.log(4);

// 1 2 4 3
```



2、**Promise.resolve(1) 可以把某个对象转成promise对象 可以then调用**



```javascript
Promise.resolve(1)
  .then(res => {
    console.log(res);
    return 2;
  }).catch((err) => {
    return 3;
  }).then(res => {
    console.log(res);
  });

// 1 2
```





3、**promise 的then或catch可以被调用很多次 但这里promise构造函数只执行一次。 或者说promise内部状态一经改变 并有了一个值 后续每次调用then或者catch都会拿到这个值**

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('once');
    resolve('success');
  }, 1000);
})

const start = new Date();

promise.then(res => {
  console.log(res, Date.now() - start);
})

promise.then(res => {
  console.log(res, Date.now() - start)
});

```



4、**process.nextTick 和 promise.then 都属于microtask 而setImmediate属于macrotask。 微任务会先与宏任务**

```javascript
process.nextTick(() => {
  console.log('nextTick');
})

Promise.resolve().then(() => {
  console.log('then');
})

setImmediate(() => {
  console.log('setImmediate');
})

console.log('end');
```





### Promise 中的异常

```javascript
const p1 = new Promise((resolve, reject) => {
  foo.bar();
  resolve(1);
});

p1.then(val => {
  console.log('p1 then val' + val);
}, err => {
  console.log('p1 then err' + err);
}).then(value => {
  console.log('p1 then then val' + value);
}, err => {
  console.log('p1 then then err' + err);
});

/**
 * p1 then err ReferenceError: foo is not defined
 * p1 then then val undefined
 **/ 

```



**promise中的异常有then参数中的第二个回调函数处理 异常信息将作为promise的值，异常一旦得到处理 then返回的后续promise对象将恢复正常。**

