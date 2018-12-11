### 参数按值传递



> ECMAScript 中所有参数都是按值传递的 **把函数外部的值复制给函数内部的参数 就和把值从一个变量复制到另一个变量一样**



举几个例子

##### 按值传递

```javascript
var val = 1;
function foo(v) {
    v = 2;
    console.log(v); // 2
}
foo(val);
console.log(val); // 1

```

当传递value到函数foo。拷贝了一份val，假设是_val, 修改的\_val  但是不会影响原来val的值



#### 按引用传

```javascript
var object = {
    value: 0
};
function foo(o) {
    o.value = 1;
    console.log(o.value); // 1
}

foo(object);
object.value; // 1

// 第二种
function foo(o) {
    o = 1;
    console.log(o); // 1
}

foo(object);
object.value; // 0


```

上面第一种改变了值 但是第二种又没有改成功。为什么？



**简单来说按值传递是拷贝一份值。跟以前的值是不一样的，引用传递其实是共享传递，也就是拷贝一份对象的副本**

