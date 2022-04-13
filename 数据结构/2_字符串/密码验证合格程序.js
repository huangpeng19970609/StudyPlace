/* 
密码要求:
  1.长度超过8位
  2.包括大小写字母.数字.其它符号,以上四种至少三种
  3.不能有长度大于2的不含公共元素的子串重复 （注：其他符号不含空格或换行）
*/
let temp;
const arr = [];
while ((temp = readline())) {
  console.log(isValidate(temp));
}
function isValidate(str) {
  if (str.length < 8) return "NG";

  let [a, b, c, d] = [0, 0, 0, 0];
  if (/[a-z]/.test(str)) a = 1;
  if (/[A-Z]/.test(str)) b = 1;
  if (/\d/.test(str)) c = 1;
  if (/[^a-zA-Z\d\s\n]/.test(str)) d++;
  if (a + b + c + d < 3) return "NG";

  for (let i = 0; i < str.length - 3; i++) {
    let s = str.substr(i, 3);
    if (str.substr(i + 1).lastIndexOf(s) !== -1) {
      return "NG";
    }
  }
  return "OK";
}
