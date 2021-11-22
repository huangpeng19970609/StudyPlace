/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-11-19 16:38:14
 */

// 标记顶点状态
import { Queue } from "./lib/Queue";
class Graph {
  constructor() {
    this.vertices = [];
    this.adjList = new Map();
  }
  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
      return v;
    }
    return false;
  }
  addEdge(v, w) {
    if (!this.vertices.includes(v)) {
      this.addVertex(v);
    }
    if (!this.vertices.includes(w)) {
      this.addVertex(w);
    }
    this.adjList.get(v).push(w);
  }
  getVertices() {
    return this.vertices;
  }
}

const color = {
  white: 0,
  grey: 1,
  black: 2,
}
function initColors(vertices) {
  let colors = {};
  vertices.forEach(item => {
    colors[item] = color.white;
  });
  return colors;
}
function BFS(graph) {
  let vertices = graph.getVertices();
  let adjList = graph.adjList;
  console.log(adjList);
  let distance = {};
  let predecessors = {};
  let Q = new Queue();

  vertices.map(v => {
    distance[v] = 0;
    predecessors[v] = null;
  })
  let colors = initColors(vertices);
  Q.enqueue(vertices[0]);
  while (!Q.isEmpty()) {
    const u = Q.dequeue();
    const neighbor = adjList.get(u);
    console.log(neighbor);
    for (let i = 0; i < neighbor.length; i++) {
      let v = neighbor[i];
      if (colors[v] === color.white) {
        Q.enqueue(v);
        colors[v] = color.grey;
        distance[v] = distance[u] + 1;
        predecessors[v] = u;
      }
    }
    colors[u] = color.black;
  }
  return {
    distance,
    predecessors
  }
}




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


let bfs = BFS(graph, graph.getVertices()[0])
console.log(bfs);
