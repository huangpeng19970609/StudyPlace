/* 
  计算字符串最后一个单词的长度，
  单词以空格隔开，字符串长度小于5000。
  （注：字符串末尾不以空格为结尾）

    输入：
      ABCabc
      A
    输出：
    2
*/

const params = readline();
const arr = params.split(' ');
print(arr[arr.length - 1].length);