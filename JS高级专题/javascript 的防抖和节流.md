#### 防抖

原理：**你尽管触发事件 但是我一定在事件触发n秒才执行，如果你在一个事件触发的n秒之内再次触发了这个事件，那么就会以触发的这个时间重新开始计算，再过n秒之后才会执行。**



```html
 <div id="sh">
    移动
  </div>
```





```javascript
  const sh = document.querySelector('#sh');
  let count = 0;

  sh.addEventListener('mousemove', getPageX(get, 200),false);

  function get(e) {
    // 这里
    console.log(count++);
  }

  function getPageX(fn, wait) {
    let timeout;
    return function() {
      // 监听鼠标移动事件之后 返回的其实是这个函数 然后可能会传一些参数event 等
      // 这里的this存起来 保证this指向dom
      const context = this;
      // 先保存起来 给定时器用
      let args = arguments;
      // 如果再次触发这个移动事件 先清除 重新
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        fn.apply(context, args);
      }, wait);
    }
  }
```





#### 如果我们加上一个第一次立即执行 然后等到停止触发n秒之后 才可以重新触发执行



```javascript

  function getPageX(fn, wait, immediate) {
    let timeout, result;

    const debounced = function() {
      const context = this;
      let args = arguments;

      // n秒之内触发的时候 就清除
      if (timeout) clearTimeout(timeout);

      // 如果立即执行
      if (immediate) {
        // 标记如果执行之后 不再执行
        let callNow = !timeout;
        timeout = setTimeout(function(){
          // 过了n秒之后才能继续执行
          timeout = null;
        }, wait);

        if (callNow) result = fn.apply(context, args);        
      } else {
        clearTimeout(time);
        timeout = setTimeout(function() {
          fn.apply(context, wait);
        }, wait);
      }
    }
    // 如果想取消的话 添加一个取消的函数
    debounced.cancle = function() {
      clearTimeout(timeout);
      timeout = null;
    };
    return debounced;
  }
```



#### 节流

防抖是在触发时间的n秒之后才会执行，在n秒之内如果再次触发就要等到n之后才会执行。

**节流是固定时间内 不管你怎么触发事件 都只会执行一次 固定时间段间断地执行。**



#### 时间戳的做法

使用时间戳，当触发事件的时候，我们取出当前的时间戳，然后减去之前的时间戳(最一开始值设为 0 )，如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳，如果小于，就不执行。

```javascript
 // 时间戳 固定n秒
  function getPageX(fn, wait) {
    let context, args;
    // 记录时间戳
    let previous = 0;

    return function() {
      context = this;
      args = arguments;

      let now = +new Date();
      
      // 如果超过时间限制
      if (now - previous > wait) {
        fn.apply(context, args);
        previous = now;
      }
    }
  }
```





那我们设置个 options 作为第三个参数，然后根据传的值判断到底哪种效果，我们约定:

leading：false 表示禁用第一次执行
trailing: false 表示禁用停止触发的回调 

```javascript
function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };
    return throttled;
}
```







#### 节流和去抖的应用场景



> 节流

*  DOM 元素的拖拽功能
* 计算鼠标移动的记录
* 搜索联想 keyup
* 监听滚动事件判断是否到页面底部自动加载更多 给 scroll家里debounce后 只有用户停止滚动后 才会判断是否到了页面底部，如果是节流 只要页面滚动就会间隔一段时间判断一次



> debounce 

* 文本输入的搜索
* 每次resize scroll 触发



