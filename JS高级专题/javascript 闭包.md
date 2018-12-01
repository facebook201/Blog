## 闭包

首先说闭包的概念

> MDN

**闭包是指那些能够访问自由变量的函数 自由变量指的是 不是函数参数也不是局部变量的变量**

闭包 =  函数 + 函数能访问自由变量。



> 道格拉斯

**闭包是指在javascript中，内部函数总是可以访问其所在的外部函数中声明的参数和变量 即使外部函数的周期被终结之后**



> javascript 密码花园

**闭包是 JavaScript 一个非常重要的特性，这意味着当前作用域**总是**能够访问外部作用域中的变量。 因为 [函数]是 JavaScript 中唯一拥有自身作用域的结构，因此闭包的创建依赖于函数**



其实闭包的重要特性依赖于 作用域。函数拥有自身作用域的结构。 不能被外部访问。



```javascript
var foo = (function(){
    var secret = 'secret';
    // 闭包内的函数可以访问 secret变量 对外部是不可见的
    return {
        get_secret: function() {
           return secret; 
        },
        new_secret: function(new_secret) {
            secret = new_secret;
        }
    };
})();
```













