> Property 和 attribute 的 区别？

DOM节点本质上是一个JS对象。所以它也会有一些属性。className、nodeName、

nodeType属性等。 **这些都是JS范畴的属性 符合JS语法标准**

property的获取和修改是直接改变JS对象。 而 attribute 是直接改变 HTML属性。attribute就是对HTML属性的get和set。

```javascript
var pList = document.querySelectorAll('p')
var p = pList[0]
p.getAttribute('data-name')
p.setAttribute('data-name', 'juejin')
p.getAttribute('style')
p.setAttribute('style', 'font-size:30px;')
```

而且 get 和 set 还会触发DOM的查询或重排 频繁操作会影响页面性能



> 