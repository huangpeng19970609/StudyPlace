function quickSort(arr) {
  return quick(arr, 0, arr.length - 1);
}
function quick(arr, left, right) {
  if (arr.length <= 1) return arr;
  let index = partition(arr, left, right);
  if (left < index - 1) {
    quick(arr, left, index - 1);
  }
  if (right > index) {
    quick(arr, index, right);
  }
  return arr;
}
function partition(arr, left, right) {
  // 中止条件 left > right
  let pivot = Math.floor((left + right) / 2);
  let i = left;
  let j = right;
  const pivotVal = arr[pivot];
  while (i <= j) {
    //
    while (arr[i] < pivotVal) {
      i++;
    }
    while (arr[j] > pivotVal) {
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
let arr = [3, 5, 1, 6, 4, 7, 2];
quickSort(arr);
console.log(arr);


var x = 1;
function test(x, y = function() {
  console.log(x)
  x = 3
  console.log(x)
}) {
  console.log(x);
  var x = 2;
  y();
  console.log(x);
}

test()

console.log(x);