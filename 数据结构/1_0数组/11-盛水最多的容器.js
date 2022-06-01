/*
  # 对撞指针
  给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai)
  在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)
  找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水

  输入：[1,8,6,2,5,4,8,3,7]
  输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，
      容器能够容纳水（表示为蓝色部分）的最大值为 49。

      S = h_min(h[i], h[j]) * (j - i)
      只需要穷举出所有最小板的面积即可。
  */

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let area = 0;
  let i = 0;
  let j = height.length - 1;
  while (i < j) {
    if (height[i] < height[j]) {
      area = Math.max(area, (j - i) * height[i]);
      i++;
    } else {
      area = Math.max(area, [j - i] * height[j]);
      j--;
    }
  }
  console.log(area);
  return area;
};
maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]);
