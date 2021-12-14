let isValid = (function (s) {
  let arr = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
  let o = {};
  arr.map(item => o[item] = true);
  return function (s) {
    if (o.hasOwnProperty(s)) return true;
    else return false;
  }
})();
var reverseVowels = function (s) {
  let i = 0;
  let j = s.length - 1;
  s = s.split('')
  while (i < j) {
    if (!isValid(s[i])) {
      i++;
      continue;
    }
    if (!isValid(s[j])) {
      j--;
      continue;
    }

    [s[i], s[j]] = [s[j], s[i]];
    i++;
    j--;
  }
  return s.join('');
};
console.log(
  reverseVowels('hello')
);