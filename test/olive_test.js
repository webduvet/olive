'use strict';

var Promise = require('../lib/olive.js').Promise;

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

		var result = task();
		result
			.than(function(v1, v2){
				test.equals(v1, "fulfilled", "expecting value 'fulfilled'");
				test.equals(v2, 42, "expecting second argument which is 42 ");
				test.done();
			})
			.or(console.log);
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
			.than(console.log)
			.or(function(v1, v2){
				test.equals(v1, "error", "expecting value 'error'");
				test.equals(v2, 404, "expecting second argument which is 404 ");
				test.done();
			});
	},

};
