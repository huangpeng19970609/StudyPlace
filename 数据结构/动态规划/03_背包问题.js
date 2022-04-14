/* 
  现在 有四个物品
  背包容量为 8
  背包最多能装入的价值的物品是多少？

  物品编号:   1     2    3     4
  物品体积：  2     3    4     5
  物品价值:   3     4    5     6
*/
const max = 8;
const weight = [1, 2, 3, 4];
const values = [3, 4, 5, 6];
console.log(opt(max, weight, values));
function opt(max, weight, values) {
  const num = weight.length;
  const subset = new Array(weight.length + 1);
  for (let i = 0; i < num + 1; i++) {
    subset[i] = new Array(max + 1);
    //  背包容量为0时
    subset[i][0] = 0;
  }
  // 物品编号为0时(无物品)
  for (let j = 0; j < max + 1; j++) {
    subset[0][j] = 0;
  }

  for (let i = 1; i < num + 1; i++) {
    for (let j = 1; j < max + 1; j++) {
      // 不选
      if (weight[i - 1] > j) {
        subset[i][j] = subset[i - 1][j];
      } else {
        // 不选
        const a = subset[i - 1][j];
        // 选
        const b = values[i - 1] + subset[i - 1][j - weight[i - 1]];
        subset[i][j] = Math.max(a, b);
      }
    }
  }
  return subset[num][max];
}

// 若你想知道背包装入了哪些物品 便是需要使用【回溯】
