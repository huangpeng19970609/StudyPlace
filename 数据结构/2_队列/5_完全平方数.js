/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-11-21 18:48:45
 */
/* 
  给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）
  使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。
  
  解题思路: 广度优先算法 + 二叉树
*/
var numSquares = function (n) {
  debugger;
let queue = new Array();
queue.push(0);

let visited = new Set();
visited.add(0);

let min = 0;
while (queue.length) {
  min++;
  // 为何要如此? => 创造二叉树形式
  let size = queue.length;
  for (let i = 0; i < size; i++) {
    console.log(i);
    let value = queue.shift();
    for (let j = 1; j * j <= n; j++) {
      let newValue = value + j * j;
      // 结束 j 循环
      if (newValue > n) break;
      // 已执行过
      if (visited.has(newValue)) {
        continue;
      };
      // bingo => 返回当前层数
      if (newValue === n) {
        console.log('===');
        return min
      };
      queue.push(newValue);
      visited.add(newValue);

    }
  }
  return min
}

};
console.log(
numSquares(13)
);