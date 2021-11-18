function mergeSort(arr) {
  let len = arr.length;
  if (len <= 1) return arr;
  let middle = Math.floor(len / 2);
  let left = mergeSort(arr.slice(0, middle));
  let right = mergeSort(arr.slice(middle, len));
  return merge(left, right)
}
function merge(left, right) {
  let i = 0;
  let j = 0;
  let arr = [];
  while ( i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      arr.push(left[i]);
      i++;
    }
    else {
      arr.push(right[j]);
      j++
    }
  }
  if ( i < left.length ) arr = arr.concat(left.slice(i));
  else arr = arr.concat(left.slice(j));
  return arr;
}



let arr = [6, 5, 7, 2, 1, 7, 2, 5, 7, 100];
console.log(
  mergeSort(arr)
);
