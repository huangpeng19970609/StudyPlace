/* 
   快速排序 => O(nlogN) => 也是分而治之的思想
   思想
  1. 选择值作为【主元 pivot】 -- 我们选择数组中间的值
  2. 创建两个指针，初始指首与尾。
  3. 移动左指针，直至比主元大, 接着移动右指针直到比privot小。并交换这个两个指针的值。
     重复此过程，直至左指针大于了右指针 =>  比主元小的都会在左边，比主元大的都在主元右边。
     称为【划分】
  4. 算法对划分后的小数组 重复此步骤 => 直至为1 非常像归并，但没有归并的分割步骤

  9 8 7 6 5 => 【5 6】 7 【8 9】 => 主元为 5 left也为5 right为6 
 */
function quickSort(array) {
  return quick(array, 0, array.length - 1);
}
function quick(array, left, right) {
  let index;
  if (array.length <= 1) {
    return array
  }
  index = partition(array, left, right);
  if (left < index - 1) {
    quick(array, left, index - 1)
  }
  if (index < right) {
    quick(array, index, right)
  }
  return array;
}
function partition(array, left, right) {
  // 中间值为主元
  const pivot = array[Math.floor((left + right) / 2)];
  let i = left;
  let j = right;
  // left 与 right没有交错便继续执行
  while (i <= j) {
    // 移动left指针直到比主元大
    while (array[i] < pivot) {
      i++;
    }
    // 移动right指针直到比主元小
    while (array[j] > pivot) {
      j--;
    }
    // 交换主元两侧 => left 与 right移动至下一步骤 => 各自收缩。
    if (i <= j) {
      [array[i], array[j]] = [array[j], array[i]];
      i++;
      j--;
    }
  }
  //  i 此时 就应该等于 pivot 主元                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
  return i;
}
let arr = [9, 8, 7, 6, 5, ];
quickSort(arr);
console.log(arr);