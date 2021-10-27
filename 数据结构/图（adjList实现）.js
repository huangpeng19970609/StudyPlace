class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected;
    this.vertices = [];
    // adjList 邻接表
    this.adjList = new Map();
  }
  addVertex(v) {
    if (this.vertices.includes(v)) return false;
    this.vertices.push(v);
    this.adjList.set(v, []);
  }
  addEdge(v, w) {
    if (!this.vertices.includes(v)) {
      this.addVertex(v);
    }
    if (!this.vertices.includes(w)) {
      this.addVertex(w);
    }
    this.adjList.get(v).push(w);
    if (!this.isDirected) {
      this.adjList.get(w).push(v)
    }
  }
  toString() {
    let str = '';
    this.adjList.forEach( (value, key) => {
      str += key + '->' + value.join(' ') + '\n'
    })
    return str;
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
console.log(graph);
console.log(graph.toString());