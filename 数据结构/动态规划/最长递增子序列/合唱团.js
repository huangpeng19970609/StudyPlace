/*  
    ⭐ 最长递增子序列
    1. N 位同学站成一排，音乐老师要请最少的同学出列，使得剩下的 K 位同学排成合唱队形
    2. 123 124 125 123 121 是一个合唱队形
    3. 123 123 124 122不是合唱队形，因为前两名同学身高相等，不符合要求
    4. 123 122 121 122不是合唱队形，因为找不到一个同学，他的两侧同学身高递减
    
    问: 已知所有N位同学的身高，计算最少需要几位同学出列，可以使得剩下的同学排成合唱队形。
    输入： 8
          186 186 150 200 160 130 197 200

  https://blog.csdn.net/feengg/article/details/80866483?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_default&utm_relevant_index=2
*/

/*
    1. N 位同学站成一排，音乐老师要请最少的同学出列，使得剩下的 K 位同学排成合唱队形
    2. 123 124 125 123 121 是一个合唱队形
    3. 123 123 124 122不是合唱队形，因为前两名同学身高相等，不符合要求
    4. 123 122 121 122不是合唱队形，因为找不到一个同学，他的两侧同学身高递减
    
    问: 已知所有N位同学的身高，计算最少需要几位同学出列，可以使得剩下的同学排成合唱队形。
    输入： 8
          186 186 150 200 160 130 197 200
*/
let num = 8;
let arr = "186 186 150 200 160 130 197 200"
  .split(" ")
  .slice(0, num)
  .map((n) => parseInt(n));
const dp1 = getHeight(arr);
const dp2 = getHeight([...arr].reverse()).reverse();
let max = 0;
for (let i = 0; i < num; i++) {
  max = Math.max(max, dp1[i] + dp2[i] - 1);
}
console.log(arr.length - max);

function getHeight(arr) {
  if (arr.length === 1) return [1];
  const dp = new Array(arr.length).fill(1);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return dp;
}
