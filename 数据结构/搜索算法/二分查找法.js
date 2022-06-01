/* 
 #1 while的 <= 的判定问题
    答: 因为 right为 arr.length - 1, 故判断的时候也应考虑right
        若你right 为 arr.length, 此时显然不需要考虑right, 等于号也可以去掉。
        但right 为 arr.length的情况更多是表示右侧的开区间的含义。用于范围的表述。
  #2 left = middle + 1 为什么此时要 +1
    答： 因为我们的搜索范围是zuoy
*/
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let middle;
  let value;
  // left < right 为何 是小于?
  while (left <= right) {
    middle = Math.floor((left + right) / 2);
    value = arr[middle];
    if (target === value) return middle;
    else if (target > value) {
      // 为何加1 => 因为右闭
      left = middle + 1;
    }
    else if ( target < value ) {
      // 因为左闭
      right = middle - 1;
    }
  }
  return -1;
}
console.log(
  binarySearch([5, 25, 75], 100)
);