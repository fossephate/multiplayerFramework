## Usage

**Basic**
```js
var promise = require('basic-promise');
var p = promise(); // => Declare the promise

p.then(function(a){ // => The promise is resolved
	console.log(a); // => Resolve param
	console.log('DONE');
}, function(a){ // => The promise is rejected
	console.log(a); // => Reject param
	console.log('ERROR')
}, function(){ // => The promise id complete (after rolve or reject)
	console.log('COMPLETE');
});

//or

p.on('resolve', function(a){ // => The promise is resolved
	console.log(a); // => Resolve param
	console.log('DONE');
})
.on('reject', function(a){ // => The promise is rejected
	console.log(a); // => Reject param
	console.log('ERROR')
})
.on('complete', function(){ // => The promise id complete (after rolve or reject)
	console.log('COMPLETE');
});

p.resolve('a'); // => Execute the function for resolve with the param "a"
p.reject('a'); // => Execute the function for reject with the param "a"
```

**Multiple**
```js
var ps = [promise(), promise()];
// or
var ps = [promise().then(function(){
    console.log('resolve');
},function(){
    console.log('reject');
}, function(){
    console.log('complete');
}),
promise().then(function(){
    console.log('resolve');
},function(){
    console.log('reject');
}, function(){
    console.log('complete');
})];
// or
var ps = 2;

var p = promise(ps);
p.then(function(){
	console.log('All the promises is resolve');
}, function(){
	console.log('Minimum one was rejected');
}, function(){
	console.log('All the promises were completed');
});

//Only with multiple promises
p.eq(2); //Returns the promise to fix the position 2 (the position is 0 to infinite)
p.first(); //Return the first promise
p.last(); //Return the last promise
```