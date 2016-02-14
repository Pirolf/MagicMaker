describe('AddBtn', () => {
	const AddBtn = require('../../app/assets/javascripts/components/add_btn.es6.jsx');
	const ReactDOM = require('react-dom');
	const ReactTestUtils = require('react-addons-test-utils');
	let spy;
	beforeEach(() => {
		spy = spyOn(AddBtn.prototype, 'render').and.callThrough();
		ReactTestUtils.renderIntoDocument(<AddBtn />);
	});

	it('renders submit button', () => {
		expect(1).toBe(1);
		expect(spy).toHaveBeenCalled();
	});
});