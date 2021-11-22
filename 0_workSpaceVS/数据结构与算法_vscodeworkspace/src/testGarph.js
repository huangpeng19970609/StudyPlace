/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-11-22 09:13:28
 */

// 标记顶点状态

import { Graph, BFS, getAllRouteByBFS, DFS } from './lib/Graph.js';

let graph = new Graph();
let vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
let edge = [
  ['A', 'B'],
  ['A', 'C'],
  ['A', 'D'],
  ['C', 'D'],
  ['C', 'G'],
  ['D', 'G'],
  ['D', 'H'],
  ['B', 'E'],
  ['B', 'F'],
  ['E', 'I'],
]
vertices.map(item => graph.addVertex(item));
edge.map(item => {
  graph.addEdge(item[0], item[1]);
});

console.log(graph);
console.log(graph.toString());

let bfs = BFS(graph, graph.getVertices()[0])
console.log(bfs);
getAllRouteByBFS(
  graph.getVertices(),
  bfs.predecessors
)

DFS(
  graph,
  (value) => { console.log(value) }
)