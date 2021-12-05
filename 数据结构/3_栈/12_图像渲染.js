/*
  坐标 (sr, sc) 表示图像渲染开始的像素值（行 ，列）和一个新的颜色值 newColor，让你重新上色这幅图像。
  记录初始坐标的上下左右四个方向上像素值与初始坐标相同的相连像素点，
  接着再记录这四个方向上符合条件的像素点与他们对应四个方向上像素值与初始坐标相同的相连像素点
  输入:
    image = [[1,1,1],[1,1,0],[1,0,1]]
    sr = 1, sc = 1, newColor = 2

  输出: 
    [[2,2,2],[2,2,0],[2,0,1]]
  解题思路:
    dfs + bfs 思路即可实现, 所以没读懂，不过看看题解即可。
*/
// bfs
var floodFill = function (image, sr, sc, newColor) {
  let enqueue = new Array();
  let target = image[sr][sc];
  enqueue.push([sr, sc]);
  let m = image.length;
  let n = image[0].length;
  let colors = {};
  image.map((item, index) => {
    colors[index] = {};
  })
  while (enqueue.length) {
    debugger;
    let indexArr = enqueue.shift();
    let [x, y] = [indexArr[0], indexArr[1]];
    if (x < 0 || y < 0 || x >= m || y >= n) continue;
    if (colors[x][y] === 1) continue;
    colors[x][y] = 1; 
    if (image[x][y] !== target) continue;
    image[x][y] = newColor;
    enqueue.push([x + 1, y]);
    enqueue.push([x - 1, y]);
    enqueue.push([x, y + 1]);
    enqueue.push([x, y - 1]);
  }
  return image
}


// 使用dfs解决此问题
var _floodFill = function (image, sr, sc, newColor) {
  const target = image[sr][sc];
  let visted = {};
  image[sr].map((item, index) => {
    visted[index] = {};
  });
  return deepFill(target, image, sr, sc, newColor, visted);
};
function deepFill(target, image, sr, sc, newColor, visted) {
  if (sr < 0 || sr >= image.length) return;
  if (sc < 0 || sc >= image[0].length) return;
  if (visted[sr][sc] === 1) return;
  if (image[sr][sc] !== target) {
    return;
  };
  visted[sr][sc] = 1;
  image[sr][sc] = newColor;
  deepFill(target, image, sr + 1, sc, newColor, visted);
  deepFill(target, image, sr - 1, sc, newColor, visted);
  deepFill(target, image, sr, sc + 1, newColor, visted);
  deepFill(target, image, sr, sc - 1, newColor, visted);
  visted[sr][sc] = 2;
  return image;
}
let image = [[0, 0, 0], [0, 1, 1]]
let sr = 1, sc = 1, newColor = 10;
let a = floodFill(image, sr, sc, newColor);
console.log(a);