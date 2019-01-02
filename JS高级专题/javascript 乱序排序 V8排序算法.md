### 乱序

乱序就是打乱数组排序



> Math.random

```javascript

const sort = arr => arr.sort(() => Math.random() - 0.5);

let i = 0;

const times = [0, 0, 0, 0];

while(i < 100000) {
    let arr = [1, 2, 3, 4];
 	arr.sort(() => Math.random() - 0.5);
    times[arr[3] - 1]++;
}

```

上面数组乱序之后 发现并不是平均分配。



**V8在处理sort方法的时候 当目标数组长度小于10的时候 使用插入排序 反之 使用快排和插入排序的混合排序**



> 洗牌算法 shuffle 

```javascript
var times = [0, 0, 0, 0];

for (let i = 0; i < 100000; i++) {
  var arr = shuffle([1, 2, 3, 4]);
  // 统计平均次数
  times[arr[3] - 1]++;
}

function shuffle(a) {
  for (let i = a.length; i; i--) {
    // 随机抽一个位置互换
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a;
}
```





### 