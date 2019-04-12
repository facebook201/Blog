### CommonJS

Node的每一个文件就是一个模块 都有自己的作用域，在一个文件里面定义的变量、函数、类都是私有的，对其他的文件不可见。



**CommonJS规定，每个模块内部 module变量代表当前模块，这个变量是一个对象，它的属性exports是对外的接口。加载某个模块 其实是加载该模块的module.exports属性。**



CommonJS的特点

* 所有代码都运行在模块作用域 不会污染全局作用域
* 模块可以多次加载 但是只会在第一次加载的时候运行一次 结果会被缓存 之后再加载就直接读取缓存结果 要想模块再次运行 必须清楚缓存。
* 模块加载的顺序 在代码中出现的顺序



#### module.exports

module.exports 属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取`module.exports`变量。

#### exports

为了方便 Node为每个模块提供一个exports变量，指向module.exports。也就是说可以直接通过exports对象上添加方法。**但是不能直接将exports指向一个值，因为这样等于切断了exports和module.exports的联系**。



**Module.exports才是真正的接口，exports只不过是它的一个辅助工具。　最终返回给调用的是Module.exports而不是exports。**



1. module.exports 初始值为一个空对象 {}
2. exports 是指向的 module.exports 的引用
3. require() 返回的是 module.exports 而不是 exports











