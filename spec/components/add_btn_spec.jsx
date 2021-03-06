require('../support/helpers/spec_helper.jsx');
describe('AddBtn', () => {
	const AddBtn = require('../../app/assets/javascripts/components/add_btn.es6.jsx');
	const ReactDOM = require('react-dom');
	let spy;
	beforeEach(() => {
		spy = spyOn(AddBtn.prototype, 'render').and.callThrough();
		ReactDOM.render(<AddBtn />, root);
		console.log(window);
	});

	it('renders submit button', () => {
		expect(spy).toHaveBeenCalled();
	});
});