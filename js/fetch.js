/**
 * Get N-Triples from another website using a HTTP get in the background.
 *
 * @param {string} url
 * @param {func} drawfunc
 */
function getTriples(url, drawfunc) {
	var req = new Request(url, {
		method: 'GET',
		redirect: 'follow',
		headers: new Headers({ 'Accept': 'application/n-triples'})
	});

	var parser = new NtParser();
	
	fetch(req)
		.then(resp => resp.text())
		.then(function(resp) {
			var triples = parser.parseTriples(String(resp));
			var nodes = new vis.DataSet({});
			var edges = new vis.DataSet({});

			triples.forEach(function(t) {
				if (t.length < 3) {
					return;
				}
				nodes.update({id: t[0], label: t[0]});
				nodes.update({id: t[2], label: t[2], shape: "dot"});
				edges.add({from: t[0], to: t[2], title: parser.prefixed(t[1])});
			});
			drawfunc(nodes, edges);
		});
}
