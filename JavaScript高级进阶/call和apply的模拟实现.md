#### call 和 apply

call和apply方法都是Function原型上的方法。使用一个指定的this值和若干个指定的参数值的前提下调用某个函数或方法。

```javascript
var foo = {
    value: 1
};
function bar() {
    console.log(this.value);
}
bar.call(foo); // 1
```

call函数改变了this的指向，指向foo。同时bar函数执行了。



**从上面的代码我们可以知道this执向了foo。所以我们可以假想foo有一个bar函数 这样 foo.bar()执行的话 this就指向了foo**



模拟步骤

* 将函数设置为对象的属性
* 执行该函数
* 删除这个函数

```javascript
Function.prototype.call1 = function(context) {
    // context就相当于上面的foo 那么我可以在context添加一个函数
    context.fn = this;
    context.fn();
    delete context.fn;
};

```