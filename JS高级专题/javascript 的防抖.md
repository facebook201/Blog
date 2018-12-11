## 惰性函数

概念函数： **解决每次都要进行判断的问题 懒得去判断**



如果你需要实现一个函数 这个函数返回首次调用时的Date对象。

```javascript
// 闭包
var foo = (function(){
    var t = null;
    return function() {
        if (t) return t;
        t = new Date();
        return t;
    }
})();

// 函数对象 函数本身也是对象
function foo() {
  if (foo.t) return foo.t;
  foo.t = new Date();
  return foo.t;
}

```



上面的两个方案虽然解决了问题 但是每次都要判断。 怎么不需要每次都判断

```javascript
// 惰性函数

var foo = function foo() {
  var t = new Date();
  foo = function() {
    return t;
  }
  return foo();  
};
```



#### 更多应用

```javascript
function addEvent(type, el, fn) {
    if (window.addEventListener) {
        // 以前的写法
        el.addEventListener(type, fn, false);
        // 惰性函数的写法
        addEvent = function(type, el, fn) {
            el.addEventListener(type, fn, false);
        }
    } else if (window.attachEvent) {
        el.attachEvent('on' + type);
    }
}
```









