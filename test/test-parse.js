var parse = require('../bin/parse').parse;
var path = require('path');
var file = path.resolve(__dirname,'a.xls');

parse(file).then(data=>{
	console.log(data)
})