function Fetcher() {
	this.parser = new NtParser();
}

Fetcher.prototype.getParser = function() {
	return this.parser;
}

/**
 * Get N-Triples from another website using a HTTP get in the background.
 *
 * @param {string} url
 */
Fetcher.prototype.getTriples = function(url) {
	var req = new Request(url, {
		method: 'GET',
		redirect: 'follow',
		headers: new Headers({ 'Accept': 'application/n-triples'})
	});
	
	return fetch(req).then(resp => resp.text())
					.then(txt => this.parser.parseTriples(txt));
}
