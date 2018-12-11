####  继承的多种方式



#### 1 原型链继承

```javascript
function Parent() {
  this.name = 'zhangsan';
}

Parent.prototype.getName = function() {
  console.log(this.name);
};

function Child() {
    
}

Child.prototype = new Parent();

var child = new Child();

child.getName(); // '张三'
```

1、引用类型的属性被所有实例共享 （ 如果你修改一个实例的原型属性 会影响其他的原型属性 ）

2、在创建Child的实例时 不能向Parent传参



#### 2 借用构造函数 （经典继承）

```javascript
function Parent(name) {
  this.name = 'zhangsan';
}

function Child(name) {
  Parent.call(this, name);
}

var child = new Child('lisi');

console.log(child.name); // '张三'
```

这种方式虽然解决了引用共享的问题 但是每次创建实例都会创建一次方法 



#### 3 组合继承

共享的方法放在原型上 独立的熟悉放在构造函数内。

```javascript
function Parent(name) {
  this.name = 'zhangsan';
  this.color = ['read'];
}

Parent.prototype.getName = function() {
  console.log(this.name);
}

function Child(name, age) {
  // 继承属性
  Parent.call(this, name);
  this.age = age;
}

// 继承方法
Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child = new Child();

child.getName();
```



#### 原型式继承

```javascript
// 道格拉斯提出的
function create(o) {
    function f() {}
    // o相当于一个实例对象
    f.prototype = o;
    return new f();
}

var person = {
  name: 'zhangsan',
  friends: ['lisi', 'wangwu']
};

var p1 = Object.create(person);
var p2 = Object.create(person);

p1.friends.push('张三');

console.log(p1.friends);
console.log(p2.friends);

```

原型继承的引用类型属性都会共享相应的值 跟原型链继承一样。



#### 寄生组合式继承

组合式继承的缺点是调用了两次父类的构造函数。第一次是在把实例赋给子类型的原型，另一次是在子类构造函数里面调用父类构造函数。

**寄生组合就是 借用构造函数来继承属性，通过原型链的混成形式来继承方法，不必为了指定子类型的原型而调用超类型的构造函数，我们需要的就是超类原型的一个副本 **

```javascript

function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'gree'];
}

Parent.prototype.sayName = function() {
  console.log(this.name);
};

function Child(name, age) {
  // 只需要调用一次构造函数
  Parent.call(this, name);
  this.age = age;
}

prototype(Child, Parent);

Child.prototype.sayAge = function() {
  console.log(this.age);
};

function prototype(child, parent) {
  var prototype = Object.create(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}
```







