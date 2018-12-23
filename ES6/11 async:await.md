#### 基本用法

async函数返回一个promise对象。可以使用then方法添加回调函数。当函数执行的时候 一旦遇到await就会先返回 等到异步操作完成 再接着执行函数体内后面的语句。



```javascript
// 这个函数返回一个promise对象
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  // 要先等待timeout执行完毕 才能继续执行下面的代码
  await timeout(ms);
  console.log(value);
}

asyncPrint(1, 200); // 200m函数之后才会输出value
```



**async关键字 表明该函数内部有异步操作。调用函数时 会立即返回一个promise对象。**

```javascript
function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms * 1000)
    });
}

async function asyncPrint(value, ms) {
    await timeout(1);
    console.log(value);
}

asyncPrint('hello', 1); // 1 秒之后输出

// 根据这个例子我们就可以写出之前promise 红绿蓝等交替亮的代码
// 红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？

function red() {
  console.log('red');
}

function blue() {
  console.log('blue');
}

function green() {
  console.log('green');
}

function asyncAwait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms * 1000);
  });
}

async function myQueue() {
  await asyncAwait(3);
  red();
  await asyncAwait(1);
  blue()
  await asyncAwait(2);
  green();

  myQueue();  
}
myQueue();
```



#### 错误处理

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

> 回调函数  同步 > 异步 > 回调

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



