/*
  编写一种算法，若M × N矩阵中某个元素为0，则将其所在的行与列清零。
输入：
[
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
输出：
[
  [1,0,1],
  [0,0,0],
  [1,0,1]
]
 */
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
 var setZeroes = function (matrix) {
  let xAxis = [];
  let yAxis = [];
  let array = matrix;
  let x = array[0].length;
  let y = array.length;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === 0) {
        xAxis.push(i);
        yAxis.push(j);
      }
    }
  }
  xAxis = new Set(xAxis);
  yAxis = new Set(yAxis);
  xAxis.forEach((item) => {
    for (let i = 0; i < x; i++) {
      array[item][i] = 0;
    }
  })
  yAxis.forEach((item) => {
    for (let i = 0; i < y; i++) {
      array[i][item] = 0;
    }
  })
};
setZeroes(
  [
    [0, 1, 2, 0],
    [3, 4, 5, 2],
    [1, 3, 1, 5]
  ]
)