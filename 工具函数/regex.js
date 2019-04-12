/**
 * 保留两位小数
 */

const SAVE_NUM = /^[0-9]+(.[0-9]{0,2})?$/; // 保留两位小数

const isAbsoluteURL = url => {
  // 判断是不是url http/https:// 或者 //
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

const isFormData = val => {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}