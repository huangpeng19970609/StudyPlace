/**
 * @param {string} s
 * @return {string}
 *  输入：s = "Alice does not even like bob"
    输出："bob like even not does Alice"
 */

// 我们在这里利用 js提供的可以去实现
var reverseWords = function (s) {
  // 去除开头与结尾
  s = s.trim();
  // 匹配空格符
  let arr = s.split(/\s+/);
  arr = arr.reverse().join(' ')
  return arr;
};

// 不过这个反转操作倒是与 压栈操作不谋而合
// 看似很简单的双指针却存在着非常多的细节问题要处理 否则无法编写正确的代码
// 想要一劳永逸的确实很困难W

var reverseWords = function (s) {
};

let s = "a    good     example"
console.log(
  reverseWords(s)
);

