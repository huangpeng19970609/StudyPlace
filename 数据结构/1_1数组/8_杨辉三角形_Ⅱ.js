// 给定一个非负索引 rowIndex，返回「杨辉三角」的第 rowIndex 行。
/**
输入: rowIndex = 3
输出: [1,3,3,1]

0             1                       00
1           1   1                   10  11
2         1   2   1               20  21  22
3        1   3   3  1            30 31  32  33
4     1   4   6   4   1
5   1   5  10  10  5   1
6  1  6  15  20  15  6   1 
*/
var getRow = function (rowIndex) {
  let arr = [[1], []];
  // 杨辉三角形的 高度
  for (let i = 0; i < rowIndex; i++) {
    arr[1] = [1];
    // 杨辉三角形的宽度 (首位与末尾都是 1 )
    for (let j = 1; j < arr[0].length; j++) {
      arr[1][j] = arr[0][j - 1] + arr[0][j];
    }
    arr[1].push(1);
    arr[0] = arr[1];
  }
  return arr[0];
};
