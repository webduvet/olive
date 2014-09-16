# olive
Fake Promise simple and small library based on event.EventEmitter
ATM it is jus a playground and does not follow any convention

the promise can have multiple then calls passing the promised values as parameters

I think it could be handy to have then alternative behaving in synchronous maner


## Getting Started
Install the module with: `npm install olive`
```
var Promise = require('olive').Promise;
```

## Documentation
The object with asynchrounous operation needs to return a promise 
which by the end of the operation is either fulfilled or broken
```
promise.fulfill(arg1[, arg2[, ...]]);
```
or
```
promise.breach(arg1[, arg2[, ...]]);
```
object waiting for the promise needs to handle both outcomes
and takes as argument a resolving function either anonymous or named

```
promised_result
	.than(function(arg1[, arg2[, ...]]){
		// function body
		})
	.or(console.log)
```

## Examples
```javascript
var Promise = require('olive').Promise;

var Promiser = function(){
}

Promiser.prototype.do = function(){
	var _promise = new Promise();
	someAsyncOp(
		function(success){
			_promise.fulfill(success);
		}, 
		function(error){
			_promise.breach(error);
		});
}
```

the promise when resolved calls the resolver function with the expected arguments

```
var promised = promiser.do();

promised
	.than(console.log)
	.or(console.log);
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 andrej bartko  
Licensed under the MIT license.
