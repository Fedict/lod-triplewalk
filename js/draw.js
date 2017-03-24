var netGraph;

function doGraph(data, container) {
	initGraph(container);
}

function initGraph(container) {
	var options = {
		height: '600px', 
		nodes: {
			shape: 'dot',
			font: { size: 14 }, 
			borderWidth: 2, 
			shadow: true
		},
		edges: {
			width: 3,
			font: { size: 12 }, 
			shadow: true
		},
		interaction: {
			navigationButtons: true,
			keyboard: true
		}
	};
	netGraph = new vis.Network(container);
	netGraph.setOptions(options);
	netGraph.on("doubleClick", function(params) {
	});
}

function drawGraph(nodes, edges) {
	var data = { nodes: nodes, edges: edges };
	netGraph.setData(data);
}
