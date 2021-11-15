function insertSort(arr) {
  let len = arr.length;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if ( arr[i] > arr[j] ) {
        [ arr[i], arr[j] ] = [ arr[j], arr[i] ]
      }
      
    }
    
  }
}

let arr = [9, 8, 8, 7, 6, 5, 4, 3, 2, 1];
insertSort(arr);
console.log(arr);
