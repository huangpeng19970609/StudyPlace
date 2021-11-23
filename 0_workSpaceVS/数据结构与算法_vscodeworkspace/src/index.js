class Graph {
  constructor() {
    this.vertices = [];
    this.adjList = new Map(); // 邻接表
  }
  addVertex(v) {
    if (this.vertices.includes(v)) return false;
    this.vertices.push(v);
    this.adjList.set([]);
  }
  addEdge(v, w) {
    this.adjList.get(v).push(w);
  }
  getVertices() { return this.vertices }
  getAdjList() { return this.adjList }
}
