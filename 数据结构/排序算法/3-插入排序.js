function insertSort(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j > 0; j--) {
      if (nums[j - 1] > nums[j]) {
        [nums[j - 1], nums[j]] = [nums[j], nums[j - 1]]
      }
    }
  }
}
let arr = [0, 9, 8, 1, 3]
insertSort(arr)
console.log(arr);