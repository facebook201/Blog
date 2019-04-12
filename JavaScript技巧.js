/**
 * 快速打印一个五分制的评分
 */

function getRating(rating) {
  if (rating > 5 || rating < 0) throw new Error('数字不在范围内');
  return '★★★★★☆☆☆☆☆'.substring(5 - rating, 10 - rating );
}

/**
 * 获得一个n位的随机数
 */
function getRandomStr(number = 10) {
	return Math.random().toString(36).substr(2, 10);
}


/**
 * 数据扁平化 如果是数字
 * [1, [2, [3, 4], 5], 6, 7]
 */
function flatter(arr) {
	return arr.toString().split(',').map(el => Number.parseInt(el));
}

/**
 * 使用科学计数法表示大数字
 * 100000000 跟 2E8 是一样的 
 */


/**
 * 使用 + 将其他类型转换成Number类型
 */


/**
 * 取整数
 */
console.log(~~3.14); // => 3
console.log(~~(-2.5)); // => -2
​
console.log(6.18 | 0); // => 6
console.log(-3.6 | 0); // => -3
​
console.log(9.9 >> 0); // => 9
console.log(-2.1 >> 0); // => -2

/**
 * 判断一个整数是不是-1
 * ~ 操作符的运算规律可以简单记作将加一的结果取反
 */
console.log(~1); // => -2
console.log(~0); // => -1
console.log(~(-3)); // => 2
console.log(~(-1)); // => 0
​
const number = -2;
​
// 判断一个数是否为 -1
if (!~number) {
    // 当 number 是 -1 的操作...
}

/**
 * 优雅的解构赋值
 */
// name: 'lyreal666',
// age: 23,
// speak() {
// 		console.log(`Hello, I'm ly!`);
// }
// }
// ​
// for (const [key, value] of Object.entries(me)) {
// console.log(`${key}: ${value}`);
// }
​
/* =>
name: lyreal666
age: 23
speak: speak() {
		console.log(`Hello, I'm ly!`);
}
*/

