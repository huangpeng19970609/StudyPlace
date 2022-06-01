/* 
  [1, 2 ,4, 1, 7, 8, 3]
  要求1: 不可以选择其相邻值
  要求2: 你可以尽可能的获取最大的值，可以选多个
  opt: 最优解
  例如 arr = [1, 2 ,4, 1, 7, 8, 3]; i = 6 输出 15
*/
/* 
--------------------------------------------------
  [1, 2 ,4, 1, 7, 8, 3]
   0  1  2  3  4  5  6
                opt(6)
      opt(5)                    opt(4) + arr[6]
  opt(4)   opt(3) + arr[5]   .....          .....
  opt(0) 即 0
  opt(1) 即 max(opt(0), opt(1))
*/
// 利用递归实现 动态规划 -> 递归会出现【重叠子问题】
function opt_dep(arr, i) {
  if (i === 0) return arr[0];
  if (i === 1) return Math.max(arr[0], arr[1]);
  const a = opt_dep(arr, i - 1);
  const b = opt_dep(arr, i - 2) + arr[i];
  return Math.max(a, b);
}
console.log(opt_dep([1, 2, 4, 1, 7, 8, 3], 6));

function opt(arr, index) {
  let opt = new Array(index + 1).fill(0);
  opt[0] = arr[0];
  opt[1] = Math.max(arr[0], arr[1]);
  let i = 2;

  while (i <= arr.length - 1) {
    // 选
    opt[i] = Math.max(arr[i] + opt[i - 2], opt[i - 1]);
    i++;
  }
  return opt[index];
}
console.log(opt([4, 1, 1, 9, 1], 4));
