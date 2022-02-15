/**
 * @param {number} numRows
 * @return {number[][]}
 * 输入: numRows = 5
 * 输出: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
 *                  [0, 0]                                    1
 *              [1, 0]    [1, 1]                          1       1
 *         [2,0]     [2, 1]     [2, 2]                1       2       1
 *     [3,0]   [3, 1]     [3, 2]      [3, 3]      1       3       3       1
 */
var generate = function (numRows) {
  let arr = [];
  // 杨辉三角形的 高度
  for (let i = 0; i < rowIndex; i++) {
    arr[i] = [1];
    // 杨辉三角形的宽度 (首位与末尾都是 1 )
    for (let j = 1; j < i; j++) {
      arr[i][j] = arr[i - 1][j - 1] + arr[i - 1][j];
    }
    arr[i].push(1);
  }
  return arr;
};
generate(5);
