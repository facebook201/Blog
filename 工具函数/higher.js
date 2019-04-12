/**
 * Higher 是关于高级函数的使用和介绍
 * 包含 柯里化 偏函数 惰性函数 缓存函数 组合函数 bind apply call 等
 **/

// 柯里化 curry

function curry(fn) {
  let args = [].slice.call(arguments, 1);
  return function() {
    // innerArgs 是待传入的参数
    let innerArgs = [].slice.call(arguments);
    let finalArgs = args.concat(innerArgs);
    return fn.apply(null, finalArgs); 
  }
};

function add(a, b) {
  return a + b;
}

const addCurry = curry(add);
console.log(addCurry(1, 2));


/**********************
 2 惰性函数 修改函数自己本身 
***********************/

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

// 惰性函数
var foo = function foo() {
  var t = new Date();
  // 修改自己
  foo = function() {
    return t;
  }
  return foo();  
};

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
