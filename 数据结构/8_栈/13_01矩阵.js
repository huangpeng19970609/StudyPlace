/*
  给定一个由 0 和 1 组成的矩阵 mat ，
  请输出一个大小相同的矩阵，其中每一个格子是 mat 中对应位置元素到最近的 0 的距离。
  两个相邻元素间的距离为 1
  输入：mat = [[0,0,0],[0,1,0],[0,0,0]]
  输出：[[0,0,0],[0,1,0],[0,0,0]]
  若你不理解 你应该参照这张图看
  这是一个9格子的矩阵，你需要计算的是每一个格子距离0最近的位置
*/
/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
  // 广度优先搜索
  // return bfs(mat)

  // 先找出在 00 边上的所有的 11，然后把这些 11 放到队列里，后续BFS的时候就只关心 11 的值
  return 
};
function bfs(mat) {
  const enqueue = [];
  let m = mat.length;
  let n = mat[0].length;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 若是0则将其全入栈
      if (mat[i][j] === 0) {
        enqueue.push([i, j]);
      }
      else {
        mat[i][j] = -1; // 代表无效值
      }
    }
  }
  // [dx, dy]便是四个方向
  let dx = [-1, 1, 0, 0];
  let dy = [0, 0, -1, 1];
  while (enqueue.length) {
    let point = enqueue.shift();
    let [x, y] = point;
    for (let i = 0; i < 4; i++) {
      let newX = x + dx[i];
      let newY = y + dy[i];
      if (newX < 0 || newY < 0 || newX >= m || newY >= n) continue;
      if (mat[newX][newY] === -1) {
        mat[newX][newY] = mat[x][y] + 1;
        enqueue.push([newX, newY]);
      }
    }
  }
  return mat;
}
console.log(
  updateMatrix([[0, 0, 0], [0, 1, 0], [1, 1, 1]])
);