/* 
  给你一个数组， 从数组中挑选任意个数， 以 组成目标值
  如 [3, 34, 4, 12, 5 ,2]   是否存在N个元素相加为9的情况？
*/

/* 
    如 [3, 34, 4, 12, 5 , 2]   是否存在N个元素相加为9

    opt[5]       opt[5] -> 选中   -> 7 ->选中   xxx ->
                                       ->不选中 xxx ->
                        -> 不选中 -> 9 -> 继续走 
    目的: opt[i] 中是否存在 0 ？
*/

// ------------------------------
// 递归实现
console.log(dep_subset([3, 34, 4, 12, 5, 2], 5, 35));
function dep_subset(arr, i, s) {
  if (i === 0) return arr[0] === s;
  if (s === 0) return true;
  if (arr[i] > s) return dep_subset(arr, i - 1, s);
  else {
    let a = dep_subset(arr, i - 1, s - arr[i]);
    let b = dep_subset(arr, i - 1, s);
    return a || b;
  }
}

/*           s   0   1   2   3   4   5   6   7   8   9 (因为我们当前传的是9, 若传1000, 则是 0 - 1000)、
            __________________________________________ 
 arr   index    
  3      0                   1   
  34     1       1   ->
  4      2       1   ->          1
  12     3       1   ->
  5      4       1   ->              1
  2      5       1   ->  1


  1. 我们称呼这个二维数组 为 subset数组 (子集数组)
  2. 举个例子, 二维数组代表了什么
     arr[2][3] => subset(2, 3),      即subset(2) 可不可以凑成3, 4 和 3 对不上， 故继续走
                                     即subset(1) 可不可以凑成3, 34 也不行， 故继续走
                                     即subset(0) 可不可以凑成3, 3
                                     故 subset(2, 3), subset(1, 3) subset(0, 3) 都可以凑成3
     ⭐ 站在二维的角度上看, 这便是代表 i - 1是不是可以的，即往上看 既可以便是都可以
  3. 请记住我们的结论
    i = 0, arr[0] = 3 且 s = 3 时, 为 true 
    s = 0, 为 true
    
                                     */
// 非递归 => 二维数组保存中间所有 子问题
function dp_subset(arr, sum) {
  // 请考虑 s 为 0 的情况 故 + 1
  // const subset = new Array(arr.length).fill(new Array(sum + 1).fill(false));
  const subset = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    subset[i] = new Array(sum + 1).fill(false);
    subset[i][0] = true;
  }
  // 第一行初始化
  if (sum >= arr[0]) subset[0][arr[0]] = true;
  // 遍历除第一行、第一列之外的内容
  for (let i = 1; i < arr.length; i++) {
    for (let j = 1; j < sum + 1; j++) {
      // 若大于, 显然【不选它】
      if (arr[i] > j) {
        // 向上回溯 opt[i - 1][j] 的结果怎么样
        subset[i][j] = subset[i - 1][j];
      }
      // 若小于 选它 || 不选它
      else {
        // 选了 sum - i
        let a = subset[i - 1][j - arr[i]];
        // 不选 向上
        let b = subset[i - 1][j];
        subset[i][j] = a || b;
      }
    }
  }
  return subset[arr.length - 1][sum];
}
console.log(dp_subset([3, 34, 4, 12, 5, 2], 221));
