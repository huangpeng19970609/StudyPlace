/* 
  输入：180
  2 2 3 3 5
  按照从小到大的顺序输出它的所有质数的因子，以空格隔开。
*/
let num = 180 || Number(readline());
const res = [];
let i = 2,
  tep = num;
const mySqrt = Math.sqrt(tep);
// 2 -> 3 -> 4 -> .... -> mySqrt (也可以包括自身)
while (i <= mySqrt) {
  // 是否存在2的质数 -> 若其可以除尽
  while (num % i === 0) {
    // 若其可以除尽 其是质数
    res.push(i);
    // 获得一个质数 便缩小范围 去寻找下一个质数
    num /= i;
  }
  i++;
}
if (num != 1) {
  res.push(num);
}
console.log(res.join(' '));