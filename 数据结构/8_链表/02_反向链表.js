var reverseList = function (head) {
  const stack = [];
  let target = head;
  while (target) {
    stack.push(target);
    target = target.next;
  }
  const len = stack.length;
  let preNode = null;
  while (stack.length) {
    let node = stack.pop();
    if (stack.length === len - 1) {
      head = node;
      preNode = node;
      continue;
    }
    preNode.next = node;
    preNode = node;
  }
  preNode && (preNode.next = null);
  return head;
};

reverseList = function (head) {
  let target = head;
  let preNode = null;
  // 1 -> 2 -> 3 -> null

  // null <- 1 <- 2
  while (target) {
    // 一旦如此便诞生一个问题, 最初的target.next我们无法找寻了 故我们需要temp临时保存它
    // 2
    let temp = target.next;
    // null <- 1
    target.next = preNode;
    // 1
    preNode = target;
    // 2
    target = temp;
  }
  return preNode;
};
let a = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {},
    },
  },
};
console.log(reverseList(a));
