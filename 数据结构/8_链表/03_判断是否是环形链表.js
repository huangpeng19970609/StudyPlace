// 空间复杂度为N 时间复杂度也是N
var hasCycle = function (head) {
  let target = head;
  let set = new Set();
  while (target) {
    if (set.has(target)) {
      return true;
    }
    set.add(target);
    target = target.next;
  }
  return false;
};

// 使用快慢指针
var hasCycle = function (head) {
  let fast = head;
  let slow = head;
  while (fast && slow) {
    slow = slow.next;
    fast = fast.next ? fast.next.next : -1;
    if (fast === slow) return true;
  }
  return false;
};
