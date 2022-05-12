/* 
https://www.nowcoder.com/practice/03ba8aeeef73400ca7a37a5f3370fe68?tpId=37&tags=&title=&difficulty=0&judgeStatus=0&rp=1&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D37%26type%3D37
输入：
  6 cab ad abcd cba abc bca abc 1
  复制
  输出：
  3
  bca
  复制
  说明：
  abc的兄弟单词有cab cba bca，所以输出3
  经字典序排列后，变为bca cab cba，所以第1个字典序兄弟单词为bca 
*/

const str = readline().split(" ");
const dictNum = str.shift();
const k = str.pop();
const target = str.pop();
const sortedTarget = target.split("").sort("").join("");
let filterStr = str
  .map((item) => {
    const b = item.split("").sort().join("");
    if (sortedTarget === b) return item;
  })
  .filter((item) => item && item !== target);
console.log(filterStr.length);
if (filterStr[k - 1]) {
  console.log(filterStr.sort()[k - 1]);
}
