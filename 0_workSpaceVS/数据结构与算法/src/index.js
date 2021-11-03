/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-10-31 23:29:49
 */
function swap(array, a, b) {
  // ES5特别的值之间的交换 => 
  // 相当于 array[a] 与 array[b]的交换
  [array[a], array[b]] = [array[b], array[a]]
}
function changeSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] > array[j]) {
        swap(array, i, j)
      }
    }
  }
  return array;
}

let arr = bubleSort([-1, 9, 2, 3, -4, 100]);
console.log(arr);