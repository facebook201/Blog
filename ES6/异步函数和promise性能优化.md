### 异步函数性能优化



使用了异步函数之后，代码变得更加简洁，代码的流程控制和数据流更加容易理解。 尽管代码仍然是异步执行

（**JavaScript 执行仍然发生在单线程中 意味着异步函数并不会创建自己的物理线程**）





### 任务（Tasks）和微任务（microtasks）

task 处理 I/O 事件和定时器，并且每次只执行一个。microtask 实现了延迟执行 `async/await` 和 promise，在每次 task 执行结束后执行。在每次执行权返回给事件循环（event loop）之前 microtask 队列都会被执行到空为止。

根据 MDN 的解释，异步函数是一个使用隐式 promise 执行异步操作的并返回其结果的函数。异步函数的目的是为了让异步代码看起来像同步代码一样，从而简化复杂的异步处理逻辑。





**异步函数真正的力量来自 `await` 表达式，它会使方法执行暂停直到 promise 被 resolve ，并恢复执行。`await` 的返回值就是 promise 被`fulfilled` 的值**

```javascript
async function fetchStatus(url) {
  const response = await fetch(url);
  return response.status;
}
```

`fetchStatus` 执行在 await 处暂停，当 `fetch` 返回的 promise 被 fulfill 时，恢复执行。这或多或少等同于链接一个处理程序到 `fetch` 返回的 promise 上。



```javascript
async function foo(v) {
    const w = await v;
    return w;
}
```

当函数 `foo` 被调用时，参数 `v` 将被封装到一个 promise 里，并且在这个 promise 被 resolve 之前异步函数暂停执行。一旦 promise 被 resolve，函数的执行恢复， `w` 被赋值为 fulfilled 的 promise 的值。这个值将会作为异步函数的返回值。















