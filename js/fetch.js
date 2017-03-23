var NS = {};
NS['dcterms'] = "http://purl.org/dc/terms/";
NS['dcat'] = "http://www.w3.org/ns/dcat#";
NS['org'] = "http://www.w3.org/ns/org#";
NS['owl'] = "http://www.w3.org/2002/07/owl#";
NS['rdf'] = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
NS['rdfs'] = "http://www.w3.org/2000/01/rdf-schema#";
NS['rov'] = "http://www.w3.org/ns/regorg#";
NS['skos'] = "http://www.w3.org/2004/02/skos/core#";


function toNS(uri) {
	if (uri.substring(0,5) !== "<http") {
		return uri;
	}
	var s = uri.substring(1, uri.length-1);
	for(var prefix in NS) {
		if(s.startsWith(NS[prefix])) {
			return prefix + ":" + s.substring(NS[prefix].length);
		}
	}
	return uri;
}

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
		edges.add({from: triple[0], to: triple[2], title: toNS(triple[1])});
	}
	return [ nodes, edges ];
} 
