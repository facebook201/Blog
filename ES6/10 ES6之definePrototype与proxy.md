#### Proxy

proxy可以理解为目标对象之间架设的一层“拦截” 外界对该对象的方法 都必须先通过这层拦截



#### 首先看看 defineProperty 方法

这个方法可以在一个对象上定义一个新属性。或者修改一个对象的现有属性 并返回这个对象。

> Object.definePrototype(obj, prop, descriptor)

```
obj: 要在其上定义属性的对象。

prop:  要定义或修改的属性的名称。

descriptor: 将被定义或修改的属性的描述符。
```

函数的第三个参数 descriptor 所表示的属性描述符有两种形式：**数据描述符和存取描述符**。

两者都有以下两个键值

**configurable，**

```
当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，也能够被删除。默认为 false。
```

**enumerable**

```
当且仅当该属性的 enumerable 为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false。
```



**数据描述符同时具有以下可选键值**：

**value**

```
该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。
```

**writable**

```
当且仅当该属性的 writable 为 true 时，该属性才能被赋值运算符改变。默认为 false。
```



**访问器属性同时具有以下可选键值**：

**get**

```
一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。该方法返回值被用作属性值。默认为 undefined。
```

**set**

```
一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为 undefined。
```



**属性描述符必须是数据描述符或者存取描述符两种形式之一，不能同时是两者**





#### proxy

Object.definePrototype 只能定义get、set的行为。 Proxy有更多的行为。

```javascript
let p = new Proxy(target, handler);
```

proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。其中，new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。

```javascript
let p = new Proxy({}, {
  get(obj, prop) {
    console.log('设置get');
    return obj[prop];
  },
  set(obj, prop, value) {
    console.log('设置set');
    obj[prop] = value;
  }
});

p.count = 35; // set
p.count; // get 35

```

除了 get 和 set 之外，proxy 可以拦截多达 13 种操作，比如 has(target, propKey)，可以拦截 propKey in proxy 的操作，返回一个布尔值。



#### proxy实现的双向绑定

























