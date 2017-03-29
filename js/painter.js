/**
 * Painter
 */
function Painter() {
	this.netGraph = {};
	this.nodes = new vis.DataSet({});
	this.edges = new vis.DataSet({});
	this.cnt = 0;
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
			atype: {
				shape: 'icon',
				icon: { face: 'FontAwesome', code: '\uf15b', size: 40 }
			},
			cal: {
				shape: 'icon',
				icon: { face: 'FontAwesome', code: '\uf073', size: 40 }
			},
			label: {
				shape: 'icon',
				icon: { face: 'FontAwesome', code: '\uf02b', size: 40 }
			},
			mail: {
				shape: 'icon',
				icon: { face: 'FontAwesome', code: '\uf0e0', size: 40 }
			},
			tel: {
				shape: 'icon',
				icon: { face: 'FontAwesome', code: '\uf095', size: 40 }
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
 * Check if value can be turned into "special" icon shape
 *
 * @param {string} value (rdf object)
 * @param {string} relation (rdf predicate)
 * @return {string}
 */
Painter.prototype.shape = function(val, rel) {
	if (rel === "rdf:type") {
		return "atype";
	}
	if (val.endsWith("dateTime>")) {
		return "cal";
	}
	if (val.startsWith("<tel:")) {
		return "tel";
	}
	if (val.startsWith("<mailto:")){
		return "mail";
	}
	if (val.startsWith('"')) {
		return "label";
	}
}

Painter.prototype.getColor = function(val) {
	var colors = ["blue", "yellow", "chocolate", "green", "red", "darkorange" ];
	return colors[val % 6];
}

/**
 * Add parsed triples to graph
 *
 * @param {array} data
 * @param {object} parser
 */
Painter.prototype.add = function(data, parser) {
	var self = this;
	data.then(function(triples) {
		self.cnt++;

		triples.forEach(function(triple) {
			if (triple.length < 3) {
				return;
			}
			// triple subject,predicate,object
			var s = triple[0];
			var p = triple[1];
			var o = parser.isLiteral(triple[2]) 
						? parser.decode(triple[2]) 
						: triple[2];

			// shorter (prefixed) predicate
			var tp = parser.prefixed(p);

			// shorter (prefixed) object
			var to = (tp === "rdf:type") ? parser.prefixed(o) : o;

			var c = self.getColor(self.cnt);
			var g = self.shape(o, tp);

			self.nodes.update({id: s, color: c, label: s});
			self.nodes.update({id: o, color: c, label: to, group: g});
			self.edges.update({id: s + o, from: s, to: o, color: c, title: tp});
		});
	});
}
