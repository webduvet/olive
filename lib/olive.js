/*
 * olive
 * https://github.com/webduvet/olive
 *
 * All the heavy lifting is done by events, Olive just picks a cream
 *
 * Copyright (c) 2014 andrej bartko
 * Licensed under the MIT license.
 */

'use strict';

var Util = require ('util'),
		Emitter = require ('events').EventEmitter;

var Olive = module.exports['Promise'] = function(){
	this._resolved = false;
	this._fulfilled = false;
	this._breached = false;
}

Util.inherits( Olive, Emitter );

Olive.prototype.then = function(fn){
  this.on('result', function(){
    fn.apply(this, arguments[0]);
  }.bind(this));
  return this;
};

Olive.prototype.or = function(fn){
  this.on('error', function(){
    fn.apply(this, arguments[0]);
  }.bind(this));
  return this;
};

Olive.prototype.fulfill = function(){
  this.emit('result',arguments);
	this._resolved = true;
	this._fulfilled = true;
}

Olive.prototype.breach = function(){
  this.emit('error',arguments);
	this._resolved = true;
	this._breached = true;
}

