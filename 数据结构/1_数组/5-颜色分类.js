/* 
  给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，
  并按照红色、白色、蓝色顺序排列
  此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
  nums = [2,0,2,1,1,0] => [0,0,1,1,2,2]
*/
// 冒泡排序
var sortColors = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      if (nums[i] > nums[j]) {
        [nums[i], nums[j]] = [nums[j], nums[i]]
      }
    }
  }
};
// 选择排序
var sortColors = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    let minIndex = i;
    for (let j = i; j < nums.length; j++) {
      if (nums[j] < nums[i]) {
        minIndex = j;
      }
    }
    [nums[minIndex], nums[i]] = [nums[i], nums[minIndex]]
  }
};
// 插入排序
var sortColors = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j > 0; j--) {
      if (nums[j - 1] > nums[j]) {
        [nums[j - 1], nums[j]] = [nums[j], nums[j - 1]]
      }
    }
  }
};

let nums = [2, 0, 2, 1, 1, 0];
sortColors(nums);
console.log(nums);
