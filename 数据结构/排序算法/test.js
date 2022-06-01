/*
  1. DNS 解析
  2. 三次握手
  3. 页面渲染
  4. 四次挥手
*/
function splitMerge(arr) {
  if (arr.length <= 1) return arr;
  const middle = Math.floor(arr.length / 2);
  const left = splitMerge(arr.slice(0, middle));
  const right = splitMerge(arr.slice(middle));
  return arr = merge(left, right);
}
function merge(left, right) {
  let i = 0;
  let j = 0;
  const result = [];
  while ( i < left.length  && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    }
    else {
      result.push(right[j++]);
    }
  }
  if (i < left.length) {
    return [...result, ...left.slice(i)];
  }
  else {
    return [...result, ...right.slice(j)];
  }
}
let arr = [2, 2, 1, 100];
arr = splitMerge(arr);
console.log(arr);