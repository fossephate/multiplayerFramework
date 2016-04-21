var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create User Schema
var account = new Schema({
  username: String,
	password: String,
	email: String,
	characters: Array,
	firstName: String,
	lastName: String,
	friends: Array,
});

module.exports = mongoose.model('account', account);