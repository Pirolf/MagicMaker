//= require_tree ./components
const EventEmitter = require('events').EventEmitter;
const events = new EventEmitter();

window.events = events;
