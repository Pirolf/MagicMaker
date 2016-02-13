describe('AddBtn', () => {
	const AddBtn = require('../../app/assets/javascripts/components/add_btn.es6.jsx');
	const ReactDOM = require('react-dom');
	const ReactTestUtils = require('react-addons-test-utils');
	let spy;
	beforeEach(() => {
		var jsdom = require('jsdom')
		var doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
		var win = doc.defaultView
		global.document = doc
		global.window = win
		spy = spyOn(AddBtn.prototype, 'render').and.callThrough();
		console.log(AddBtn)
		ReactTestUtils.renderIntoDocument(<AddBtn />);
	});
	it('renders submit button', () => {
		expect(1).toBe(1);
		expect(spy).toHaveBeenCalled();
	});
});