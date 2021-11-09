var removeDuplicates = function (nums) {
  if (nums.length < 2) {
    return nums.length
  }

  for (var i = 0, j = 1; i < nums.length; i++) {
    console.log(i);
    console.log(j);
    console.log(nums);
    if (nums[i + 1] > nums[i]) {
      nums[j] = nums[i + 1]
      j++
    }
  }
  return j;
};

let arr = [0, 0, 1, 1, 2, 2, 3, 3];
removeDuplicates(arr);
console.log(arr);