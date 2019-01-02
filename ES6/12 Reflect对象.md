### Reflect



Reflect是一个内置对象，不是函数对象 所以不可构造。它提供拦截 JavaScript 操作的方法。它的所有属性和方法都是静态的，就想Math对象。





#### 静态方法

* Reflect.get(target, name)

```javascript
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
}

Reflect.get(myObject, 'foo') // 1
Reflect.get(myObject, 'bar') // 2
Reflect.get(myObject, 'baz') // 3
```



* Reflect.set(target, name, value)

  ```javascript
  var myObject = {
    foo: 1,
    bar: 2,
    get baz() {
      return this.foo + this.bar;
    },
  };
  
  var myReceiverObject = {
    foo: 4,
    bar: 4,
  };
  
  Reflect.get(myObject, 'baz', myReceiverObject) // 8
  ```

  第一个参数为对象 如果不是对象 就会报错。

* Reflect.has(obj, name)

  **has方法对应了Object对象里面的in，in操作符是命令式的 而has是函数的**

```javascript
var myObject = {
  foo: 1,
};
// 旧写法
'foo' in myObject // true
// 新写法
Reflect.has(myObject, 'foo') // true
```









