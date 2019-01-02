### Promise 的立即执行性

```javascript

var p = new Promise(function(resolve, reject){
  console.log('create a promise');
  resolve('success');
});

console.log('after new Promise');

p.then(function(value){
  console.log(value);
});

// create a promise
// after new promise
// success
```
new Promise的时候 作为**Promise参数传入的函数是被立即执行的**。 只是其中执行的代码可以是异步代码。



### 2 Promise 的三种状态

Promise的内部实现是一个状态机。Promise有三种状态：pending(未完成)、resolved(成功)、rejected(失败)。 

**Promise刚刚创建的时候，处于pending状态**。 

**当Promise中的函数参数执行了resolve后。**

**如果Promise的函数参数中执行的不是resolve方法 而是reject 那么Promise就有pending变为rejected**

```javascript
// 举个例子
Vuex 的 action
this.$store.dispatch(HOME.HOMEDATA, options).then((res) => {
   // if (res.ok) 
});

// Vuex 
[HOME.HOMEDATA]({commit}, option) {
  new Promise((resolve, reject) => {
     axios.get(`${path.API}/xx/xx/xx/xx${option}`)
       .then(
       	(res) => {
          resolve(res.data);	 
     	},
     )
     .catch(
       (error) => {
         reject(error);
       },
     );
  });
}

[HOME.HOME]({commit}, options) {
    return new Promise((resolve, reject) => {
        axios.get(`${path.API}/xxx/xx`, {
            params: query(options)
        }).then(res => {
            resolve(res.data);
        }).catch(error => {
            reject(error);
        });
    });
}
```



### 3 状态的不可逆性

Promise状态的一旦变成resolved或rejected时，Promise的状态和值就固定下来了，不论你后续再怎么调用resolve或reject方法，都不能改变它的状态和值



### 4 链式调用

new Promise 的第一个函数参数会立即执行。 如果 成功 resolve(xx) 

```javascript
var p = new Promise(function(resolve, reject){
  resolve(1);// 立即执行
});
// 这里的p返回的是一个Promise对象
// Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: 1}
// 然后 then的函数里的参数 就是 这个value值。 如果没有value值 就会 返回undefined

p.then(function(value){               //第一个then
  console.log(value);
  return value*2;
}).then(function(value){              //第二个then
  console.log(value); // 这里的then没有返回值 就返回一个undefined
}).then(function(value){              //第三个then
  console.log(value);
  return Promise.resolve('resolve'); 
}).then(function(value){              //第四个then
  console.log(value);
  return Promise.reject('reject');
}).then(function(value){              //第五个then
  console.log('resolve: '+ value);
}, function(err){
  console.log('reject: ' + err);
})
```



### 5 Promise then() 回调异步性

```javascript
var p = new Promise((resolve, reject) => {
   // Promise 参数函数里面代码是同步的 但是then中的回调函数执行是异步的。
   resolve(); 
});

p.then(value => {
  console.log(value); // 2
});

console.log('which one is called first?'); // 1
```





#### Promise.all() 用于promise实例

```javascript
const p = Promise.all([p1, p2, p3]);
```



p的状态由p1、p2、p3 决定。

* 只有三个的状态都是 fulfilled p才是fulfilled
* 如果有一个是reject p就是rejected



#### Promise.resolve

将现有的对象转为promise对象，Promise.reslove方法就可以做到

```javascript
Promise.resovle('foo');

new Promise(resolve => resolve('foo'));
```









