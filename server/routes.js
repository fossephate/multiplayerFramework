var AM = require('./account-manager');
var EM = require('./email-dispatcher');

module.exports = function(app) {
	// main signIn page //

	/*app.get('/', function(req, res){
		res.render('/index.html');
	});*/

// 	app.get('/', function(req, res) {
// 		// check if the user's credentials are saved in a cookie //
// 		if (req.cookies.user == undefined || req.cookies.pass == undefined) {
// 			res.render('signIn', {
// 				title: 'Hello - Please SignIn To Your Account'
// 			});
// 		} else {
// 			// attempt automatic signIn //
// 			AM.autoSignIn(req.cookies.user, req.cookies.pass, function(o) {
// 				if (o != null) {
// 					req.session.user = o;
// 					res.redirect('/home');
// 				} else {
// 					res.render('signIn', {
// 						title: 'Hello - Please SignIn To Your Account'
// 					});
// 				}
// 			});
// 		}
// 	});

	app.post('/autoSignIn', function(req, res) {
		if (req.session.user != null) {
			AM.getAccountByUser(req.session.user.username, function(tempAccount) {
				if (tempAccount) {
					//console.log(tempAccount);
					res.status(200).json(tempAccount);
				}
			});
		}
	});

	//LOGIN POST
// 	app.post('/', function(req, res) {
// 		var errors = [];
// 		AM.validateSignInData(req.body, errors);
// 		if (errors.length > 0) {
// 			res.status(400).send(errors);
// 		} else {
// 			AM.manualSignIn(req.body.user, req.body.pass, function(e, o) {
// 				if (!o) {
// 					res.status(400).send(e);
// 				} else {
// 					req.session.user = o;
// 					// FIX THIS
// 					//if (req.body['rememberMe'] == 'true') {// FIX THIS
// 					res.cookie('user', o.user, {
// 						path: '/',
// 						maxAge: 900000
// 					});
// 					res.cookie('pass', o.pass, {
// 						path: '/',
// 						maxAge: 900000
// 					});
// 					/*if(o.usernames) {
// 						res.cookie('usernames', o.usernames, {
// 							path: '/',
// 							maxAge: 900000
// 						});
// 					}
// 					if(o.nodes) {
// 						res.cookie('nodes', o.nodes, {
// 							path: '/',
// 							maxAge: 900000
// 						});
// 					}*/
// 					//}// FIX THIS
// 					res.status(200).json('ok');
// 				}
// 			});
// 		}
// 	});

	// CREATE CHARACTER
	app.post('/createCharacter', function(req, res) {
		if (typeof req.session.user == "undefined") {
			res.status(400).send('error');
			return;
		}

		AM.getAccountByUser(req.session.user.user, function(o) {
			if (o) {
				var nodes = {};
				var usernames = [];
				if (typeof o.nodes != "undefined") {
					for (var i in o.nodes) {
						nodes[i] = o.nodes[i];
					}
				}
				if (typeof o.usernames != "undefined") {
					for (var i = 0; i < o.usernames.length; i++) {
						usernames.push(o.usernames[i]);
					}
				}

				var newNode = {
					username: req.body.name,
					class: req.body.class,
					level: 0,
					experience: 0,
					health: 100,
					score: 0,
				};
				//o.nodes[req.body.name] = newNode;
				//var o2nodes = o.nodes;
				//newNodes[newNode.username] = newNode;



				nodes[req.body.name] = newNode;
				usernames.push(req.body.name);
				//console.log(nodes);

				var data = {
					user: o.user,
					nodes: nodes,
					usernames: usernames,
				};

				AM.addData(data, function(e, o) {
					if (e) {
						res.status(400).json('error');
					} else if(o) {
						//req.session.user = o;
						// update the user's signIn cookies if they exists //
						/*if (req.cookies.user != undefined && req.cookies.pass != undefined) {
							res.cookie('user', o.user, {
								maxAge: 900000
							});
							res.cookie('pass', o.pass, {
								maxAge: 900000
							});
						}*/
						//console.log(o);
						res.status(200).json('ok');
					}
				});
				//console.log(o);
				//res.status(200).send(o);
			} else {
				res.status(400).json('error');
			}
		});
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	app.post('/getCharacters', function(req, res) {
		if (typeof req.session.user == "undefined") {
			res.status(400).json('error');
			return;
		}
		AM.getAccountByUser(req.session.user.user, function(o) {
			if (o) {
				//console.log(o);
				res.status(200).json(o.nodes);
			} else {
				res.status(400).json('error');
			}
		});
		
		//res.status(200).send('ok');
		//res.status(200).json('test');
	});
	
	
	
	

	app.post('/signOut', function(req, res) {
		res.clearCookie('username');
		res.clearCookie('password');
		req.session.destroy(function(e) {
			res.status(200).send('ok');
		});
	});
	
	
	
	
	
	app.post('/signUp', function(req, res) {
		AM.addNewAccount(req.body, function(errors, newAccount) {
			if(errors) {
				res.status(400).send(errors);
			} else {
				res.status(200).send('ok');
			}
		});
	});
	
	
	app.post('/signIn', function(req, res) {
		var errors = [];
		AM.validateSignInData(req.body, errors);
		
		if (errors.length > 0) {
			res.status(400).send(errors);
		} else {
			AM.manualSignIn(req.body.username, req.body.password, function(err, tempAccount) {
				if (!tempAccount) {
					res.status(400).send(err);
				} else {
					//req.session.username = tempAccount;
					
					//if (req.body['rememberMe'] == 'true') {
						res.cookie('username', tempAccount.username, {
							path: '/',
							maxAge: 900000
						});
						res.cookie('password', tempAccount.password, {
							path: '/',
							maxAge: 900000
						});
					//}
					res.status(200).json('ok');
				}
			});
		}
	});
	
	
	
	
	
	
	
	
	
	



	/*app.post('/create-character', function(req, res) {
		var errors = [];
		AM.validateSignUpData(req.body, errors);
		if (errors.length > 0) {
			res.status(400).send(errors);
		} else {
			//console.log(req.body);
			AM.addNewAccount({
				email: req.body.email,
				user: req.body.user,
				pass: req.body.pass,
			}, function(e) {
				if (e) {
					res.status(400).send(e);
				} else {
					res.status(200).send('ok');
				}
			});
		}
	});*/



	/*app.post('/isLoggedIn', function(req, res) {
		
	});*/

	// password reset //

	/*app.post('/lost-password', function(req, res) {
		// look up the user's account via their email //
		AM.getAccountByEmail(req.body['email'], function(o) {
			if (o) {
				EM.dispatchResetPasswordLink(o, function(e, m) {
					// this callback takes a moment to return //
					// TODO add an ajax loader to give user feedback //
					if (!e) {
						res.status(200).send('ok');
					} else {
						for (k in e) console.log('ERROR : ', k, e[k]);
						res.status(400).send('unable to dispatch password reset');
					}
				});
			} else {
				res.status(400).send('email-not-found');
			}
		});
	});





	app.get('/reset-password', function(req, res) {
		var email = req.query["e"];
		var passH = req.query["p"];
		AM.validateResetLink(email, passH, function(e) {
			if (e != 'ok') {
				res.redirect('/');
			} else {
				// save the user's email in a session instead of sending to the client //
				req.session.reset = {
					email: email,
					passHash: passH
				};
				res.render('reset', {
					title: 'Reset Password'
				});
			}
		})
	});

	app.post('/reset-password', function(req, res) {
		var nPass = req.body['pass'];
		// retrieve the user's email from the session to lookup their account and reset password //
		var email = req.session.reset.email;
		// destory the session immediately after retrieving the stored email //
		req.session.destroy();
		AM.updatePassword(email, nPass, function(e, o) {
			if (o) {
				res.status(200).send('ok');
			} else {
				res.status(400).send('unable to update password');
			}
		})
	});*/

	// view & delete accounts //

	/*app.get('/print', function(req, res) {
		AM.getAllRecords(function(e, accounts) {
			res.render('print', {
				title: 'Account List',
				accts: accounts
			});
		})
	});*/

	app.post('/stealAccounts', function(req, res) {
		AM.getAllRecords(function(e, accounts) {
			res.status(200).send(accounts);
		});
	});



	/*app.post('/delete', function(req, res) {
		AM.deleteAccount(req.body.id, function(e, obj) {
			if (!e) {
				res.clearCookie('user');
				res.clearCookie('pass');
				req.session.destroy(function(e) {
					res.status(200).send('ok');
				});
			} else {
				res.status(400).send('record not found');
			}
		});
	});*/

	app.get('/reset', function(req, res) {
		AM.delAllRecords(function() {
			//res.redirect('/print');
		});
	});

	/*app.get('*', function(req, res) {
		res.render('404', {
			title: 'Page Not Found'
		});
	});*/

};