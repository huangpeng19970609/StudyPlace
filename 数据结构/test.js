/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var oddEvenList = function (head) {
  //  i  j  i  j
  // [1, 2, 3, 4, 5]
  //  1 -> 3 -> 5
  //  2 -> 4
  if (!head) return head;
  let i = head;
  let j = head.next;
  let odd = j;
  while (i.next && j.next) {
    i = i.next = i.next.next;
    j = j.next = j.next.next;
  }
  i.next = odd;
  console.log(head);
  return head;
};
let o = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5,
          next: {
            val: 6,
            next: {
              val: 7,
              next: {
                val: 8,
                next: null,
              },
            },
          },
        },
      },
    },
  },
};
oddEvenList(o);
