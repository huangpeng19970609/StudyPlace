/* 
  给你无向 连通 图中一个节点的引用，请你返回该图的 深拷贝（克隆）。
  图中的每个节点都包含它的值 val（int） 和其邻居的列表（list[Node]）

  根据一个节点便可以拷贝所有, 因为这个节点和他处必定连接。
  因此延展便可以拷贝这树
*/
function Node(val, neighbors) {
  this.val = val === undefined ? 0 : val;
  this.neighbors = neighbors === undefined ? [] : neighbors;
}
var cloneGraph = function (node) {
  return clone(node);
};
function clone(node) {
  if (!node) return;
  let newNode = new Node(node.val);
  // 做缓存
  node.cloneNode = newNode;
  // 存在邻接 => 克隆邻接
  if (node.neighbors) {
    let neighbors = [];
    for (let i = 0; i < node.neighbors.length; i++) {
      // 若克隆节点存在即放置克隆节点 不需要再进行额外的cloneNode
      neighbors.push(node.neighbors[i].cloneNode || clone(node.neighbors[i]));
    }
    newNode.neighbors = neighbors;
  }
  return newNode;
}
