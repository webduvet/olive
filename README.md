# olive

The best project ever.

## Getting Started
Install the module with: `npm install olive`

```javascript
var olive = require('olive');
olive.awesome(); // "awesome"
```

## Documentation
The object with asynchrounous operation needs to return a promise

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
			_promise.break(error);
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

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 andrej bartko  
Licensed under the MIT license.
