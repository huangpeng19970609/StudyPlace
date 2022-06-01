function resolveNumber(num) {
  if ( num >= 0) return Math.floor(num);
  else return Math.ceil(num);
}
var evalRPN = function (tokens) {
  let signal = {
    "+": (a, b) => (a) + b,
    "-": (a, b) => (a) - b,
    "*": (a, b) => (a) * b,
    "/": (a, b) => resolveNumber((a) / b),
  }
  let stack = [];
  let token;
  let val = null;
  for (let i = 0; i < tokens.length; i++) {
    token = tokens[i];
    if (!signal[token]) {
      stack.push(Number(token));
    } else {
      let popVal1 = stack.pop(); // 会是总值
      let popVal2 = stack.pop();
      stack.push(val = signal[token](popVal2, popVal1));
    }
  }
  if (Object.prototype.toString.call(val) === '[object Null]') {
    return stack[0];
  }
  return val;
};