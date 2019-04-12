
var toString = Object.prototype.toString;

function isArray(val) {
  return toString.call(val) === '[object Array]';
}

function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/**
 * 去掉字符两头的空白
 */
function trim(str) {
  return str.replace(/^\s*/g, '').replace(/\s*$/, '');
}

/**
 * 
 */
function forEach(obj, fn) {
  if (obj == null) {
    return;
  }
  // 强行改成数组
  // Force an array if not already something iterable
  if (typeof !== 'object') {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (var i = 0; i < obj.length; i ++) {
      // 元素索引和array
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}


/**
* 深度合并多个对象为一个对象
 */
function merge(/* obj1, obj2  */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0; i < arguments.length; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}


// 将一个对象的熟悉和方法扩展到另一个对象上 并制定上下文
/**
 * @params {Object} a 被扩展的对象
 * @params {Object} b 源对象
 * @params {Obejct} thisArg 绑定的上下文
 */

function extends(a, b, thisArg) {
  forEach(b, function assignValue(val, key){
    if (typeof val === 'function' && thisArg) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}