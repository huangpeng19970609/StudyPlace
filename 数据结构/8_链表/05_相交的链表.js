/* 
给你两个单链表的头节点 headA 和 headB ，
请你找出并返回两个单链表相交的起始节点。
如果两个链表不存在相交节点，返回 null 。


输入：intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
输出：Intersected at '2'
*/

/* 
  1. 无脑 Set
*/
var getIntersectionNode = function (headA, headB) {
  if (!headA || !headB) return null;
  let a = headA,
    b = headB;
  let set = new Set();
  while (a) {
    set.add(a);
    a = a.next;
  }
  while (b) {
    if (set.has(b)) return b;
    set.add(b);
    b = b.next;
  }
  return null;
};

// 2. 先统计两个链表的长度
/* 
  若相等 无脑next
  若不相等, 链表长的先走，直到两个链表长度一样
    A: [1, 2, 3, 4] + c
              👇                👇         
    B: [1, 2, 3, 999, 10000, 6] + c
*/
var getIntersectionNode = function (headA, headB) {
  let aLength = getLen(headA);
  let bLength = getLen(headB);
  let maxList = aLength > bLength ? headA : headB;
  let minList = maxList === headA ? headB : headA;
  let count = 0;
  while (count < Math.abs(aLength - bLength)) {
    maxList = maxList.next;
    count++;
  }
  while (maxList && minList) {
    if (maxList === minList) return maxList;
    maxList = maxList.next;
    minList = minList.next;
  }
  function getLen(head) {
    let len = 1;
    while (head) {
      head = head.next;
      len++;
    }
    return len;
  }
};
// 双指针
/* 
             👇  
     4  1  8  4  5
          👇
  5  0  1  8  4  5
  一个指针 指向 A, 一个指针 指向 B, 长度不同必然会带来交错位置
  但你发现一件事情
    若 A 走完以后 再走 B => A + B
    若 B 走完以后 再走 A => A + B
    指针每次都走一，显然必然会如此
                         👇  
              4  1  8  4  5
                       👇
            5  0  1  8  4  5
            下一步 a -> b
                         A   B
                             👇
            4  1  8  4  5  || 5  0  1  8  4  5

                        B    A
                          👇
            5  0  1  8  4  5 || 4  1  8  4  5

*/
var getIntersectionNode = function (headA, headB) {
  let a = headA;
  let b = headB;
  while (true) {
    if (a === b) return a;
    a = a.next;
    b = b.next;
    if (!a && !b) return null;
    if (!a) a = headA;
    if (!b) b = headB;
  }
};
