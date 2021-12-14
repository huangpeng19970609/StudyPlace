/* 
  给你一个大小为 m x n 的矩阵 mat ，请以对角线遍历的顺序，用一个数组返回这个矩阵中的所有元素。\
  输入：mat = [[1,2,3],[4,5,6],[7,8,9]]
  输出：[1,2,4,7,5,3,6,8,9]
  https://leetcode-cn.com/problems/diagonal-traverse/solution/dui-jiao-xian-bian-li-fen-xi-ti-mu-zhao-zhun-gui-l/
*/

/**
 * @param {number[][]} mat
 * @return {number[]}
 */


/* 
  1.  每一次 对角线遍历的 一组其 x + y 等于一个固定的值
      且每一次的 x + y 都会递增 1
  2.  每一次对角线的遍历， 奇遍历.（↙） x-1, y+1
                           偶遍历（↗）   x+1 y-1
  3. 每一次对角线的初始值 => 由于第一条, 故起点 必然是 x + y
    1) 若 偶数  起点必然是左下角开始
      ⭐ 中心轴为分界线, 之前 x + y 以后 便是 m - 1
          其x 为 x + y => m - 1是数据显示的结果，你可以想一想为什么会这样，它其实很简单
          y1 则 i - x1
    2) 若 奇数  起点必然是右上角 
          其 y 的坐标应该为 x + y => n - 1 原因同上
          则 x 为 i - y
  4. 结束值
    1) x 为 0 时, x 为最大值的时
    2) y 为 0 时，y 为最大值的时
*/
var findDiagonalOrder = function (matrix) {
  debugger;
  let m = matrix.length;
  let n = matrix[0].length;
  let arr = [];
  // 代表 x + y
  let i = 0;
  // 对角线遍历次数
  while (i < m + n) {

    // 1, 3, 5, 7
    let x1 = (i < m) ? i : m - 1;
    let y1 = i - x1;
    while (x1 >= 0 && y1 < n) {
      arr.push(matrix[x1][y1]);
      x1--;
      y1++;
    }
    i++;
    if (i > m + n) break;

    let y2 = (i < n) ? i : n - 1;
    let x2 = i - y2;
    while (y2 >= 0 && x2 < m) {
      arr.push(matrix[x2][y2]);
      x2++;
      y2--;
    }
    i++;
  }
  return arr
};
findDiagonalOrder([[1,2,3],[4,5,6],[7,8,9]]);