//= require_tree ./components
const EventEmitter = require('events').EventEmitter;
const events = new EventEmitter();
const Happens = require('happens')();

window.events = events;

module.exports = {
	Happens
};