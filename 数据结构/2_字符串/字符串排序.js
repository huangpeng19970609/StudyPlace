let line;
while ((line = readline())) {
  let arr = line.split("");
  let sorted = [];
  for (let i = 0; i < 26; i++) {
    for (let j = 0; j < arr.length; j++) {
      const code = arr[j].charCodeAt();
      if (code === 65 + i) {
        sorted.push(arr[j]);
      } else if (code === 97 + i) {
        sorted.push(arr[j]);
      }
    }
  }
  for (let i = 0; i < arr.length; i++) {
    if (!/[A-Za-z]/g.test(arr[i])) {
      sorted.splice(i, 0, arr[i]);
    }
  }
  console.log(sorted.join(""));
}
