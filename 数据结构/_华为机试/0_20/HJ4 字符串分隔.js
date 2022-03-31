/* 
  •连续输入字符串，请按长度为8拆分每个输入字符串并进行输出；
  •长度不是8整数倍的字符串请在后面补数字0，空字符串不处理。
  输入：
    abc

  输出：
    abc00000

  输入：
    123456789

  输出：
    12345678
    90000000
  */
let str = readline();
let count = Math.floor(str.length / 8);
if (count <= 0) {
  while (str.length < 8) {
    str += '0';
  }
  print(str);
}
// 123456789
else if (count > 0) {
  let num = 8 - str.length % 8;
  if (num !== 8) {
    while (num--) {
      str += '0';
    }
  }
  let temp = 0;
  while (count !== -1) {
    const me = str.slice(0 + temp * 8, (temp + 1) * 8);
    print(me);
    temp++;
    count--;
  }
}

// ⭐ --------------
var lines = '';
while (line = readline()) {
  var str = line + '00000000'
  for (let i = 8; i < str.length; i += 8) {
    console.log(str.slice(i - 8, i));
  }
}