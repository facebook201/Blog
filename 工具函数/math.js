/**
 * Math 是关于number计算的函数
 **/



/**
 * 1 小数点保留n位
 * @param x 做近似处理的数
 * @param n 小数点后第n位
 * @return 处理的结果
 * 本质上也是通过除法解决丢失进度的问题
 */

// Math.pow(base, exponent) 返回base的指数次幂 比如 Math.pow(10, 2) // 返回的就是100 此函数也就是先放大你想要的倍数 再除 除法不会

function roundFractional(x, n) {
  return Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
}
