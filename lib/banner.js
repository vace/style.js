var fs = require('fs')
var banner = '/*! The MIT License (MIT) https://github.com/vace/style.js */ \n'

var write = file => {
	fs.readFile(file, 'utf-8', function(err,text){
		fs.writeFile(file, banner + text, 'utf-8');
		console.log('write success',file)
	});
}
;['index.js','index.min.js'].forEach(write)



