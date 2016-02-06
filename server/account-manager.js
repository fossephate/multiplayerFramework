var crypto = require('crypto');
var MongoDB = require('mongodb').Db;
var Server = require('mongodb').Server;
var moment = require('moment');

var dbPort = 27017;
var dbHost = 'localhost';
var dbName = 'node-login';

/* establish the database connection */

var db = new MongoDB(dbName, new Server(dbHost, dbPort, {
	auto_reconnect: true
}), {
	w: 1
});
db.open(function(e, d) {
	if (e) {
		console.log(e);
	} else {
		console.log('connected to database :: ' + dbName);
	}
});
var accounts = db.collection('accounts');

/* login validation methods */

exports.autoLogin = function(user, pass, callback) {
	accounts.findOne({
		user: user
	}, function(e, o) {
		if (o) {
			if(o.pass == pass) {
				//console.log("o: " + o);
				callback(o);
			} else {
				callback(null);
			}
			//o.pass == pass ? callback(o) : callback(null);
		} else {
			callback(null);
		}
	});
}

exports.manualLogin = function(user, pass, callback) {
	var errors = [];
	accounts.findOne({
		user: user
	}, function(e, o) {
		if (o == null) {
			errors.push({
				field: "username",
				msg: "Incorrect login / password / user not found"
			});
			callback(errors);
		} else {
			validatePassword(pass, o.pass, function(err, res) {
				if (res) {
					callback(null, o);
				} else {
					errors.push({
						field: "username",
						msg: "Incorrect login / password"
					});
					callback(errors);
				}
			});
		}
	});
}

/*exports.manualLogin = function(user, pass, callback) {
	var errors = [];
	accounts.findOne({
		user: user
	}, function(e, o) {
		if (o == null) {
			errors.push({
				field: "username",
				msg: "Incorrect login / password / user not found"
			});
		}
	});

	validatePassword(pass, o.pass, function(err, res) {
		if (res) {
			callback(null, o);
		} else {
			errors.push({
				field: "username",
				msg: "Incorrect login / password"
			});
		}
	});
}*/

/* record insertion, update & deletion methods */

/*exports.addNewAccount = function(newData, callback) {
	var errors = [];
	accounts.findOne({
		user: newData.user
	}, function(e, o) {
		if (o) {
			errors.push({
				field: "username",
				msg: "Username taken"
			});
			callback(errors);
		} else {
			accounts.findOne({
				email: newData.email
			}, function(e, o) {
				if (o) {
					errors.push({
						field: "email",
						msg: "Email taken"
					});
					callback(errors);
					//callback('email-taken');
				} else {
					saltAndHash(newData.pass, function(hash) {
						newData.pass = hash;
						// append date stamp when record was created //
						newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
						accounts.insert(newData, {
							safe: true
						}, callback);
					});
				}
			});
		}
	});
};*/



exports.addNewAccount = function(newData, callback) {
	var errors = [];
	accounts.findOne({
		user: newData.user
	}, function(e, o) {
		if (o) {
			errors.push({
				field: "username",
				msg: "Username taken"
			});
			//callback(errors);
		}

		accounts.findOne({
			email: newData.email
		}, function(e, o) {
			if (o) {
				errors.push({
					field: "email",
					msg: "Email taken"
				});
				//callback(errors);
				//callback('email-taken');
			}
			
			if(errors.length > 0) {
				callback(errors);
			} else {
				saltAndHash(newData.pass, function(hash) {
					newData.pass = hash;
					// append date stamp when record was created //
					newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
					accounts.insert(newData, {
						safe: true
					}, callback);
				});
			}

		});

	});
};




exports.addData = function(newData, callback) {
	
	accounts.findOne({
		user: newData.user
	}, function(e, o) {
		//o.name = newData.name;
		//o.email = newData.email;
		for(var key in newData) {
			if(key != 'pass') {
				//console.log("key: " + key);
				o[key] = newData[key];
			}
		}
		
		accounts.save(o, {
			safe: true
		}, function(err) {
			if (err) {
				callback(err);
			} else {
				callback(null, o);
			}
		});
		
	});



};


/*exports.addNewAccount = function(newData, callback) {
	var errors = [];
	accounts.findOne({
		user: newData.user
	}, function(e, o) {
		if (o) {
			errors.push({
				field: "username",
				msg: "Username taken"
			});
			//callback(errors);
		}
	});

	accounts.findOne({
		email: newData.email
	}, function(e, o) {
		if (o) {
			errors.push({
				field: "email",
				msg: "Email taken"
			});
			//callback(errors);
		}
	});
	console.log("errors: " + errors);
	console.log("errors.length: " + errors.length);
	
	if (errors.length > 0) {
		callback(errors);
	} else {
		saltAndHash(newData.pass, function(hash) {
			newData.pass = hash;
			// append date stamp when record was created //
			newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
			accounts.insert(newData, {
				safe: true
			}, callback);
		});
	}
};*/

exports.updateAccount = function(newData, callback) {
	accounts.findOne({
		user: newData.user
	}, function(e, o) {
		o.name = newData.name;
		o.email = newData.email;
		o.country = newData.country;
		if (newData.pass == '') {
			accounts.save(o, {
				safe: true
			}, function(err) {
				if (err) callback(err);
				else callback(null, o);
			});
		} else {
			saltAndHash(newData.pass, function(hash) {
				o.pass = hash;
				accounts.save(o, {
					safe: true
				}, function(err) {
					if (err) callback(err);
					else callback(null, o);
				});
			});
		}
	});
}

exports.updatePassword = function(email, newPass, callback) {
	accounts.findOne({
		email: email
	}, function(e, o) {
		if (e) {
			callback(e, null);
		} else {
			saltAndHash(newPass, function(hash) {
				o.pass = hash;
				accounts.save(o, {
					safe: true
				}, callback);
			});
		}
	});
}

/* account lookup methods */

exports.deleteAccount = function(id, callback) {
	accounts.remove({
		_id: getObjectId(id)
	}, callback);
}

exports.getAccountByEmail = function(email, callback) {
	accounts.findOne({
		email: email
	}, function(e, o) {
		callback(o);
	});
}

exports.getAccountByUser = function(user, callback) {
	accounts.findOne({
		user: user
	}, function(e, o) {
		callback(o);
	});
}

exports.validateResetLink = function(email, passHash, callback) {
	accounts.find({
		$and: [{
			email: email,
			pass: passHash
		}]
	}, function(e, o) {
		callback(o ? 'ok' : null);
	});
}

exports.getAllRecords = function(callback) {
	accounts.find().toArray(
		function(e, res) {
			if (e) callback(e)
			else callback(null, res)
		});
};

exports.delAllRecords = function(callback) {
	accounts.remove({}, callback); // reset accounts collection for testing //
}


exports.validateLoginData = function(reqBody, errors) {
	/*var regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!regx.test(reqBody.user)) {
		errors.push({
			field: "username",
			msg: "error with username"
		});
	}*/

	if (reqBody.user.length < 5) {
		errors.push({
			field: "username",
			msg: "Incorrect login / password"
		});
	}

	regx = /[^a-z0-9\-\_\.]+/i;
	if (regx.test(reqBody.pass)) {
		errors.push({
			field: "password",
			msg: "Illegal character(s)!"
		});
	}
	return errors;
}

exports.validateSignUpData = function(reqBody, errors) {
	var regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!regx.test(reqBody.email)) {
		errors.push({
			field: "email",
			msg: "Invalid email"
		});
	}

	if (reqBody.user.length < 3 || reqBody.user.length > 32) {
		errors.push({
			field: "username",
			msg: "Username must be between 3 and 32 characters"
		});
	}

	regx = /[^a-z0-9\-\_\.]+/i;
	if (regx.test(reqBody.user)) {
		errors.push({
			field: "username",
			msg: "Illegal character(s)!"
		});
	}


	if (reqBody.pass.length < 5 || reqBody.pass.length > 32) {
		errors.push({
			field: "password",
			msg: "Password must be between 5 and 32 characters"
		});
	}

	regx = /[^a-z0-9\-\_\.]+/i;
	if (regx.test(reqBody.pass)) {
		errors.push({
			field: "password",
			msg: "Illegal character(s)!"
		});
	}
	return errors;
}

/* private encryption & validation methods */

var generateSalt = function() {
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback) {
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback) {
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
}

/* auxiliary methods */

var getObjectId = function(id) {
	return new require('mongodb').ObjectID(id);
}

var findById = function(id, callback) {
	accounts.findOne({
			_id: getObjectId(id)
		},
		function(e, res) {
			if (e) callback(e)
			else callback(null, res)
		});
};


var findByMultipleFields = function(a, callback) {
	// this takes an array of name/val pairs to search against {fieldName : 'value'} //
	accounts.find({
		$or: a
	}).toArray(
		function(e, results) {
			if (e) callback(e)
			else callback(null, results)
		});
}