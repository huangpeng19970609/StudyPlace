let item;
let arr = [];
// 不要第一行
readline();
while (item = readline()) {
  arr.push(Number(item));
}
arr = mergeSort(arr);
let j = 1;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === arr[i + 1]) {
    continue;
  } else {
    arr[j] = arr[i + 1];
    j++;
  }
}
let index = 0;
j--;
while (j--) {
  print(arr[index++]);
}

function mergeSort(arr) {
  const {
    length
  } = arr;
  if (length <= 1) return arr;
  const middle = Math.floor(length / 2);
  const left = mergeSort(arr.slice(0, middle));
  const right = mergeSort(arr.slice(middle));
  arr = merge(left, right);
  return arr;
}

function merge(left, right) {
  let i = 0;
  let j = 0;
  const result = [];
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  if (i < left.length) return result.concat(left.slice(i));
  else return result.concat(right.slice(j));
}