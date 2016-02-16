const EventEmitter = require('events').EventEmitter;
const events = new EventEmitter();
const Happens = require('happens')();

window.events = events;

module.exports = {
	Happens
};
//= require_tree ./components