/* 
输入：head = [3,2,0,-4], pos = 1
输出：返回索引为 1 的链表节点
解释：链表中有一个环，其尾部连接到第二个节点。


1. 若你不想用数学方法算出来 建议 hashMap解题 最简单啦！
*/
var detectCycle = function (head) {
  let fast = head;
  let slow = head;
  let flag = false;
  while (fast && slow) {
    fast = fast.next ? fast.next.next : -1;
    slow = slow.next;
    if (fast === slow) {
      flag = true;
      break;
    }
  }
  if (!flag) return null;
  // 有环则将 fast 移动至 head 并移动S2距离
  // 这是数学题目
  fast = head;
  while (fast !== slow) {
    slow = slow.next;
    fast = fast.next;
  }
  return fast;
};
