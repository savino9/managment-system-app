module.exports = {
	readFiles: (filename, callbackFunction) => {
		const fs = require("fs");
		fs.readFile(filename,'utf-8' ,(err, data) => {	
		 	if(err) throw err;
		 	const contents = JSON.parse(data);
		 	callbackFunction(contents);
		});
	}
};