// 给你一个单链表的头节点 head ，
// 请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。
/* 
  输入：head = [1,2,2,1]
  输出：true
*/

// 空间 On 时间 On
var isPalindrome = function (head) {
  if (!head) return null;
  let temp = head;
  let stack = new Array();
  let len = 0;
  while (temp) {
    stack.push(temp.val);
    temp = temp.next;
    len++;
  }
  len = len / 2;
  while (len-- > 0) {
    if (head.val !== stack.pop()) {
      return false;
    }
    head = head.next;
  }
  return true;
};
