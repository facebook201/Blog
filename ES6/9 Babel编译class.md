#### 编译一

```javascript
class Person {
    constructor(name) {
        this.name = name;
    }
}

// babel 编译
'use strict';

function _classCallCheck(instance, Constructor) { 
    if (!(instance instanceof Constructor)) { 
        throw new TypeError("Cannot call a class as a function"); 
    }
}

var Person = function Person(name) {
  _classCallCheck(this, Person);
  this.name = name;
};

var p = new Person('zhangsan');
```

_classCallCheck 检查Person 是否通过new的方式调用，在上面 我们也说过 类必须使用new调用。否则会报错。



#### 编译二

```javascript
class Person {
  // 实例属性
  foo = 'foo';
  // 静态属性
  static bar = 'bar';
}
let p = new Person('zhangsan');
// 编译
var Peroson = function Person(name) {
  _classCallCheck(this, Person);
  this.foo = 'foo';
  this.name = name;
}
// 静态属性
Person.bar = 'bar';

'use strict';

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self; 
}

function _inherits(subClass, superClass) {
  // extends 的继承的目标必须是函数或者 null
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); 
  }

  // 类似ES5的寄生组合式继承  通过设置子类的prototype熟悉的 __proto__ 属性指向 父类的prototype属性
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { 
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true 
    }
  });

  // 设置子类的 __proto__ 属性指向父类
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; 
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) { 
    throw new TypeError("Cannot call a class as a function");
  }
}

var Parent = function Parent(name) {
  _classCallCheck(this, Parent);
  this.name = name;
};

var Child = function (_Parent) {
  _inherits(Child, _Parent);

  function Child(name, age) {
    _classCallCheck(this, Child);

    var _this = _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, name));

    _this.age = age;
    return _this;
  }

  return Child;
}(Parent);
```

