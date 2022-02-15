var removeElements = function (head, val) {
  if (!head) return head;
  let target = head;
  let preNode = null;
  // 跳过 前为val的情况, 并确定头指针
  while (target && target.val === val) {
    target = target.next;
  }
  let _head = target;
  preNode = target;
  // 2 1 1 1 3
  while (target) {
    if (target.val === val) {
      target = target.next;
      continue;
    }
    if (preNode !== target) {
      preNode.next = target;
      preNode = preNode.next;
    }
    target = target.next;
  }
  // [1, 1, 1, 1] 的情况
  preNode && (preNode.next = null);
  return _head;
};
