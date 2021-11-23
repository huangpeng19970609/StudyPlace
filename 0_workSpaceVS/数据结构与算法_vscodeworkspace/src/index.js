let grid = [
  ["1", "1", "1", "1", "0"],
  ["1", "1", "0", "1", "0"],
  ["1", "1", "0", "0", "1"],
  ["0", "0", "1", "0", "1"],
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
        bfs(i, j, grid);
        count++;
      }
    }
  }
  console.log(count);
  return count;
}
function bfs(x, y, grid) {
  let stack = new Array();
  if (grid[x][y] === "1") {
    stack.push({ i: x, j: y });
  }
  while (stack.length) {
    let position = stack.pop();
    let i = position.i;
    let j = position.j;
    grid[i][j] = "0";
    // 可以取上
    if (i > 0 && grid[i - 1][j] === "1") {
      stack.push({ i: i - 1, j });
    }
    // 可以取下
    if (i < grid.length - 1 && grid[i + 1][j] === "1") {
      stack.push({ i: i + 1, j });
    }
    // 可以取 左
    if (j > 0 && grid[i][j - 1] === "1") {
      stack.push({ i: i, j: j - 1 });
    }
    if (j < grid[0].length - 1 && grid[i][j + 1] === "1") {
      stack.push({ i: i, j: j + 1 });
    }
  }
}
