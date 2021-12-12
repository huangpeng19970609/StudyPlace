/* 
  输入：rooms = [[1],[2],[3],[]]
  输出：true
解释：
  我们从 0 号房间开始，拿到钥匙 1。
  之后我们去 1 号房间，拿到钥匙 2。
  然后我们去 2 号房间，拿到钥匙 3。
  最后我们去了 3 号房间。
  由于我们能够进入每个房间，我们返回 true。
*/
/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
 var canVisitAllRooms = function(rooms) {
  let enqueue = [];
  enqueue.push(rooms[0]);
  let colors = {};
  rooms.map( (item, index) => {
    colors[index] = -1;
  });
  let i = 1;
  colors[0] = 1;
  // 每一次的pop都是一次打开房间 打开第一间房间
  while (enqueue.length) {
    let keys = enqueue.shift();
    for (let j = 0; j < keys.length; j++) {
      let index = keys[j];
      if (colors[index] === -1) {
        colors[index] = 1;
        enqueue.push(rooms[index]);
        i++;
      }
    }
  }
  if (i < rooms.length) return false;
  return true;
};
//  [[1,3],[3,0,1],[2],[0]]
console.log(
  canVisitAllRooms([[1,3],[3,0,1],[2],[0]])
);