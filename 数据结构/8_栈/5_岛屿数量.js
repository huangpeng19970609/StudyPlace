/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-11-23 13:56:48
 */

let grid = [
  ["1", "1", "1", "1", "0"],
  ["1", "1", "0", "1", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "0", "0", "1"],
];
numIslands(grid);

// 解题一 广度算法
/* 
  既然可以 => 岂不是寻觅后 => 使用栈进行广度的搜索
*/
function numIslands(grid) {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "1") {
        dfs(i, j, grid);
        count++;
      }
    }
  }
  console.log(count);
  return count;
}
function dfs(i, j, grid) {
  if (i < 0 || i >= grid.length || j < 0 || j < grid[0].length) {
    return false;
  }
  if (grid[i][j] === "0") {
    return false;
  }
  grid[i][j] = '0';
  dfs(i + 1, j, grid);
  dfs(i - 1, j, grid);
  dfs(i, j - 1, grid);
  dfs(i, j + 1, grid);
  
}
