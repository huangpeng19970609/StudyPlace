/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-11-14 15:21:20
 */
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
 var merge = function (nums1, m, nums2, n) {
  let i = m - 1;
  let j = n - 1;
  let index = m + n - 1;
  while (index >= 0) {
    if (i >= 0 && j >= 0) {
      if (nums1[i] > nums2[j]) {
        nums1[index] = nums1[i--];
      }
      else {
        nums1[index] = nums2[j--];
      }
    }
    // nums1到头了
    else if (j >= 0) {
      nums1[index] = nums2[j--];
    }
    // 连nums2都结束了
    else {
      break;
    }
    index--;
  }
};