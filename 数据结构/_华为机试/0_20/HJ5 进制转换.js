/* 
输入描述：输入一个十六进制的数值字符串。
输出描述：输出该数值的十进制字符串。不同组的测试用例用\n隔开
输入: 0xAA
输出: 170
*/
const Type = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15
}
let str = readline();
// 123456 // 6位
let sum = 0;
str = str.slice(2);
for (let i = str.length - 1; i >= 0; i--) {
  // 0 - 9
  let val = 0;
  if (!isNaN(str[i])) {
    val = Number(str[i]);
  } else {
    val = Type[str[i]]
  }
  sum += Number(val) * Math.pow(16, str.length - 1 - i);
}
print(sum);


// -------------------------------
let newstr = parseInt(str, 16); //  Number.parseInt(str,16) 
console.log(newstr);