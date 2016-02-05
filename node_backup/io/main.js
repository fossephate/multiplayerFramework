var readline = require('readline');
var promise = require('basic-promise');

var renderStyle = function(text, style){
	var searchColor = function(name){
		var colors = {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],
			gray: [90, 39],
			grey: [90, 39]
		};
		return colors[name]||colors['white'];
	};
	var searchBackground = function(name){
		var backgrounds = {
			black: [40, 49],
			red: [41, 49],
			green: [42, 49],
			yellow: [43, 49],
			blue: [44, 49],
			magenta: [45, 49],
			cyan: [46, 49],
			white: [47, 49]
		};
		return backgrounds[name]||backgrounds['black'];
	};
	var searchStyle = function(name){
		var styles = {
			bold: [1, 22],
			italic: [3, 23],
			underline: [4, 24],
			strikethrough: [9, 29]
		};
		return (styles[name]||false);
	};


	var color = searchColor(style.color||'white');
		color = ['\u001b['+color[0]+'m', '\u001b['+color[1]+'m'];
	var background = searchBackground(style.background||'black');
		background = ['\u001b['+background[0]+'m', '\u001b['+background[1]+'m'];
	var style = searchStyle(style.style||'');
		style = (style)?['\u001b['+style[0]+'m', '\u001b['+style[1]+'m']:['',''];
	return (color[0]+background[0]+style[0]+text+style[1]+background[1]+color[1]);
};

var io = {};
	io.read = function(questions, callback){
		if(!Array.isArray(questions))
			questions = [questions];
		var promises;
		var index = 0;
		var askMethod = function(question, def, style, callback){
			var rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout
			});
			var question = (style)?renderStyle(question, style):question;
			rl.question(question, function(answer){
				callback.call(rl, answer);
			});
			if(def||' '){
				if(typeof def === 'object'){
					var def = (def.style)?renderStyle(def.text, def.style):def.text;
					rl.write(def);
				}else if(typeof def === 'string'){
					rl.write(def);
				}
			}
		};
		var askAction = function(q, answer, question){
			var thisAction = this;
			if(q.format){
				if(!q.format.test(answer)){
					this.close();
					askMethod(q.formatError, q.defult, q.style, function(answer){
						askAction.call(this, q, answer);
					});
					return false;
				}
			}
			if(q.after){
				var next = {
					continue: function(){
						thisAction.close();
						q.promise.resolve(answer);
					},
					error: function(){
						thisAction.close();
						askMethod(q.formatError, q.defult, q.style, function(answer){
							askAction.call(thisAction, q, answer);
						});
					},
					again: function(){
						thisAction.close();
						askMethod(q.question, q.defult, q.style, function(answer){
							askAction.call(thisAction, q, answer);
						});						
					}
				};
				var returnAfter = q.after.call(next, answer, question);
				if(typeof returnAfter === 'undefined'){
					return false;
				}
			}
			this.close();
			q.promise.resolve(answer);
		};
		var ask = function(){
			var q = questions[index];
				q.promise = promises.eq(index++);
			if(q.question){
				askMethod(q.question, q.defult, q.style, function(answer){
					askAction.call(this, q, answer, q.question);
				});
			}
		};
		promises = [];
		questions.forEach(function(){
			promises.push(promise().on('resolve', function(){
				if(index < questions.length)
					ask();
			}));
		});
		promises = promise(promises);
		promises.on('resolve', function(arr){
			var returnArr = [];
			arr.forEach(function(val){
				returnArr.push(val.data);
			});
			if(returnArr.length > 1)
				callback(returnArr);
			else
				callback(returnArr[0]);
		});
		ask();
	};

	io.write = function(text, color, background, style){
		if(typeof color === 'string'){
			var styleObj = {
				color: color,
				style: style,
				background: background
			};
			process.stdout.write(renderStyle(text, styleObj)+'\n');
		}else if(typeof color === 'object'){
			var styleObj = color;
			process.stdout.write(renderStyle(text, styleObj)+'\n');
		}
	};
	
	io.volatile = function(text, color, background, style){
		process.stderr.clearLine(1);
		process.stderr.cursorTo(0);
		if(typeof color === 'string'){
			var styleObj = {
				color: color,
				style: style,
				background: background
			};
			process.stderr.write(renderStyle(text, styleObj));
		}else if(typeof color === 'object'){
			var styleObj = color;
			process.stderr.write(renderStyle(text, styleObj));
		}
	};

	io.tty = function(text, color, background, style){
		if(typeof color === 'string'){
			var styleObj = {
				color: color,
				style: style,
				background: background
			};
			return renderStyle(text, styleObj);
		}else if(typeof color === 'object'){
			var styleObj = color;
			return renderStyle(text, styleObj);
		}
	};
exports = module.exports = io;
