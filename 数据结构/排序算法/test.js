// 快速排序
function quickSort(arr) {
  return quick(arr, 0, arr.length - 1);
}
/*
  5 4 3 2 1
  1 2 3 4 5
*/
function quick(arr, i, j) {
  if (arr.length <= 1) return arr;
  let index = splitSort(arr, i, j);
  if (i < index - 1) {
    quick(arr, i, index - 1);
  }
  if (j > index) {
    quick(arr, index, j);
  }
  return arr;
}
function splitSort(arr, i, j) {
  const pivot = arr[Math.floor((i + j) / 2)];
  while (i <= j) {
    while (arr[i] < pivot) {
      i++;
    }
    while (arr[j] > pivot) {
      j--;
    }
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }
  return i;
}
let arr = [9, 8, 7, 6, 5];
quickSort(arr);
console.log(arr);
