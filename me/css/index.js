let arrayLike = { length: 2, 0: 'a', 1: 'b' };


// 正确
for (let x of Array.from(arrayLike)) {
  console.log(x);
}