console.log(
  countingSort([5, 4, 3, 2, 1, 0])
);

function countingSort(array) {
  if (array.length < 2) return array;
  const maxValue = findMaxValue(array);
  const counts = new Array(maxValue + 1);
  // 计数排序
  array.forEach(element => {
    if (!counts[element]) counts[element] = 0;
    counts[element]++;
  });

  let sortedIndex = 0;
  counts.forEach( (count, i) => {
    while (count > 0) {
      array[sortedIndex++] = i;
      count--;
    }
  })
  return array;
}
function findMaxValue(array) {
  let max = array[0];
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) max = arr[i];
  }
  return max;
}