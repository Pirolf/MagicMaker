describe('SubmitBtn', () => {
	const SubmitBtn = require('../../app/assets/javascripts/components/submit_btn.es6.jsx');
	const ReactDOM = require('react-dom');
	const {setProps} = require('../support/helpers/react_helper.jsx');
	const $ = require('jquery');
	let subject, spy;
	beforeEach(() => {
		$('body').find('#root').remove().end().append('<div id="root"/>');
		spy = spyOn(SubmitBtn.prototype, 'render').and.callThrough();
		subject = ReactDOM.render(<SubmitBtn />, root);
		setProps.call(subject, {value: 'bla'});
	});

	it('props', () => {
		const renderCall = spy.calls.mostRecent();
		expect(spy).toHaveBeenCalled();
		expect(renderCall.object.props).toEqual(jasmine.objectContaining({value: 'bla'}));
	});
	
	afterEach(() => {
	  ReactDOM.unmountComponentAtNode(root);
	});
});