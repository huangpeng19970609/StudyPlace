
/* 
  1. 外层for循环决定了希尔排序多次的分组规则, 10 => 5 => 2 => 1 => end
  2. 第二层循环 进行分组, 目的就是为了分组 => gap为5, 则代表其有五组存在 => 5 6 7 8 9
  3. 第三次循环 进行分组之间的比较规则 
    1) j - gap >= 0 保证while的循环的正确性
    2) arr[i] < arr[j -gap]是分组比较的条件
    3) 当分 1组的时候, j = j - gap gap为1 便是挨个比较
       j = j - gap 是思想核心 也是为什么希尔排序称为最小增量的原因


  1 到增量为1时，其实多数情况下只需微调即可
*/
function shellSort(arr) {
  let len = arr.length;
  // gap => 5
  for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // gap为5时 => i为 5,6,7,8,9 => 对应 0 1 2 3 4的排序比较
    for (let i = gap; i < len; i++) {
      let j = i;
      let currentVal = arr[i];
      while (j - gap >= 0 && currentVal < arr[j - gap]) {
        [arr[j], arr[j - gap]] = [arr[j - gap], arr[j]]
        j -= gap;
      }
    }
  }
}
let arr = [99, 88, 77, 66, 55, 44, 33, 22, 11, 0]
shellSort(arr)
console.log(arr);