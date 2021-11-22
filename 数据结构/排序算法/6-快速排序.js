/* 
   快速排序 => O(nlogN) 
   思想: 
   快速排序是 冒泡排序的升级版 
   快速排序基本上被认为是相同数量级的所有排序算法中，平均性能最好的。
   也是分而治之的思想

  1. 选择值作为【主元 pivot】 -- 我们选择数组中间的值
  2. 创建两个指针，初始指首与尾。
  3. 移动左指针，直至比主元大, 接着移动右指针直到比privot小。并交换这个两个指针的值。
     重复此过程，直至左指针大于了右指针 =>  比主元小的都会在左边，比主元大的都在主元右边。
     称为【划分】
  4. 算法对划分后的小数组 重复此步骤 => 直至为1 非常像归并，但没有归并的分割步骤

  9 8 7 6 5 => 【5 6】 7 【8 9】 => 主元为2 left也为5 right为6 
 */
function quickSort(array) {
  return quick(array, 0, array.length - 1);
}
function quick(array, left, right) {
  let index;
  if (array.length <= 1) {
    return array
  }
  // index 返回的是划分的分界, 并非正好是pivot + 1 不要有这种误区 当前如下是因为我们使用的测试数据导致的
  index = partition(array, left, right);
  // 若数组中存在较小值的元素
  if (left < index - 1) {
    // [left, left_index)
    quick(array, left, index - 1)
  }
  // [pivot + 1, right]
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
  //  对撞指针
  while (i <= j) {
    // 移动left指针, 直到大于等于 pivot
    while (array[i] < pivot) {
      i++;
    }
    // 移动right指针, 直到 小于等于 pivot
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
  console.log(i);
  return i;
}
/* 
  [3, 5, 1, 6, 4, 7, 2]
  第一次划分以后 => [3, 5, 1, 2, 4, 7 ,6]
  第二次划分 => index 为 5
    较小值的划分 [3,5,1,2,4] => [1,5,3,2,4] 此时index为1 
      进行继续划分, 由于 index = 1 [0, 1 )左侧直接返回arr
      右侧划分=> [5,3,2,4] => [2, 3, 5, 4] 此时index 为 1
        再进行内部的划分[3, 5, 4] => [3, 4, 5] => 此时index 为 1
          => 故左边长度为1不移动 右侧长度为1不移动  
*/
let arr = [9, 8, 7, 6, 5, ];
quickSort(arr);
console.log(arr);