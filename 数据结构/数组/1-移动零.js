/* 
  给定一个数组 nums，
  编写一个函数将所有 0 移动到数组的末尾
  同时保持非零元素的相对顺序。
*/
function moveZero(nums) {
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [ nums[j], nums[i] ] = [ nums[i], nums[j] ] 
      j++;
    }    
  }
  return nums;
}
let arr = [0, 0, 0, 1, 2, 3, 0, 4, 5]
moveZero(arr);
console.log(arr);
