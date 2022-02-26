// 0. 是冒泡排序的优化版本 本质是与冒泡排序差不多的思想
// 1. 相比于冒泡排序的优点: 选择排序进行的交换操作很少
function selectSort(arr) {
  let minIndex, temp;
  for (let i = 0; i < arr.length; i++) {
    minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}
