'use strict';

var Promise = require('../lib/olive.js').Promise;
var Util = require('util');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['Olive'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'no args': function(test) {
    test.expect(1);
    // tests here
    test.equal(typeof Promise, 'function', 'should be function.');
    test.done();
  },

	'test simple fullfil promise': function (test) {
		test.expect(2);

		var task = function(cb){
			var promise = new Promise();
			setTimeout(function(){
				promise.fulfill("fulfilled", 42);
			}.bind(this), 1500);
			//returning promise
			return promise;
		}

		//getting promise object
		var result = task();
		result
			.then(function(v1, v2){
				test.equals(v1, "fulfilled", "expecting value 'fulfilled'");
				test.equals(v2, 42, "expecting second argument which is 42 ");
				test.done();
			})
			.then(function(){setTimeout(function(){console.log("second then, async op")},700)})
			.then(console.log)
			.then(function(){
				console.log.apply(null, arguments);
			})
			.or(console.log);

		function change(a,b){
			
		}
	},

	'test simple broken promise': function (test) {
		test.expect(2);

		var task = function(cb){
			var promise = new Promise();
			setTimeout(function(){
				promise.breach("error", 404);
			}.bind(this), 1500);
			//returning promise
			return promise;
		}

		var result = task();
		result
			.then(console.log)
			.or(function(v1, v2){
				test.equals(v1, "error", "expecting value 'error'");
				test.equals(v2, 404, "expecting second argument which is 404 ");
				test.done();
			});
	},

	'test async initialization of an object\'s methods return promise': function(test) {

		// this object needs async action in constructor
		// how can we call the object methods?
		// shell we return the promise?
		var Late = function(){
			this._val = new Promise();
			setTimeout(function(){
				this._val.fulfill("initialized");
			}.bind(this),1000);
		}

		Late.prototype.val = function(){
			return this._val;
		}

		var late = new Late();

		late.val()
			.then(function(param){
				test.equals(param, "initialized", "expected to return initialized");
				test.done();
			});

	},

	'test async initialization of an object Object inherits from Promise, deffered like approach': function(test) {

		// this object needs async action in constructor
		// how can we call the object methods?
		// shell we return the promise?
		var Late = function(){
			this._val = null;
			setTimeout(function(){
				this._val = "initialized";
				this.fulfill(this);
			}.bind(this),1000);
			return this;
		}

		Util.inherits(Late, Promise);

		Late.prototype.val = function(){
			return this._val;
		}

		var late = new Late();

		late
			.then(function(){
				test.equals(late.val(), "initialized", "expected to return initialized");
				test.done();
			})
			.or(console.log);

	}

};
