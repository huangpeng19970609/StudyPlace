const str = readline();
const s = readline();
const reg = new RegExp(s, "gi");
const result = str.match(reg);
console.log(result ? result.length : 0);
