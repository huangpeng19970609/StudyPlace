/* 
  https://www.nowcoder.com/practice/f9c6f980eeec43ef85be20755ddbeaf4?tpId=37&tags=&title=&difficulty=0&judgeStatus=0&rp=1&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D37%26type%3D37
  
  1. 满意度是指所购买的每件物品的价格与重要度的乘积的总和

  2. 他希望在花费不超过 N 元的前提下，使自己的满意度达到最大

  3. 请你帮助王强计算可获得的最大的满意度。

  4. 他把想买的物品分为两类：主件与附件，附件是从属于某个主件的
     如果要买归类为附件的物品，必须先买该附件所属的主件，且每件物品只能购买一次。
     
  5. 每个主件可以有 0 个、 1 个或 2 个附件。

    预算是 1000, 可购买的个数: 5
      商品价格    满意度           (q)
    1   800         2               0
    2   400         5               1
    3   300         5               1
    4   400         3               0
    5   500         2               0
    如果 q=0 ，表示该物品为主件，如果 q>0 ，表示该物品为附件， q 是所属主件的编号）
*/

// 价钱的最小单位
let base = 10;
// sum: 总预算    num: 总数量
let [sum, num] = readline().split(" ");
sum = sum / base;

let list = {};
for (let i = 0; i < num; i++) {
  // a: 价格
  // b: 满意度
  // c: 编号
  let [a, b, c] = readline().split(" ").map(Number); // ⭐ map的新语法get
  // 若其是附件
  if (c) {
    // 将其添加至对应的【主件】上
    list[c] = list[c] || [];
    list[c][1] = list[c][1] || [];
    list[c][1].push(a / base, (a / base) * b);
  }
  // 以 编号作为 key
  else {
    // 若附件先创建出来主件, 主件 -> list[i + 1]
    list[i + 1] = list[i + 1] || [];
    list[i + 1][0] = [a / base, (a / base) * b];
  }
}
// [[[80,160],[40,200,30,150]],[[40,120]],[[50,100]]]
// 将伪数组转为数组
list = [...Object.values(list)];
buy(list);

const _list = [
  // 物件-1
  [
    // 主件-1
    [80, 160],
    // 例属的附件集合
    [40, 200, 30, 150],
  ],
  // 物件-2
  [[40, 120]],
  // 物件-3
  [[50, 100]],
];
function buy(m) {
  // 数量
  let length = m.length;
  let dp = Array.from({ length: length }, () => new Array(sum + 1).fill(0));
  dp[-1] = new Array(sum + 1).fill(0);
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < sum + 1; j++) {
      // 不选
      if (j < m[i][0][0]) {
        dp[i][j] = dp[i - 1][j];
      } else {
        // 一共有 0 | 1 | 2三种情况
        let w1, w2, v1, v2;
        // 若其存在附件
        if (m[i][1]) {
          w1 = m[i][1][0];
          v1 = m[i][1][1];
          w2 = m[i][1][2];
          v2 = m[i][1][3];
        }
        // 不选
        const a = dp[i - 1][j];
        // 选中
        const b = dp[i - 1][j - m[i][0][0]] + m[i][0][1];
        // 姑且不考虑附件情况
        dp[i][j] = Math.max(a, b);
        // 若存在附件1 (w1存在) -> 此表达式非NaN
        if (j >= m[i][0][0] + w1) {
          dp[i][j] = Math.max(
            // 不选
            dp[i][j],
            // 选此附件 获取 opt(prev(i)) + weight（自身价值） + 附件价值
            dp[i - 1][j - m[i][0][0] - w1] + m[i][0][1] + v1
          );
        }
        // 附件2存在
        if (j >= m[i][0][0] + w2) {
          dp[i][j] = Math.max(
            // 不选
            dp[i][j],
            // 选此附件 获取 opt(prev(i)) + weight（自身价值） + 附件价值
            dp[i - 1][j - m[i][0][0] - w2] + m[i][0][1] + v2
          );
        }
        if (j >= m[i][0][0] + w1 + w2) {
          dp[i][j] = Math.max(
            // 不选
            dp[i][j],
            // 选此附件 获取 opt(prev(i)) + weight（自身价值） + 附件价值
            dp[i - 1][j - m[i][0][0] - w1 - w2] + m[i][0][1] + v1 + v2
          );
        }
      }
    }
  }
  print(dp[len - 1][sum] * base);
}
