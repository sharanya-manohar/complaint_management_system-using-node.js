const { Graph } = require('graph-data-structure');  // Adjust import to get the Graph constructor

const locationGraph = new Graph();  // Now use 'new' to instantiate the graph
locationGraph.addNode("Mangalore");
locationGraph.addNode("Lalbagh");
locationGraph.addNode("Surathkal");
locationGraph.addNode("Kankanady");
locationGraph.addEdge("Mangalore", "Lalbagh");
locationGraph.addEdge("Mangalore", "Surathkal");
locationGraph.addEdge("Mangalore", "Kankanady");
locationGraph.addEdge("Lalbagh", "Kankanady");

const findShortestPath = (from, to) => {
    try {
        return locationGraph.shortestPath(from, to);
    } catch (error) {
        return `No path exists between ${from} and ${to}`;
    }
};

module.exports = { locationGraph, findShortestPath };
