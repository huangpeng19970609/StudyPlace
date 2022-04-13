/* 
  三个空汽水瓶可以换一瓶汽水，允许向老板借空汽水瓶（但是必须要归还）。
  例如:用九个空瓶换三瓶汽水，剩四个空瓶再用三个空瓶换一瓶汽水，
       剩两个空瓶，
       向老板借一个空瓶再用三个空瓶换一瓶汽水喝完得一个空瓶还给老板
  即: 10瓶你可以换5瓶汽水
*/
// 空瓶子
let bottomCount = 9;
let num = 0;
while (bottomCount >= 3) {
  const value = Math.floor(bottomCount / 3);
  num += value;
  bottomCount = (bottomCount % 3) + value;
}
if (bottomCount === 2) num++;
