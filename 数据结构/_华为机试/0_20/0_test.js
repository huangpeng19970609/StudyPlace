// 求质数
let num = 64577 || Number(readline());
const res = [];
let i = 2;
const tep = Math.sqrt(num);

while (i <= tep) {
  while (num % i === 0) {
    res.push(i);
    num /= i;
  }
  i++;
}
if (num != 1) {
  res.push(num);
}
console.log(res.join(' '));