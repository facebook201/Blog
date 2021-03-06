﻿/**
 *交换元素
 * @param {arr 操作的数组}
 * @param {i 数组的索引}
 * @param {j 数组的索引}
 */

function checkArray(array) {
  // 如果无参数 或者只有两个值 就不排序
  if (!array || array.length <= 2) return
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

// 测试数组
var arr = [1, 3, 12, 187, 21, 2, 45, 3, 68, 13, 45, 90, 12, 123, 3, 12];

/**
 * 冒泡排序 稳定的排序
 */
function bubbleSort(arr) {
  let len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}

/**
 * 选择排序
 */
function selectionSort(arr) {
    var minLen,
        temp,
        len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        minLen = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minLen]) {
                minLen = j;
            }
        }
        // 交换元素
        temp = arr[i];
        arr[i] = arr[minLen];
        arr[minLen] = temp;
    }
    return arr;
}

/**
 * 插入排序
 **/
function insertSort(arr) {
    var len = arr.length;

    var prev, current;
    for (var i = 1; i < len; i++) {
        pre = i - 1;
        current = arr[i];
        while (pre >= 0 && arr[pre] > current) {
            // 把大的赋值给小的
            arr[pre + 1] = arr[pre];
            pre--;
        }
        arr[pre + 1] = current;
    }
}

/**
 * 1 选择一个基准元素 把序列分成两个
 * 2 对列表重新排序 把所有小于基准值的元素放在基准值的前面 大于的放到基准值的后面
 * 3 分别对小的和大的序列重复此步骤
 */

function quickSort(arr) {
      var len = arr.length;

      // 判断是否为空数组
      if (!len) {
        return [];
      }

      // 定义两个集合 存放大于 和 小于基准值的数组
      var lessList = [],
          biggerList = [];

      // 选择第一个元素为基准值
      var pivot = arr[0];

      for (var i = 1; i < len; i++) {
          if (arr[i] > pivot) {
              biggerList.push(arr[i]);
          } else {
              lessList.push(arr[i]);
          }
      }
      // 重复 处理两个子集合
      return quickSort(lessList).concat(pivot, quickSort(biggerList));
}

// 二分查找

function binarySearch(data, arr) {
    arr.sort(function(a, b) {
        return a - b;
    });
    var len = arr.length;
    var start = 0,
        end = len - 1;

    while (start <= end) {
        var middle = Math.floor((start + end) / 2);

        if (data < arr[middle]) {
            end = middle - 1;
        } else if (data > arr[middle]) {
            start = middle + 1;
        } else {
            return middle;
        }
    }
    return -1;
}


/**
 * 洗牌算法 随机排序
 */
// 这是一种错误的伪随机
function shuffle(arr) {
    return arr.sort(() => {
        return Math.random() - 0.5;
    })
}

function shuffle(arr) {
    if (arr.length <= 1) return arr;
    for (let i = arr.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
    }
    return arr;
}

/**
 * 快排
 * @param {} arr 
 */

function quickSort(arr) {
    if (arr.length <= 1) return arr;
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];

    var left = [];
    var right = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
}

/**
 * 原地快排
 * 基准的取值规则是取最左边的元素，黄色代表当前的基准，绿色代表小于基准的元素，紫色代表大于基准的元素。
 * 我们会发现，绿色的元素会紧挨在基准的右边，紫色的元素会被移到后面，然后交换基准和绿色的最后一个元素，
 * 此时，基准处于正确的位置，即前面的元素都小于基准值，后面的元素都大于基准值。然后再对前面的和后面的多个元素取基准，做排序。
 */

function quickSort(arr) {

	function swap(arr, a, b){ 
		[arr[a], arr[b]] = [arr[b], arr[a]];
	}
		
	function partition(arr, left, right) {
		var pivot = arr[left];
		var storeIndex = left; // 索引 开始是最左边的

		for (let i = left + 1; i <= right; i++) {
			if (arr[i] < pivot) {
				swap(arr, i, ++storeIndex);
			}
		}

		swap(arr, left, storeIndex);
	}

	function sort(arr, left, right) {
		if (left < right) {
			var storeIndex = partition(arr, left, right);
			sort(arr, left, storeIndex - 1);
			sort(arr, storeIndex + 1, right);
		}
	}

	sort(arr, 0, arr.length - 1);

	return arr;
}