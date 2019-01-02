### async 函数



> async 函数的返回值是Promise对象。



async 函数的返回值是Promise对象。 可以用then方法指定下一步操作。

```javascript
var sleep = function(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();    
    }, time);  
  });
}

var start = async function() {
  console.log('start');
  await sleep(3000); // 过了三秒 才会执行end
  console.log('end');
}
```

* async 表示一个 async函数 表示异步的函数、await 只能用在这个函数里面
* await表示这里 **等待promise返回结果了，再继续执行**
* await 后面跟着的 **应该是一个promise对象**



#### 获得返回值

await 等待的虽然是promise对象 但是不用写then() 可以直接得到返回值



```javascript
var sleep = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            // 返回 ‘ok’
            resolve('ok');
        }, time);
    })
};

var start = async function () {
    let result = await sleep(3000);
    console.log(result); // 收到 ‘ok’
};
```



#### 捕捉错误	

```javascript
var sleep = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            // 模拟出错了，返回 ‘error’
            reject('error');
        }, time);
    })
};

var start = async function () {
    try {
        console.log('start');
        await sleep(3000); // 这里得到了一个返回错误
        
        // 所以以下代码不会被执行了
        console.log('end');
    } catch (err) {
        console.log(err); // 这里捕捉到错误 `error`
    }
};
```



#### 怎么拿到异步的值

> 错误尝试 无法正确拿到值

```javascript

function getSomething() {
  var r = 0;
  setTimeout(function(){
    // 这里是异步执行的代码 
    r = 2;
  }, 1000);
  return r;
}

function compute() {
  var x = getSomething(); // 这个时候 r还是等于 0
  console.log(x);
}

compute(); // 0

```

### 解决方案

>  回调函数  同步 > 异步 > 回调

```javascript
function getSomething(cb) {
  var r = 0;
  setTimeout(function(){
    r = 2;
    // 这里传一个回调
    cb(r)
  }, 1000);
}

function compute(x){
  console.log(x * 2);
}
getSomething(compute);
```



> Promise  解决方案

```javascript
function getSomething() {
  var r = 0;
  return new Promise((resolve) => {
    setTimeout(() => {
      r = 2;
      resolve(r);
    }, 1000);
  });
}

function compute(x){
  console.log(x* 2);
}

getSomething().then(compute);

```



> async await

```javascript

function getSomething(){
  var r = 0;
  return new Promise((resolve) => {
    setTimeout(() => {
      r = 2;
      resolve(r);
    }, 1000);
  });
}

// async 表示里面是一个异步函数
async function compute() {
  var x = await getSomething(); // await 表示等待异步函数
  console.log(x * 2); // 4 
}

compute();
```









