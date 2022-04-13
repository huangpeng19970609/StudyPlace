/* 
  在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，
  每一列都按照从上到下递增的顺序排序。请完成一个高效的函数，
  输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
*/
/* 
  [
    [1,   4,  7, 11, 15],
    [2,   5,  8, 12, 19],
    [3,   6,  9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
  ]
*/
var findNumberIn2DArray = function (matrix, target) {
  const _matrix = matrix;
  if (!matrix.length) return false;
  let m = 0,
    n = _matrix[0].length - 1;
  while (target !== _matrix[m][n]) {
    const value = _matrix[m][n];
    console.log(value);
    console.log(n);
    if (value > target) {
      n--;
    } else if (value < target) {
      m++;
    }
    console.log(n);
    if (m > _matrix.length - 1 || n < 0) {
      return false;
    }
  }
  return true;
};

console.log(findNumberIn2DArray([[-1, 3]], -1));
