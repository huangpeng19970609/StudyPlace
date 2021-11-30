/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-11-23 23:45:12
 */
/* 
  要求: 使用递归实现二叉树的中序遍历极其简单
        请试试使用迭代算法去实现它 => 说人话就是循环
  解释: 递归的时候我们隐形的模拟了一个栈。
        现在我们将其显示出来不就可以了嘛
*/

var inorderTraversal = function (root) {
  if (!root) return [];
  const res = []; // 存储的值
  const stack = []; // 栈
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stk.pop();
    res.push(root.val);
    root = root.right;
  }

};
