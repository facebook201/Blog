### async/await

 ES7提出的async函数。 No more callback hell。 它是Generator函数的语法糖。 使用关键字 async表示 函数内部使用await来表示异步。 

* 内置的执行器。 跟普通函数调用一样。
* 更好的语义 await就表示异步
* 更广的适用性 co 模块约定。 await命令后面可以是promise或者是原始类型值。
* 返回值是promise。 async 函数返回值是Promise对象 比generator 函数返回的Iterator 对象方便。 可以直接使用then方法调用





#### Async 跟其他几种进行比较

首先定义一个fetch获取github user的信息。

```javascript
function fetchUser() {
    return new Promise((resolve, reject) => {
        fetch(url).then(data => {
            resolve(data.json());
        }, error => {
            reject(error);
        });
    });
}
```



### Promise方式

```javascript
/**
 * Promise 方式
 **/

function getUserByPromise() {
    fetchUser().then(data => {
        console.log(data);
    }, (error) => {
        console.log(error);
    })
}
getUserByPromise();
```



### Generator 方式

```javascript
function* generator() {
    const user = yield fetchUser();
    return user;
}
const g = generator();
const result = g.next().value;

result.then(v => {
    console.log(v);
}, error => {
    console.log(error);
});
```



### async 方式

```javascript
async function getUseByAsync() {
    let user = await fetchUser();
    return user;
}
getUserByAsync().then(v => { console.log(v) });
```



## 语法 

async 函数返回一个Promise对象。 async 函数内部的return返回的值。会成为then 方法回调函数的参数。

```javascript
async function f() {
    return 'hello world';
}
f().then(v => { console.log(v); })

// catch
async function getUserByAsync() {
  // 抛出错误会被catch
    throw new Error('error');
}
getUserByAsync().then(v => {
    console.log(v);
}).catch(e => {
    console.log(e);
});

```

* **如果async 函数内部抛出异常 导致promise对象状态变为reject，抛出错误会catch方法函数接收到**
* **async函数返回的promise对象 必须等到内部所有的await命令的promise对象执行完成才会改变状态。意思就是要等到所有的异步执行完毕才会执行then方法的回调** 



```javascript
const delay = timeout => new Promise(resolve => {
    setTimeout(resolve, timeout));
})
```

