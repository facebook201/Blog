Ajax主要是靠 XMLHttpRequest设计的API。但是它没有关注分离、配置比较混乱、基于事件模型也没有Promise、async/await 友好。



### 区别

* fetch 返回的promise 将不会拒绝http的错误状态 即使响应是一个HTTP 404 或者 500
* 在默认情况下fetch不会接受或者发送cookies

```javascript
var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.responseType = 'json';
xhr.onload = function(){
  console.log(xhr.response);
}
xhr.send();
```



上面的写法看起来也不舒服。 但是如果我们使用了Fetch.

```javascript
fetch(url).then(function(response){
  return response.json();
}).then(function(data){
  console.log(data);
}).catch(function(e){
  consle.log('error');
});
```



使用 async/await 来做最终优化

```javascript
async function getInfo() {
  let user = await fetch('http://api.hyyxedu.com/v1/index/graph?html=1');
  let data = user.json();
  return data;
}

getInfo().then(v => {console.log(v)})
```



##Fetch

* Fecth 请求默认不带cookie 需要设置 fetch(url, {credentials: 'include'})

* 服务器返回 400 500 错误码并不会reject 只有网络错误 导致请求不能完成的 fetch 才会被reject

  ​

它是window的一个方法。

* 第一个参数url 
* 第二个参数可选参数 可以控制不同的init对象
* 使用js 中的promise对象

```javascript
fecth(url).then(res => {
  return res.json(); // 执行成功第一步
}).then(data => {
  // 执行成功的第二步
  return data;
}).catch(err => {
  // 中途报错 这里会捕捉
  console.log(err);
});
```



* fetch默认是get请求。 可以使用method.post 来进行配置
* 第一步中 response 有许多方法 json() text() formData() 
* Fecth 跨越的时候 默认不带cookie 需要手动指定 credentials: 'include'

```Javascript
// 配置可选参数
var init = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
  mode: 'cors',
  cahce: 'default',
  credentials: 'include'  // 带cookie
};
```



#### 一般使用方法

```javascript
var fetchMethod = fetch(url, {
  method: 'get'
}).then(res => {
  return res.json();
}).catch(err => {
  console.log(err);
});


fetchMethod.then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});

// post
fetch('/users', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Hubot',
    login: 'hubot',
  })
})
```



参数说明

#### url

定义要获取的资源。这可能是：

- 一个 `USVString` 字符串，包含要获取资源的 `URL`。
- 一个 `Request` 对象。

#### options（可选）

一个配置项对象，包括所有对请求的设置。可选的参数有：

- `method`: 请求使用的方法，如 `GET`、`POST`。
- `headers`: 请求的头信息，形式为 `Headers` 对象或 `ByteString`。
- `body`: 请求的 `body` 信息：可能是一个 `Blob`、`BufferSource`、`FormData`、`URLSearchParams` 或者 `USVString` 对象。注意 `GET` 或 `HEAD` 方法的请求不能包含 `body` 信息。
- `mode`: 请求的模式，如 `cors`、 `no-cors` 或者 `same-origin`。
- `credentials`: 请求的 `credentials`，如 `omit`、`same-origin` 或者 `include`。
- `cache`: 请求的 `cache` 模式: `default`, `no-store`, `reload`, `no-cache`, `force-cache`, 或者 `only-if-cached`。

#### response

一个 `Promise`，`resolve` 时回传 `Response` 对象：

- 属性：
  - `status (number)` - HTTP请求结果参数，在100–599 范围
  - `statusText (String)` - 服务器返回的状态报告
  - `ok (boolean)` - 如果返回200表示请求成功则为true
  - `headers (Headers)` - 返回头部信息，下面详细介绍
  - `url (String)` - 请求的地址
- 方法：
  - `text()` - 以`string`的形式生成请求text
  - `json()` - 生成`JSON.parse(responseText)`的结果
  - `blob()` - 生成一个`Blob`
  - `arrayBuffer()` - 生成一个`ArrayBuffer`
  - `formData()` - 生成格式化的数据，可用于其他的请求
- 其他方法：
  - `clone()`
  - `Response.error()`
  - `Response.redirect()`

#### response.headers

- `has(name) (boolean)` - 判断是否存在该信息头
- `get(name) (String)` - 获取信息头的数据
- `getAll(name) (Array)` - 获取所有头部数据
- `set(name, value)` - 设置信息头的参数
- `append(name, value)` - 添加header的内容
- `delete(name)` - 删除header的信息
- `forEach(function(value, name){ ... }, [thisContext])` - 循环读取header的信息