
/**
 * author syo 2019/02/27
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

const sums = [1, 2, 5, 8];
const target = 6;

// target = nums[i] + nums[j]
// 返回 [i, j]

const towSum = function(nums = [], target) {
  const ret = [];
  for (let i = 0; i < nums.length; i++) {
    // 每次把可能的另一个值存起来 然后扩大ret的空间判断
    let temp = target - nums[i];
    if (ret[temp] !== undefined) {
      return [ret[temp], i];
    }
    // ret[2] = 1;
    ret[nums[i]] = i;
  }
};

// const ret = towSum(sums, target);



/** 
 * author syo
 * @param {string} s
 * @return {number}
 */

const lengthOfLongestSubstring = function(s) {
    let ret = [];
    
};


