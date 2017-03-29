# lod-triplewalk

Visualize RDF as graph-like structures in a browser.

The visualization is done using the [Vis.js](http://visjs.org/) javascript library, icons are part of [Font Awesome](http://fontawesome.io/).

## Limitations

* Only tested on Chrome 57 (Linux, Windows 10) and IE 11 (Windows 10) 
* Currently only N-Triples can be parsed
* Since everything is done on the client-side (browser), including fetching triples in the background, the sites containing the triples most support CORS (`Access-Control-Allow-Origin: *`)

## Demo page

[Demo site](http://dev.rovin.be/walk)
