Node 里面的误解





* **事件循环主要依赖javascript引擎来执行代码**
* **回调函数是有多个队列参与 不是都被推入一个单一的队列。在 Javascript 中的工作队列都是先进先出的**
* **事件循环都在是一个线程里**
* **setTimeout 中有异步的 OS 的系统参与**
  * 一个非常大的误解是 setTimeout 的回调函数在给定的延迟完成之后被（可能是 OS 或者 内核）推进一个队列
* **事件循环的架构**

![border](http://www.ruanyifeng.com/blogimg/asset/2018/bg2018022304.png)

不同的盒子代表不同的阶段，每个阶段执行特定的工作。每个阶段都有一个队列（这里说成队列主要是为了你更好的理解，真实的数据结构可能不是队列），Javascript 可以在任何一个阶段执行（除了 idle & prepare）。你在图片中也能看到  `nextTickQueue`  和  `microTaskQueue`，它们不是循环的一部分，它们之中的回调可以在任意阶段执行。它们有更高的优先级去执行

* **定时器（Timer）阶段**

  这个是事件循环开始的阶段，绑定到这个阶段的队列，保留着定时器（setTimeout, setInterval）的回调。尽管它并没有将回调推入队列中，但是用最小堆来存储计时器并且在到达规定的时间后执行回调。

* **即将发生的（Pending） i/o 回调阶段**

  这个阶段执行在事件循环中 `pending_queue` 里的回调。这些回调是被之前的操作推入的。例如当你尝试往 tcp 中写入一些东西，这个工作完成了，然后回调被推入到队列中。错误处理的回调也在这里。

* **Idle, Prepare 阶段**

  尽管名字是空闲（idle）,但是每个循环（tick）都运行。Prepare 也在轮询阶段开始之前运行。不管怎样，这两个阶段是 node 主要做一些内部操作的阶段；

* **轮询（Poll）阶段**

  可能整个事件循环最重要的一个阶段就是 `poll phase`。这个阶段接受新传入的连接（新的 Socket 建立等）和数据（文件读取等）。我们可以将轮询阶段分成几个不同的部分。

  * 如果在 `watch_queue`（这个队列被绑定到轮询阶段）有东西，它们将会被一个接着一个的执行直到队列为空或者系统到达最大的限制。
  * 一旦队列为空，node 就会等待新的连接。等待或者睡眠的时间取决于多种因素，待会儿我们会讨论。

* **检查（Check）阶段**

  轮询的下一个阶段是 `check phase`，这个专用于 `setImmediate` 的阶段。为什么需要一个专门的队列来处理 setImmediate 回调。

* **关闭回调**

  回调的关闭(socket.on(‘close’, ()=>{})) 都在这里处理的，更像一个清理阶段

* **nextTickQueue & microTaskQueue**

  nextTickQueue 中的存储着被 `process.nextTick()` 触发的回调。microTaskQueue 保留着被 Promise 触发的回调。它们都不是事件循环的一部分（不是在 libUV 中开发的），而是在 node.js 中。在 C/C++ 和 Javascript 有交叉的时候，它们都是尽可能快地被调用。因此它们应该在当前操作运行后（不一定是当前 js 回调执行完）

* **事件循环的工作流程**

  当在你的控制台运行 `node my-script.js`，node 设置事件循环然后运行你主要的模块（my-script.js） **事件循环的外部**。一旦主要模块执行完，node 将会检查循环是否还活着（事件循环中是否还有事情要做）？如果没有，将会在执行退出回调后退出。`process,on('exit', foo)` 回调（退出回调）。但是如果循环还活着，node 将会从计时器阶段进入循环。

  ![border](https://pic2.zhimg.com/v2-f9c11eeefdd25b07850636e84007db11)



* **计时器阶段（Timer phase）的工作流程**



```javascript
var i = 0;
var start = new Date();
function foo () {
    i++;
    if (i < 1000) {
        setImmediate(foo);
    } else {
        var end = new Date();
        console.log("Execution time: ", (end - start));
    }
}
foo();
```

调用函数 foo 函数内部再通过 `setImmediate` 递归调用 foo 直到1000。在我的 macbook pro 上面，node 版本是 8.9.1，花费了  `6 到 8 毫秒`。现在修改下上面的代码，把 `setImmediate(foo)` 换成 `setTimeout(foo, 0)`。如果换成 setTimeout(foo, 0), 这段代码花费了 `1400+ms` 定时器的每个阶段都需要做一些操作来决定一个计时器是否应该执行。长时间的执行也会导致更多的 ticks。然而，在 setImmediate 中，没有检查这一阶段，就好像在一个队列里面然后执行就行了.



* **我们有了 setTimeout(fn, 0)，为什么还需要setImmediate?**

首先不是 0，而是 1。当你设置一个计时器，时间为小于 1，或者大于 2147483647ms 的时候，它会自动设置为 1。因此你如果设置 setTimeout 的延迟时间为 0，它会自动设置为 1。

我们之前谈过，setImmediate 会减少额外的检查。因此 setImmediate 会执行更快一些。它也放置在轮询阶段之后，因此来自于任何一个到来的请求 setImmediate 回调将会立即被执行。



* **为什么 setImmediate 会被立即调用?**

  setImmediate 和 process.nextTick() 都命名错了。所以功能上，setImmediate 在下一个 tick 执行，nextTick 是马上执行的

* 

## **一些短的结论**

- 事件循环没有工作栈
- 事件循环不在一个单独的线程里面，JavaScript 的执行也不是像从队列中弹出一个回调执行那么简单。
- setImmediate 没有将回调推入到工作队列的头部，有一个专门的阶段和队列。
- setImmediate 在下一个循环执行，nextTick 实际上是马上执行。
- 当心，如果递归调用的话，nextTickQueue 可能会阻塞你的 node 代码。