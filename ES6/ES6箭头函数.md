### 箭头函数 Arrows and Lexical This



ES6允许使用 "=>" 来定义函数

```javascript
// 如果只有一个参数
var f = v => v;
var f = function(v){
  return v;
}

//  如果不需要参数 或者只需要多个参数 就用一个圆括号表示
var f = () => 5;

var f = (num1, num2) => num1 + num2;

// 函数的简化作用
[1,2,3].map(v => v * v)

```



// 注意几点

* 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。

* 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。

* 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 rest 参数 （…arguments） 代替。

* 不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数。

  ​

上面四点中，第一点尤其值得注意。`this`对象的指向是可变的，但是在箭头函数中，它是固定的。

```javascript
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 1000);
}
var id = 21;
foo.call({ id: 42 }); // 42

// 这里this 如果是普通函数 this指向的就是window对象。但是这里是箭头函数 导致this总是指向函数定义生效时所在的对象
// 箭头函数可以让setTimeout里面的this，绑定定义时所在的作用域 就是继承了父类的作用域
```

#### 补充一下 window下面的两个方法。 setTimeout 和 setInterval两个方法。

注意 javascript 高级程序设计里面的一句话**超时调用的代码都是在全局作用域中执行的。因此函数中this的值在非严格模式下指向window对象，严格模式下是undefined**。



记住以下几点：

* **setTimeout中的延迟执行代码中的this永远都指向window**
* **setTimeout(this.method, time)这种形式中的this，即上文中提到的第一个this，是根据上下文来判断的，默认为全局作用域，但不一定总是处于全局下，具体问题具体分析。**
* **setTimeout(匿名函数, time)这种形式下，匿名函数中的变量也需要根据上下文来判断，具体问题具体分析**



```javascript
// 未使用箭头函数的写法
{
  ...
  addOptions: function (options) {
    var self = this;
    options.forEach(function(name, opts){
      self[name] = self.addChild(name, opts);
    });  
  } 
}

// 使用箭头函数后的写法
{
  ...
  addOptions: function (options) {
    options.forEach((name, opts) => {
      this[name] = this.addChild(name, opts);
    });   
  } 
}
```

**箭头函数没有独立的上下文。内部this会直接访问父类的**

1. 箭头函数不但没有独立 `this`，他也没有独立的 `arguments`，所以如果需要取不定参的时候，要么使用 `function`，要么用 ES6 的另一个新特性 **rest**

   var f = (…num) => num;

2. 箭头函数语法很灵活，在只有一个参数或者只有一句表达式做方法体时，可以省略相应括号。