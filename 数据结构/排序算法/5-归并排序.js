// nlogn 一个有实际意义的排序 => O(nlogN)
/* 
  归: 拆分=> 形如二叉树
  并: 合并
*/
// 大数组 => 拆分为小数组 => 在对小数组们进行排序 => 重复如此,直至只有一项
// 只有一项后便进行合并[这是递归栈的形式实现]
function mergeSort(arr) {
  const { length } = arr;
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
    }
    else {
      result.push(right[j++]);
    }
  }
  if ( i < left.length)  return result.concat(left.slice(i));

  else return result.concat(right.slice(j));
}


let arr = [9, 8, 7, 6, 6, 6, 5, 4, 3, 2, 1];
arr = mergeSort(arr)
console.log(arr);