/*
  给定 matrix =
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],
原地旋转输入矩阵，使其变为:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
你应该首先快速定位到规律 => [i, j] => [j, 倒数i行] => 故辅助函数即可
但不占用额外内存空间能否做到就提升了此题的难度了
*/
var rotate = function (matrix) {
  let len = matrix[0].length - 1
  let copyMatrix = matrix[0].map(item => new Array(len).fill(0));
  for (let i = 0; i < matrix[0].length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      copyMatrix[j][len - i] = matrix[i][j];
    }
  }
  console.log(copyMatrix);
  for (let i = 0; i < copyMatrix[0].length; i++) {
    matrix[i] =  copyMatrix[i];
  }
};
rotate([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
])
// 但由于题目要求: Do not return anything, modify matrix in-place instead.故此法不行
// 当然你可以再次循环 个个赋值，但不是很好, 复杂略, 无时间


