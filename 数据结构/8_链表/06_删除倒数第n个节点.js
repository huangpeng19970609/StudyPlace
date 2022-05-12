/**
 * 给你一个链表，删除链表的⭐倒数⭐  第 n 个结点，并且返回链表的头结点。
 * 输入：head = [1,2,3,4,5], n = 2
   输出：[1,2,3,5]
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let i = 0;
  let preNode = head;
  let len = 0;
  let target = head;
  while (target) {
    target = target.next;
    len++;
  }
  // 由于是 获取前面的节点 故应减少一次next
  i = 1;
  if (len - n === 0) {
    head = head.next || null;
    return head;
  }
  while (i < len - n && preNode) {
    preNode = preNode.next;
    i++;
  }
  if (preNode && preNode.next) {
    preNode.next = preNode.next.next || null;
  }
  return head;
};

// 使用双指针 => 不计算链表的长度
// 1 2 3 4 5
/* 
        👇   
   1  2  3  4  5
  👇
   1  2  3  4  5

              👇   
   1  2  3  4  5 null
        👇
   1  2  3  4  5 null

*/
var removeNthFromEnd = function (head, n) {
  let fast = head;
  let slow = head;
  while (n-- > 0) {
    fast = fast.next;
  }
  // 若fast不存在 => [1, 2] 删除 倒数第二
  if (!fast) {
    head = head.next;
    return head;
  }
  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return head;
};
