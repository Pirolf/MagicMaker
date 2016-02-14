require('../support/helpers/spec_helper.jsx');
describe('AddBtn', () => {
	const AddBtn = require('../../app/assets/javascripts/components/add_btn.es6.jsx');
	const ReactDOM = require('react-dom');
	let spy;
	beforeEach(() => {
		spy = spyOn(AddBtn.prototype, 'render').and.callThrough();
		ReactDOM.render(<AddBtn />, root);
	});

	it('renders submit button', () => {
		expect(1).toBe(1);
		expect(spy).toHaveBeenCalled();
	});
});