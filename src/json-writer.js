module.exports = {
	writeFiles: (contents, newUsr, filePath) => {	
		const fs = require('fs');
		contents.push({fistname:newUsr});
		let json = JSON.stringify(contents); //convert it back to json
	  fs.writeFile(filePath, json, (err) => {
		  if (err) throw err;
		  return console.log('The file has been saved, new User added!');
		});
	}
}






