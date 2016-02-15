const ReactDOM = require('react-dom');
const $ = require('jquery');
require('jasmine-ajax');

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