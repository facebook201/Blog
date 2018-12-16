### 优点体现

* 1 内置执行器。     它自带执行器它的执行 跟普通函数一样的
* 2 更好的语义。     async 表示函数里有异步操作 await表示后面的表达式需要等待
* 3 更广的适用性。   await命令后面可以是promise对象和原始值
* 4 返回值是Promise  async的返回值是promise 可以继续使用then对象  


### 2 基本用法

async 函数返回一个Promise对象。 可以使用then方法添加回调 当函数执行的时候。一旦遇到await就先返回。 等到异步操作完成
再接着执行函数体内后面的语句。
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

因为async函数返回的也是Promise对象。 可以作为await命令的参数 所以可以这样写
```javascript
async function timeout(ms) {
  await return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  // 要先等待timeout执行完毕 才能继续执行下面的代码
  await timeout(ms);
  console.log(value);
}

asyncPrint(1, 200); 
```

### 3 四种使用形式
* 函数声明      async function foo() {}
* 函数表达式    const foo = async function() {}
* 对象的方式    let obj = { async foo() {} }
* 箭头函数      const foo = async () => {}

还有一种class的方法

```javascript
// Class
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
};

const storage = new Storage();

storage.getAvatar('jake').then(...);

```

> 处理单个异步结果
```javascript
function getSomething() {
  var r = 0;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      r = 2;
      resolve(2);
    }, 1000);
  });
}

async function computed() {
  const x = await getSomething(); // x 返回的是
  console.log(x * 2); // 4
}
computed();
```

### 3 语法

async 函数返回一个promise对象函数内部return 语句返回的值。 会成为then方法回调函数的参数。

```javascript
async function getValue() {
  const result = await getData();
  return result;
}

// 返回结果是then的参数
getValue().then(res => {
  console.log(res);
});

// 顺序处理多个异步结果
async function asyncFunc() {
  const result1 = await getValue();
  const result2 = await getValue2();
}

// 并行处理多个异步结果
async function asyncFunc() {
  const [result1, result2] = await Promise.all([
    getValue1(),
    getValue2()
  ]);
  console.log(result1, result2);
}

// 错误处理
async function asyncFunc() {
  try {
    await getValue();
  } catch(err) {
    console.log(err);
  }
}

```

> 如果await后面的不是一个promise对象 那么会被转成一个立即resolve的promise对象。

```javascript

async function f() {
  return await 123;
}
f().then(r => console.log(v));

```

> 错误处理
```javascript
async function err() {
  await new Promise((resolve, reject) => {
    throw new Error('出错了');
  });
}

err().then(v => 
  console.log(v)).catch(e => console.log(e));

```