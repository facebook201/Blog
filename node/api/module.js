
function Hello() {
  let name = 'lisi';

  this.setName = function(name) {
    name = name;
  };

  this.sayName = function(){
    console.log('hello' + name);
  }
}

module.exports = Hello;
