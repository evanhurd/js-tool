let tool = require('./index');
let fs = require('fs');
let data = fs.readFileSync('./dist/bundle.js', 'utf-8').toString();
console.log(tool(data));
