/* 
输入：numbers = [2,7,11,15], target = 9
输出：[1,2]
解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 
提示: 双指针、缩减搜索空间以达到O(n)的办法
*/

function twoSum(numbers, target) {
  let i = 0;
  let j = numbers.length - 1;
  let sum;
  while (i <= j) {
    sum = numbers[i] + numbers[j];
    if (sum > target) {
      j--;
    }
    else if( sum < target ) {
      i++;
    }
    else return [i+1, j+1]
  }
  return [-1, -1]
}
console.log(
  twoSum([2, 7, 11, 15], 9)
);