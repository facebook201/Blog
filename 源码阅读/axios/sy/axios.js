var Axios = require('../lib/core/Axios');


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
