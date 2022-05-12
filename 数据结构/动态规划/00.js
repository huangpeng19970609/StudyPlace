console.log(dp_subset([3, 34, 4, 12, 5, 2], 221));
function dp_subset(arr, sum) {
  const subset = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    subset[i] = new Array(sum + 1).fill(false);
    subset[i][0] = true;
  }
  if (arr[0] <= sum) {
    subset[0][arr[0]] = true;
  }
  for (let i = 1; i < arr.length; i++) {
    for (let j = 1; j < sum + 1; j++) {
      // 不选
      if (arr[i] > j) {
        subset[i][j] = subset[i - 1][j];
      } else {
        subset[i][j] = subset[i - 1][j] || subset[i - 1][j - arr[i]];
      }
    }
  }
  return subset[arr.length - 1][sum];
}
