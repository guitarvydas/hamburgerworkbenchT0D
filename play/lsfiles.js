var fs = require ('fs');
var files = fs.readdirSync ('/tmp');
console.log (files);
console.log (files.length);

