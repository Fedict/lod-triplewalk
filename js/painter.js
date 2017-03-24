/**
 * Painter
 */
function Painter() {
	this.netGraph = {};
	this.nodes = new vis.DataSet({});
	this.edges = new vis.DataSet({});
	this.group = 0;
}


/**
 * Get VisJS graph
 *
 * @return {object}
 */
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
		groups: {
			lang: {
				shape: 'icon',
				icon: {
					face: 'FontAweSome',
					code: '\uf024',
					size: 50
				}
			}
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
		var g = ++(s.group);

		triples.forEach(function(t) {
			if (t.length < 3) {
				return;
			}
			
			s.nodes.update({id: t[0], label: t[0], group: g});
			s.nodes.update({id: t[2], label: t[2], group: g});
			s.edges.update({from: t[0], to: t[2], 
										title: parser.prefixed(t[1])});
		});
	});
}
