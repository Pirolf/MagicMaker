const ReactDOM = require('react-dom');
const $ = require('jquery');
require('jasmine-jquery');
require('pivotal-js-jasmine-matchers');
require('pivotal-js-react-test-helpers');
require('jasmine-ajax');

const globals = {
	$,
	ReactDOM 
};
Object.assign(global, globals);

beforeEach(() => {
	$('body').find('#root').remove().end().append('<div id="root"/>');
	jasmine.Ajax.install();
	jasmine.clock().install();
});

afterEach(() => {
	ReactDOM.unmountComponentAtNode(root);
  	jasmine.Ajax.uninstall();
  	jasmine.clock().tick(1);
  	jasmine.clock().uninstall();
});