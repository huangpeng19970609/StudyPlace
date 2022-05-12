/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-11-21 15:22:28
 */
// 使用链表实现图
import { Dictionary } from './Dictionary';
import { Queue } from './Queue.js';
import { Stack } from './Stack';
const COLORS = {
  white: 0, //白色: 未被访问过
  grey: 1,  //灰色: 被访问过，但未被探索
  black: 2, //黑色: 已被访问，且被探索
}
class Graph {
  constructor() {
    this.vertices = []; // 顶点存储点.每次有新顶点我们应该记录下他们
    // adjList => AdjacencyList 邻接表, 我们使用邻接表模拟图结构
    this.adjList = new Dictionary(); // 建议用Map同等含义
  }
  addVertex(v) {
    if (this.vertices.includes(v)) {
      return false;
    }
    this.vertices.push(v);
    // ⭐ 链表存储图的逻辑结构
    this.adjList.set(v, []);
  }
  addEdge(v, w) {
    if (this.adjList.has(v)) {
      this.adjList.get(v).push(w)
      return true;
    }
    return false;
  }
  toString() {
    let s = '';
    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} =>`;
      const neighbors = this.adjList.get(this.vertices[i]);
      for (let j = 0; j < neighbors.length; j++) {
        s += neighbors[j];
      }
      s += '\n'
    }
    return s
  }
  getVertices() { return this.vertices }
  getAdjList() { return this.adjList }
}
// 初始化顶点颜色
function initializeColor(vertices) {
  const colors = {};
  for (let i = 0; i < vertices.length; i++) {
    colors[vertices[i]] = COLORS.white;
  }
  return colors;
}
/**
 * disantces: v 距离 startV的距离
 * predecessors: v 前溯的点
 */
function breadFirstSearch(graph, startVertex) {
  // 图的顶点集合
  const vertices = graph.getVertices();
  // 图的邻接表
  const adjList = graph.getAdjList();
  // 队列
  const Q = new Queue();
  // 初始化颜色标识符
  const colors = initializeColor(vertices);

  const distance = {};
  const predecessors = {};
  vertices.forEach(v => {
    distance[v] = 0;
    predecessors[v] = null;
  });

  Q.enqueue(startVertex);
  while (!Q.isEmpty()) {
    const u = Q.dequeue();
    const neighbors = adjList.get(u);
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i];
      if (colors[w] === COLORS.white) {
        Q.enqueue(w);
        colors[w] = COLORS.grey;
        distance[w] = distance[u] + 1;
        predecessors[w] = u;
      }
    }
    colors[u] = COLORS.black;
  }
  return {
    distance,
    predecessors
  }
}

// 根据BFS获取所有路径
function getAllRouteByBFS(vertices, predecessors) {
  const fromVertex = vertices[0];
  for (let i = 0; i < vertices.length; i++) {
    let toVertex = vertices[i];
    const path = new Stack();
    path.push(toVertex);
    while (toVertex && toVertex !== fromVertex) {
      toVertex = predecessors[toVertex]
      path.push(toVertex);
    }
    let v = path.pop();
    let str = v;
    while (v = path.pop()) {
      str += '-' + v;
    }
    console.log(str);
  }


}

// 深度优先算法
function depthFirstSearch(graph, callback) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const colors = initializeColor(vertices);
  for (let i = 0; i < vertices.length; i++) {
    const u = vertices[i];
    if (colors[u] === COLORS.white) {
      depthFirstSearchVisit(u, colors, adjList, callback)
    }
  }
}

function depthFirstSearchVisit(u, colors, adjList, callback) {
  colors[u] = COLORS.grey;
  if (callback) callback(u);
  const neighbors = adjList.get(u);
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if (colors[w] === COLORS.white) {
      depthFirstSearchVisit(w, colors, adjList, callback);
    }
  }
  colors[u] = COLORS.black;
}


export {
  Graph,
  breadFirstSearch as BFS,
  getAllRouteByBFS,
  depthFirstSearch as DFS
}