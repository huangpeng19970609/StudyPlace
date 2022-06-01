/* 
  编写一个函数来查找字符串数组中的最长公共前缀。
  如果不存在公共前缀，返回空字符串 ""。
  输入：strs = ["flower","flow","flight"]
  输出："fl"
*/
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (!strs.length) return "";
  if (strs.length === 1) return strs[0]
  strs.sort((a, b) => {
    return -(a.length - b.length);
  })
  let longestStrArr = strs[0].split('');
  strs = strs.slice(1);
  let i;
  for (i = 0; i < longestStrArr.length; i++) {
    let len = 0;
    while (len < strs.length) {
      if (strs[len].slice(0, i + 1) !== longestStrArr.slice(0, i + 1).join('')) {
        return longestStrArr.slice(0, i).join('');
      }
      len++;
    }
  }
  return longestStrArr.slice(0, i).join('');
};

function betterPrefix(strs) {
  if (!strs || !strs.length) return '';
  let prefix = strs[0];
  // 迭代 publicPrefix
  for (let i = 0; i < prefix.length; i++) {
    let char = prefix.charAt(i)
    // 迭代 所有字符串
    for (let j = 0; j < strs.length; j++) {
      // 若不相等直接返回
      if (char !== strs[j].charAt(i)) {
        return prefix.substring(0, i)
      }
    }
  }
} 