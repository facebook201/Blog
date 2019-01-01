;(function(){ 'use strict';

// 策略对象
const strategies = {
  // 是否为空
  isNonEmpty(value, errorMsg) {
    return value === '' ? errorMsg : void 0;
  },
  // 最小长度
  minLength(value, length, errorMsg) {
    return value.length < length ? errorMsg : void 0;
  },
  // 是否为手机号码
  isMobile(value, errorMsg) {
    return !/^1(3|5|7|8|9)[0-9]{9}$/.test(value) ? errorMsg : void 0;
  },
  // 是否为邮箱
  isEmail(value, errorMsg) {
    return !/^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) ? errorMsg : void 0
  }
};


// Validator 类
function Validator (){
  this.cache = []; // 保存校验规则
}
Validator.prototype.add = function(dom, rules) {
    for (let rule of rules) {
      let strategyAry = rule.strategy.split(':');
      let errorMsg = rule.errorMsg; // 用户名不能为空

      this.cache.push(() => {
        let strategy = strategyAry.shift(); // 用户挑选的strategy
        strategyAry.unshift(dom.value);     // 把input的value添加进参数列表
        strategyAry.push(errorMsg);
        return strategies[strategy].apply(dom, strategyAry);
      });
    }
  }

  Validator.prototype.start = function() {
    for (let validatorFunc of this.cache) {
      let errorMsg = validatorFunc(); // 开始校验取得返回信息
      if (errorMsg) {
        // 如果有返回值表示没有通过验证
        return errorMsg;
      }

    }
  }


// 环境角色 客户端调用代码

/*客户端调用代码*/
let registerForm = document.querySelector('#registerForm');

const validatorFunc = () => {
    let validator = new Validator();

    validator.add(registerForm.userName, [{
        strategy: 'isNonEmpty',
        errorMsg: '用户名不能为空！'
    }, {
        strategy: 'minLength:6',
        errorMsg: '用户名长度不能小于6位！'
    }]);

    validator.add(registerForm.passWord, [{
        strategy: 'isNonEmpty',
        errorMsg: '密码不能为空！'
    }, {
        strategy: 'minLength:',
        errorMsg: '密码长度不能小于6位！'
    }]);

    validator.add(registerForm.phoneNumber, [{
        strategy: 'isNonEmpty',
        errorMsg: '手机号码不能为空！'
    }, {
        strategy: 'isMoblie',
        errorMsg: '手机号码格式不正确！'
    }]);
    validator.add(registerForm.emailAddress, [{
        strategy: 'isNonEmpty',
        errorMsg: '邮箱地址不能为空！'
    }, {
        strategy: 'isEmail',
        errorMsg: '邮箱地址格式不正确！'
    }]);
    let errorMsg = validator.start();
    return errorMsg;
}

registerForm.addEventListener('submit', function() {
  console.log('1');
    let errorMsg = validatorFunc();
    if (errorMsg) {
        alert(errorMsg);
        return false;
    }
}, false);

}());