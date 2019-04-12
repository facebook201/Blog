

### axios 项目目录

```text
├── /dist/                     # 项目输出目录
├── /lib/                      # 项目源码目录
│ ├── /cancel/                 # 定义取消功能
│ ├── /core/                   # 一些核心功能
│ │ ├── Axios.js               # axios的核心主类
│ │ ├── dispatchRequest.js     # 用来调用http请求适配器方法发送请求
│ │ ├── InterceptorManager.js  # 拦截器构造函数
│ │ └── settle.js              # 根据http响应状态，改变Promise的状态
│ ├── /helpers/                # 一些辅助方法
│ ├── /adapters/               # 定义请求的适配器 xhr、http
│ │ ├── http.js                # 实现http适配器
│ │ └── xhr.js                 # 实现xhr适配器
│ ├── axios.js                 # 对外暴露接口
│ ├── defaults.js              # 默认配置 
│ └── utils.js                 # 公用工具
├── package.json               # 项目信息
├── index.d.ts                 # 配置TypeScript的声明文件
└── index.js                   # 入口文件
```



* 根据axios的API去看源码

* axios的核心技术是什么 

  * 它是如何拦截请求响应并修改请求参数修改响应数据 和 axios是如何用promise搭起基于xhr的桥梁

  

* 看看相关的工具类方法





```javascript
/**
 * 去掉字符两头的空白
 */
function trim(str) {
  return str.replace(/^\s*/g, '').replace(/\s*$/, '');
}
```





### axios API

可以在官方github上看到 API的文档。 有哪些调用方式

```javascript
import axios from 'axios';
// 第一种 直接 axios(options) 直接
axios({
  url,
  methods,
  headers,
  params // 根据methods来传
})


// 第二种 axios(url[, config])
axios(url, {
  methods,
  headers,
  params
})

// 第三中 get delete方法 axios[method](url[, options])
axios.get(url, {
  
})

// 第四种 post put axios[methos](url[, data[, option]])
axios.post(url, data, {
  headers
})

// 第五种 axios.request(config)
axios.request({
  url,
  method,
  headers
});
```



**所有的调用方式最后都是通过request方法发出请求的**



```javascript
// 实现axios能够多种方式调用的核心方法
function createInstance(defaultConfig) {
  // 创建axios实例
  var context = new Axios(defaultConfig);

  // instance就指向了request方法 上下文指向context 可以直接instance(option)方式调用
  // Axios.prototype.request 内对第一个参数的数据类型判断。使我们能够以instance(url, option)方式调用
  var instance = bind(Axios.prototype.request, context);

  // 把axios上的方法扩展到实例上 这样就有了 get post的方法 并指定上下文为axios
  utils.extend(instance, Axios.prototype, context);

  // 把context对象上的自身属性和方法扩展到instance上
  // 注：因为extend内部使用的forEach方法对对象做for in 遍历时，只遍历对象本身的属性，而不会遍历原型链上的属性
  utils.extend(instance, context);
  return instance;
}

var axios = createInstance(defaults);


// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;
```

这里的代码就可以解释 axios()、axios.get()、axios.post() 。



所有的方法都是通过request发起请求的，那么request的config又是怎样的呢？ 怎么根据config配置发请求。

config的配置对象包含如下配置

* http请求适配器
* 请求地址
* 请求方法
* 请求头header
* 请求数据
* 请求或响应数据的装换
* 请求进度
* http状态码验证规则
* 超时 取消请求等等



#### 首先看看用户怎么自定义配置项

```javascript
import axios from axios;

// 一
axios.defaults[configName] = value;

// 二
axios({
  url,
  method,
  headers
});

// 第三种 创建一个实例传入配置项
let newAxiosInstance = axios.create({
  [configName]: value
});
```



### 如何拦截请求响应并修改请求参数修改响应数据

```javascript
function Axios(instanceConfig) {
  // ...
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
```

`InterceptorManager`构造函数就是用来实现拦截器的，这个构造函数原型上有3个方法：use、eject、forEach

* use  往拦截器里添加拦截方法
* eject 用来注销指定的拦截器
* 遍历this.handlers，并将this.handlers里的每一项作为参数传给fn执行





那么当我们通过`axios.interceptors.request.use`添加拦截器后， axios内部又是怎么让这些拦截器能够在请求前、请求后拿到我们想要的数据的呢？

```javascript
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  // 添加拦截器的请求和响应 注意：interceptor.fulfilled 或 interceptor.rejected 是可能为undefined
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  // 添加了拦截器后的chain数组大概会是这样的：
  // [
  //   requestFulfilledFn, requestRejectedFn, ..., 
  //   dispatchRequest, undefined,
  //   responseFulfilledFn, responseRejectedFn, ....,
  // ]

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

```



#### dispatch request   做了什么事情

```javascript
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  // 支持baseURL的配置
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  // 转换Data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  // 处理 header
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );
  // 删除header里面没有用的熟悉
  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  // http 会优先使用config上自定义的适配器 没有配置才会使用默认的XHR或http适配器
  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};
```



#### axios是如何使用promise搭起基于xhr的异步桥梁



xhrAdapter ===> dispatchRequest ===> Axios.prototype.request ===> axios



不管用什么方式调用axios，但是最后都是通过request方法 返回一个promise对象。**dispatchRequest方法会调用xhrAdapter方法 它返回的是一个Promise对象**



```javascript
// xhr.js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
 		// ... 
  });
}
```





#### 数据转换器

```javascript
// 修改全局的转换器
// `transformRequest` 允许在向服务器发送前，修改请求数据
// 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
// 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],
```



**请求装换器的使用地方是http请求钱 使用请求转换器对请求数据做处理，然后传给http请求适配器使用。**



####  转换器和拦截器的关系

请求时 拦截器主要负责修改config配置项， 转换器是负责转换请求体。转换对象为字符串在请求响应后，拦截器可以拿到response 数据转换器主要负责处理响应体。



```javascript
transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],
  

// 得到响应之后 转换为JSON对象
transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],
```



#### 如何已经发送取消请求

```javascript
axios.get(url, {
  cancelToken: new axios.CancelToken(cancel => {
    if (/* 取消条件 */) {
      cancel('取消日志');    
    }
  })
})
```

