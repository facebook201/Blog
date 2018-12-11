### this 是什么？



this是在运行时绑定的。并不是在编写时绑定的。它的上下文取决于函数调用时的各种条件。this的绑定和声明的位置没有任何关系，**this实际上是在函数被调用时发生的绑定 它指向什么完全取决于函数在哪里被调用**





#### 调用位置

**调用位置就是函数在代码中被调用的位置。最重要的是分析调用栈 到达当前执行位置所调用的所有函数**。



#### 绑定规则 五条规则 以及多个规则都可以用是的优先级

 

> 默认绑定

**独立函数调用 默认指向window，下面的foo是直接使用不带任何修饰符的函数引用进行调用的。因此只能使用默认绑定。**

```javascript
function foo() {
    console.log(this.a);
}
var a = 'lisi';
foo(); // lisi
```



> 隐式绑定

另一个需要注意的是调用位置是否有上下文对象。 或者说是是否被某个对象拥有或者包含。

```javascript
function foo() {
    console.log(this.a);
}

var obj = {
    a: 1,
    obj1: obj1
};

var obj1 = {
    a: 2,
    foo: f00
};

obj.obj2.foo(); // 2 最后一个是谁调用的


function foo1() {
    console.log(this.a);
}
var obj = {
    a: 1,
    foo1: foo1
};

var a = 'opps';

var bar = obj.foo1;
bar();// 'opps'

```



**回调函数的情况**

参数传递其实就是一种隐式赋值。因此传入函数时也会被隐式赋值。是一种默认调用 同时 **如果是内置函数 不是自己声明的函数也是一样 也是默认调用 例如 setTimeout(fn, delay)**

```javascript

function foo() {
  console.log(this.a);
}

function doFoo(fn) {
  fn();
}

var obj = {
  a: 1,
  foo: foo
};

var a = 'opps';
doFoo(obj.foo); // 'opps'
```

#### 显示调用  call apply



#### new绑定

**构造函数定义：** 构造函数只是一些使用new操作符时被调用的函数。并不会属于某个类 也不会实例化一个类。他们只是能被new操作符调用的普通函数 一般首字母大写而已。

new 出来调用foo时。 我们会构造一个新对象并把它绑定到foo调用中的this上。



#### 优先级

* 如果函数在new中调用 this绑定的是新创建的对象
* 函数是否通过call apply 显示调用 或者硬绑定调用 this指向那个上下文

