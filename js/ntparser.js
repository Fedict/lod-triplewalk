/**
 * RDF N-triples parser
 */
function NtParser() {
	this.NS = {
		dcterms	: "http://purl.org/dc/terms/",
		dcat	: "http://www.w3.org/ns/dcat#",
		foaf	: "http://xmlns.com/foaf/0.1/",
		org		: "http://www.w3.org/ns/org#",
		owl		: "http://www.w3.org/2002/07/owl#",
		rdf		: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
		rdfs	: "http://www.w3.org/2000/01/rdf-schema#",
		rov		: "http://www.w3.org/ns/regorg#",
		skos	: "http://www.w3.org/2004/02/skos/core#",
		vcard	: "http://www.w3.org/2006/vcard/ns#",
		xsd		: "http://w3.org/2001/XMLSchema#"
	}
}

/**
 * Get a list of prefixes and namespaces
 *
 * @return {array}
 */
NtParser.prototype.getNS = function() {
	return this.NS;
}

/**
 * Decode string containing encoded \u to e.g. accented characters.
 *
 * @param {string} string containing \u
 * @return {string}
 */
NtParser.prototype.decode = function(str) {
	return str.replace(/\\u([\d\w]{4})/g, function(match, code) {
		return String.fromCharCode(parseInt(code, 16));
	});
}

/**
 * Replace uri by a shorter (prefixed) version.
 *
 * @param {string} uri
 * @return {string}
 */
NtParser.prototype.prefixed = function(uri) {
	if (uri.substring(0,5) !== "<http") {
		return uri;
	}
	var s = uri.substring(1, uri.length-1);
	var NS = this.getNS();
	for(var prefix in NS) {
		if(s.startsWith(NS[prefix])) {
			return prefix + ":" + s.substring(NS[prefix].length);
		}
	}
	return uri;
}

/**
 * Parse a line containing a triple into an array.
 *
 * @param {string} triple
 * @return {array}
 */
NtParser.prototype.parseTriple = function(triple) {
	var match = /^([^ ]+) ([^ ]+) (.+) \.$/.exec(triple);
	return (match != null) ? match.slice(1) : [];
}

/**
 * Return true if a value is an RDF literal
 *
 * @param {string} value
 * @return {bool}
 */
NtParser.prototype.isLiteral = function(value) {
	return (value.substring(0,1) === '"');
}

/**
 * Split an RDF literal into its text value and language or type part
 *
 * @param {string} literal
 * @return {array}
 */
NtParser.prototype.splitLiteral = function(literal) {
	var match = /^"(.*)"@(\w+)$/.exec(literal);
	if (match != null) {
		return match;
	}

	var match = /^"(.*)"^^(.+)$/.exec(literal);
	if (match != null) {
		return match;
	}
	// no type nor language label attached
	return /^"(.*)"$/.exec(literal);
}


/**
 * Parse N-Triples text to an array of triples
 *
 * @param {string} txt
 * @return {array}
 */
NtParser.prototype.parseTriples = function(txt) {
	var triples = [];
	var lines = txt.split('\n');

	for (var i = 0; i < lines.length; i++) {
		var triple = this.parseTriple(lines[i]);
		if (triple.length >= 3) {
			triples.push(triple);
		}
	}
	return triples;
}

