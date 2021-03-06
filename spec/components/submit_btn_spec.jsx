require('../support/helpers/spec_helper.jsx');
describe('SubmitBtn', () => {
	const SubmitBtn = require('../../app/assets/javascripts/components/submit_btn.es6.jsx');
	const ReactDOM = require('react-dom');
	const {setProps} = require('../support/helpers/react_helper.jsx');
	let subject, spy;
	beforeEach(() => {
		spy = spyOn(SubmitBtn.prototype, 'render').and.callThrough();
		subject = ReactDOM.render(<SubmitBtn />, root);
		setProps.call(subject, {value: 'bla'});
	});

	it('props', () => {
		const renderCall = spy.calls.mostRecent();
		expect(spy).toHaveBeenCalled();
		expect(renderCall.object.props).toEqual(jasmine.objectContaining({value: 'bla'}));
	});
});