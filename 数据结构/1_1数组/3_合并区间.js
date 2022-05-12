/* 
  以数组 intervals 表示若干个区间的集合
  其中单个区间为 intervals[i] = [starti, endi]
  请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间

输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
      [[1,4],[4,5]] => [[1, 5]]
*/

function swap(array, a, b) {
  [array[a], array[b]] = [array[b], array[a]]
}

function babelSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i][0] > arr[j][0]) {
        swap(arr, i, j)
      }
    }
  }
  return arr;
}

var merge = function (intervals) {

  let count = 0;
  intervals = babelSort(intervals);
  let arr = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const item = intervals[i];
    let cur = arr[count];
    if (cur[1] >= item[0] && cur[1] <= item[1]) {
      cur[1] = item[1];
    }
    else if (cur[0] <= item[0] && cur[1] >= item[1]) {
      continue;
    }
    else {
      arr.push(item);
      count++;
    }
  }
  return arr;
};
console.log(
  merge([[1, 4], [2, 3]])
);