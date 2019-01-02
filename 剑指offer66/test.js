
/**
 * 第一 查找
 * 在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，
 * 每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
 */

function Find(target, array) {
  let len = array.length - 1;
  let i = 0;

  while((len >= 0) && (i < array[len].length)) {
    if (target > array[len][i]) {
      len--;
    } else if (target < array[len][i]) {
      i++;
    } else {
      return true;
    }
  }
  return false;
}


/**
 * 第二 字符串
 * 请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。
 */

function replaceSpace(str) {
    return str.replace(/\s/g, '%20');
}


