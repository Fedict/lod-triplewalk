function getTriples(url, drawfunc) {
	var req = new Request(url, {
		method: 'GET',
		redirect: 'follow',
		headers: new Headers({ 'Accept': 'application/n-triples'})
	});
	
	fetch(req)
		.then(resp => resp.text())
		.then(function(resp) {
			var data = parseTriples(resp);
			drawfunc(data[0], data[1]);
		});
}

function parseTriple(triple) {
	var sPos = triple.indexOf(" ");
	if (sPos < 0) {
		return [];
	}
	var pPos = triple.indexOf(" ", sPos + 1);
	if (pPos < 0) {
		return [];
	}
	var oPos = triple.indexOf(" ", pPos + 1);
	if (oPos < 0) {
		return [];
	}
	return [ triple.substring(0, sPos),
			triple.substring(sPos + 1, pPos),
			triple.substring(pPos + 1) ];
}

function parseTriples(txt) {
	var nodes = new vis.DataSet({});
	var edges = new vis.DataSet({});

	var lines = String(txt).split('\n');
	for (var i = 0; i < lines.length; i++) {
		var triple = parseTriple(lines[i]);
		if (triple.length < 3) {
			continue;
		}
		var shape = (triple[2].substring(0, 1) === '"') ? "box" : "dot";
		nodes.update({id: triple[0], label: triple[0]});
		nodes.update({id: triple[2], label: triple[2], shape: shape});
		edges.add({from: triple[0], to: triple[2], label: triple[1]});
	}
	return [ nodes, edges ];
} 
