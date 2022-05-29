// 冒泡第一位  次数: n - 1
// 冒泡第二位  次数: n - 2
// 冒泡第三位

// ⭐ O (n²)
function swap(array, a, b) {
  [array[a], array[b]] = [array[b], array[a]];
}
function bubleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] > array[j]) {
        swap(array, i, j);
      }
    }
  }
  return array;
}
