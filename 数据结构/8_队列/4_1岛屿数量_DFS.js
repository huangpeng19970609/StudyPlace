/* 
给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，
请你计算网格中岛屿的数量。
岛屿总是被水包围，
并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

输入：grid = [
  ["1", "1", "1", "1", "0"],
  ["1", "1", "0", "1", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "0", "0", "0"]
]
输出：1 
*/

/* 


*/
/**
 * @param {character[][]} grid
 * @return {number}
 */
const grid = [
  ["1", "1", "0", "0", "1"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"]
]
// dfs实现
console.log(
  numIslands(grid)
);
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  let count = 0; // 默认岛屿数量
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        count++;
        bfs(grid, i, j);
      }
    }
  }
  return count;
};
// DFS就是沿着一条路径一直走下去，当遇到终止条件的时候才会返回
function dfs(grid, i, j) {
  if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) {
    return;
  }
  if (grid[i][j] === '0') return;
  grid[i][j] = '0';
  dfs(grid, i - 1, j); // 上
  dfs(grid, i + 1, j); // 下
  dfs(grid, i, j - 1);// 左
  dfs(grid, i, j + 1);// 右
}
// BFS就是先访问圈内的，然后再把圈放大继续访问
// 到位置为1的格子，只要能把他们挨着的为1的全部置为0
// 然后挨着的挨着的为1的位置也置为0
function bfs(grid, x, y) {
  grid[x][y] = '0';
  let n = grid.length;
  let m = grid[0].length;

  // 用数组模拟队列=> 仅许 push 与 shift
  let queue = new Array();
  queue.push([x, y]);
  // 模拟 queue.isEmpty
  let cur;
  while (queue.length) {
    cur = queue.shift();
    let i = cur[0];
    let j = cur[1];
    // 【上】 排除首行 且上为1\

    if (i > 0 && grid[i - 1][j] === '1') {
      grid[i - 1][j] = '0';
      queue.push([i - 1, j]);
    }
    // 下
    if (i < n - 1 && grid[i + 1][j] === '1') {
      grid[i + 1][j] = '0';
      queue.push([i + 1, j]);
    }
    // 左
    if (j > 0 && grid[i][j - 1] === '1') {
      grid[i][j - 1] = '0';
      queue.push([i, j - 1]);
    }
    if (j < m - 1 && grid[i][j + 1] === '1') {
      grid[i][j + 1] = '0';
      queue.push([i , j + 1]);
    }
  }

}


