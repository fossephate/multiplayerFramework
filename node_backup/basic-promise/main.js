'use strict';
var id = 1;
var Promise = function(){
	var events = {
			resolve: [],
			reject: [],
			complete: []
		},
		success = false,
		complete;
	this.id = id++;
	complete = function(){
		var thisObj = this;
		events['complete'].forEach(function(callback, index){
			if(typeof callback === 'function')
				callback.call(thisObj, value);
		});			
	};
	this.resolve = function(value){
		if(!success){
			var thisObj = this;
			events['resolve'].forEach(function(callback, index){
				if(typeof callback === 'function')
					callback.call(thisObj, value);
			});
			complete.call(thisObj);
		}
		success = true;
	};
	this.reject = function(value){
		if(!success){
			var thisObj = this;
			events['reject'].forEach(function(callback, index){
				if(typeof callback === 'function')
					callback.call(thisObj, value);
			});
			complete.call(thisObj);
		}
		success = true;
	};
	this.then = function(resolve, reject, complete){
		if(resolve)
			events['resolve'].push(resolve);
		if(reject)
			events['reject'].push(reject);
		if(complete)
			events['complete'].push(complete);
		return this;
	};
	this.on = function(eventName, callback){
		if(eventName === 'resolve')
			events['resolve'].push(callback);
		else if(eventName === 'reject')
			events['reject'].push(callback);
		else if(eventName === 'complete')
			events['complete'].push(callback);
		return this;
	};
};
var promise = function(promises){
	if(typeof promises === 'number'){
		var arr = [];
		for(var i = 0; i < promises; i++){
			arr[i] = promise();
		}
		promises = arr;
	}
	if(Array.isArray(promises)){
		var p = promise();
			p.eq = function(index){
				return promises[index];
			};
			p.last = function(){
				return promises[promises.length-1];
			};
			p.first = function(){
				return promises[0];
			};
		var promisesResult = {};
		var rejects = 0;
		var resolves = 0;
		var success = function(type, data){
			promisesResult[this.id] = {
				type: type,
				data: data
			};
			(type == 'resolve')?resolves++:rejects++;
			if(resolves+rejects == promises.length){
				var arrayReturn = [];
				for(var i = 0; i < promises.length; i++){
					arrayReturn.push(promisesResult[promises[i].id]);
				}
				(resolves == promises.length)?p.resolve(arrayReturn):p.reject(arrayReturn);
			}
		};
		for(var i = 0; i < promises.length; i++){
			promises[i].then(function(data){
				success.call(this, 'resolve', data);
			}, function(data){
				success.call(this, 'reject', data);
			});
		}
		return p;
	}else{
		return new Promise();
	}
};
exports = module.exports = promise;