/* 
  示例 1：
  输入：s = "Let's take LeetCode contest"
  输出："s'teL ekat edoCteeL tsetnoc"
  示例 2:
  输入： s = "God Ding"
  输出："doG gniD"
  给定一个字符串 s ，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。
*/
var reverseWords = function (s) {
  // 1. 空格为单词的分界线
  let str = "";
  let reverserStr = "";
  for (let i = 0; i < s.length; i++) {
    const item = s[i];
    const isLast = i === s.length - 1;
    if ((i === s.length - 1 && (str += item)) || item === " ") {
      reverserStr += getStr(str);
      str = "";
      if (!isLast) reverserStr += " ";
      continue;
    }
    str += item;
  }
  console.log(reverserStr);
  return reverserStr;
  function getStr(str, isLast) {
    let _str = "";
    for (let j = str.length - 1; j >= 0; j--) {
      _str += str[j];
    }
    return _str;
  }
};
reverseWords("Let's take LeetCode contest");

//
