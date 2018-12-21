### async/await

 ES7提出的async函数。 No more callback hell。 它是Generator函数的语法糖。 使用关键字 async表示 函数内部使用await来表示异步。 

* 内置的执行器。 跟普通函数调用一样。
* 更好的语义 await就表示异步
* 更广的适用性 co 模块约定。 await命令后面可以是promise或者是原始类型值。
* 返回值是promise。 async 函数返回值是Promise对象 比generator 函数返回的Iterator 对象方便。 可以直接使用then方法调用



### async 起什么作用

* **async函数返回的 是一个promise对象 如果在函数中 `return` 一个直接量，async 会把这个直接量通过 `Promise.resolve()` 封装成 Promise 对象**。

* **如果是没有返回值就返回undefined**



#### await在等什么

 async 函数返回一个 Promise 对象，所以 await 可以用于等待一个 async 函数的返回值——这也可以说是 await 在等 async 函数，但要清楚，它等的实际是一个返回值。注意到 await 不仅仅用于等 Promise 对象，它可以等任意表达式的结果，所以，await 后面实际是可以接普通函数调用或者直接量的



**await表达式的运算结果取决于它等的东西。**

如果它等到的不是一个Promise对象，那await表达式的运算结果就是它等到的东西，如果它等到的是一个Promise对象，await就忙起来了，它会阻塞后面的代码，等着Promise对象resolve 然后得到resolve的值 作为await表达式的运算结果。

```javascript
function some() {
  return 'some';
}

async function test() {
  return Promise.resolve('hello');
}

async function rest() {
  const r1 = await some();
  const r2 = await test();
  console.log(r1, r2);
}
rest();
```



* **如果async 函数内部抛出异常 导致promise对象状态变为reject，抛出错误会catch方法函数接收到**
* **async函数返回的promise对象 必须等到内部所有的await命令的promise对象执行完成才会改变状态。意思就是要等到所有的异步执行完毕才会执行then方法的回调** 



#### async/await 做了什么



**async主要将函数的返回值封装成一个promise对象，await会等待这个promise完成 将其resolve的结果返回出来。**

```javascript
function getTime() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('rest');
    }, 10);
  });
}

getTime().then(v => {
  console.log(v);
});
```

如果使用 async/await 

```javascript
function getTime() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('rest');
    }, 10);
  });
}

async function test() {
  const v = await getTime();
  return v;
}

test();
```



**async/await 的优势在于处理then链 如果有多个then链的时候 优势就出来了 更加清晰的看清楚**



#### await后面的promise对象运行结果可能是rejected，所以最好把await放在try catch中

```javascript
function getTime() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('rest');
    }, 10);
  });
}

async function test() {
  try {
    const v = await getTime();
    return v;
  } catch (err){
    console.log(err);
  }
}
test();
```





























