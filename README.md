# lod-triplewalk

Visualize RDF as graph-like structures in a browser.

The visualization is done using the [Vis.js](http://visjs.org/) javascript library.

## Limitations

* A modern browser supporting the javascript Fetch API is required.
* Currently only N-Triples can be parsed
* Since everything is done on the client-side (browser), including fetching triples in the background, the sites containing the triples  most support CORS (`Access-Control-Allow-Origin: *`)
