
/**
 * 数组的展开
 */
function flatter(arr) {
   return arr.reduce((init, el) => {
     return init.concat(Array.isArray(el) ? flatter(el) : el);
   }, []);
}
