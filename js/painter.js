/**
 * Painter
 */
function Painter() {
	this.netGraph = {};
	this.nodes = new vis.DataSet({});
	this.edges = new vis.DataSet({});
}

Painter.prototype.getGraph = function() {
	return this.netGraph;
}

/**
 * Initialize graphics
 *
 * @param {object} container
 */
Painter.prototype.init = function(container) {
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
	this.netGraph = new vis.Network(container);
	this.netGraph.setOptions(options);
	this.netGraph.setData({nodes: this.nodes, edges: this.edges});
}

/**
 * Add parsed triples to graph
 *
 * @param {array} data
 * @param {object} parser
 */
Painter.prototype.add = function(data, parser) {
	var s = this;
	data.then(function(triples) {
		triples.forEach(function(t) {
			if (t.length < 3) {
				return;
			}
			s.nodes.update({id: t[0], label: t[0]});
			s.nodes.update({id: t[2], label: t[2], shape: "dot"});
			s.edges.add({from: t[0], to: t[2], title: parser.prefixed(t[1])});
		});
	});
}
