module.exports = {
	serverConf: () => {
		const express = require('express');
		const path = require('path');
		const ejs = require('ejs');
		const bodyParser = require('body-parser');
		const fs = require('fs');

		// start express
		const app = express();

		app.use(express.static('./public'));

		// set the view engine to ejs
		app.set('views', './views/pages');
		app.set('view engine', 'ejs');

		// body parser
		app.use(bodyParser.urlencoded({extended: true}));

		// use res.render to load up an ejs view file
		app.get('/', (req, res) => { 
			res.render('index'); 
		});

		// render the usr page 
		app.get('/users', (req, res) => { 
			fs.readFile('./users.json', 'utf-8', (err, data) => {
				const content = JSON.parse(data);
				res.render('users', {
					users: content
				});
			});  
		});

		// post request for users
		app.post('/users', (req, res) => {
			let request = req.body;
			let input = request.name;
			fs.readFile('users.json', 'utf-8', (err,data) => {
				let content = JSON.parse(data);
				// console.log(content.length);
				let usersIn = {};
				for (var i = 0; i < content.length; i++) {
					let firstname = content[i].firstname.toLowerCase();
					// console.log(firstname);
					if(firstname.includes(input)){
						usersIn[i] = firstname;
					}
				}
				res.send(usersIn);
			});	
		});

		// render the form page
		app.get('/search', (req, res) => { 
			res.render('search' ); 
		});

		// post request for search
		app.post('/search' , (req, res) => {
			let obj = req.body;
			let prop1 = obj.firstname;
			let prop2 = obj.lastname;
			let usrFinded = [];
			fs.readFile('./users.json', 'utf-8', (err, data) => {
				const content = JSON.parse(data);
				for (var i = 0; i < content.length; i++) {
					let firstname = content[i].firstname.toLowerCase();
					let lastname = content[i].lastname.toLowerCase();
					if (prop1 == firstname || prop1 == lastname) {
						console.log(`yeeah ${prop1}, you're in the server!`);
						usrFinded.push(content[i].firstname, content[i].lastname, content[i].email);
						console.log(`new array with results: ${usrFinded}`);
					} 
				}
				res.render('results' , {
					usrFinded: usrFinded	
				});
			})
		});
		
		// render the usr add page
		app.get('/usrAdd', (req, res) => { 
			res.render('usrAdd' ); 
		});

		// post request for adding user
		app.post('/usrAdd', (req, res) => {
			let obj = req.body;
			let firstname = obj.firstname;
			let lastname = obj.lastname;
			let email = obj.Email;///

			fs.readFile('./users.json', 'utf-8', (err, data) => {
				const content = JSON.parse(data);
				content.push({"firstname": firstname, "lastname": lastname, "email": email});
				//convert it back to json
				let json = JSON.stringify(content); 

			  fs.writeFile('./users.json', json, (err) => {
				  if (err) throw err;
				  console.log('The file has been saved, new User added!');
				  // redirect to the all page users
					res.redirect('/users');
				});
			});

		});

		// start the server
		app.listen(3000, () => console.log(`server listening on port 3000`))
	}
};