
/**
 * 快排
 */

// 第一种 切割元素分成小数组排序

const arr = [12, 34, 2, 3, 18, 19, 20, 73, 7, 34, 23];

function quickSort(arr) {
  if (arr.length < 1) { return arr};

  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0]; // splice 返回一个数组 取里面的值对比
  var left = [];
  var right = [];
  for(var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
}

const ret = quickSort(arr);

/**
 * 上面的方法在于切割数组 [1, 2, 3] [12] [23, 21]
 * 那么能不能 通过交换位置来达到切割数组的效果呢
 * 原地排序 [1, 2, 2, 3, 12, 34, 23, 13] 12 左边 0~3 是一组 12 右边是一组
 */





