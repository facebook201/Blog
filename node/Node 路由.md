### Node路由

我们需要的所有数据都会包含在request对象中。 该对象作为onRequest 回调函数的第一个参数传递。 但是为了解析这些数据，我们需要额外的Nodejs模块，他们分别是url 和 querystring 模块。



```javascript
 url.parse(string).query
                                           |
           url.parse(string).pathname      |
                       |                   |
                       |                   |
                     ------ -------------------
http://localhost:8888/start?foo=bar&hello=world
                                ---       -----
                                 |          |
                                 |          |
              querystring.parse(queryString)["foo"]    |
                                            |
                         querystring.parse(queryString)["hello"]
```





