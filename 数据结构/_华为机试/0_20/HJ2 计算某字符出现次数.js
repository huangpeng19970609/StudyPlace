/* 
  接受一个由字母、数字和空格组成的字符串，和一个字符，
  然后输出输入字符串中该字符的出现次数。（不区分大小写字母）

  输入： 
  ABCabc
  A
*/
let str = readline();
const value = readline().toLowerCase();
str = str.toLowerCase();
let count = 0;
for (let i = 0; i < str.length; i++) {
  if (str[i] === value) {
    count++;
  }
}
print(count);