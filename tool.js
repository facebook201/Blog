/** 
 * 判断字符串中是否有中文
 **/

function hasChianese(str) {
    return escape(str).indexOf('%u') > -1 ? 1 : 0;
}