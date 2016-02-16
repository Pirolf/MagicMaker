describe('AddTypeFormWrapper', () => {
	const AddTypeFormWrapper = require('../../app/assets/javascripts/components/add_type_form_wrapper.es6.jsx');
	const ReactDOM = require('react-dom');
	const $ = require('jquery');

	let subject;
	const auth_token = 'some-token';
	const type = 'type';
	const url = '/submit-url';
	const props = {
		auth_token,
		type,
		url
	};
	
	beforeEach(() => {
		subject = ReactDOM.render(<AddTypeFormWrapper {...props}/>, root);
	});

	describe('#handleSubmit', () => {
		let emitErrorsSpy, handleSubmitSpy, submitSpy;
		const capitalize = require('lodash.capitalize');
		describe('when name is empty', () => {
			beforeEach(() => {
				handleSubmitSpy = spyOn(AddTypeFormWrapper.prototype, 'handleSubmit').and.callThrough();
				emitErrorsSpy = spyOn(AddTypeFormWrapper.prototype, 'emitErrors').and.stub();
				submitSpy = spyOn(AddTypeFormWrapper.prototype, 'submit').and.stub();

				subject.setState({name: ''});
				$('.submit-btn').simulate('click');
				expect(handleSubmitSpy).toHaveBeenCalled();
			});

			it('emits error', () => {
				expect(emitErrorsSpy).toHaveBeenCalledWith([`${capitalize(type)} name cannot be empty`]);
			});

			it('does not submit', () => {
				expect(submitSpy).not.toHaveBeenCalled();
			});
		});

		describe('when name is empty', () => {
			beforeEach(() => {
				handleSubmitSpy = spyOn(AddTypeFormWrapper.prototype, 'handleSubmit').and.callThrough();
				emitErrorsSpy = spyOn(AddTypeFormWrapper.prototype, 'emitErrors').and.stub();
				submitSpy = spyOn(AddTypeFormWrapper.prototype, 'submit').and.stub();

				subject.setState({name: 'some name'});
				$('.submit-btn').simulate('click');
				expect(handleSubmitSpy).toHaveBeenCalled();
			});

			it('does not emit error', () => {
				expect(emitErrorsSpy).not.toHaveBeenCalledWith();
			});

			it('sets state to submission: sending', () => {
				expect(subject.state.submission).toBe('sending');
			});

			it('submits', () => {
				expect(submitSpy).toHaveBeenCalled();
			});
		});
	});
	
	describe('#submit', () => {
		let request, doneSpy, failSpy;
		beforeEach(() => {
			doneSpy = spyOn(AddTypeFormWrapper.prototype, 'submitCallback').and.stub();

			subject.submit('some name');
			request = jasmine.Ajax.requests.mostRecent();
		});


		it('requests with the correct url, type, and data', () => {
			expect(request.url).toBe(url);
			expect(request.method).toBe('POST');
			expect(request.data()['type[name]']).toEqual(['some name'])
		});

		describe('when type is subtype', () => {
			beforeEach(() => {
				const props = {
					auth_token: '',
					type: 'subtype', 
					type_id: 2,
					url: '/subtypes'
				}
				subject = ReactDOM.render(<AddTypeFormWrapper {...props}/>, root);
				subject.submit('some subtype name');
				request = jasmine.Ajax.requests.mostRecent();
			});

			it('requests with the correct data', () => {
				expect(request.data()['subtype[name]']).toEqual(['some subtype name']);
				expect(request.data()['subtype[type_id]']).toEqual(['2']);
			})
		});
	});

	describe('after submit', () => {
		let doneSpy;
		beforeEach(() => {
			doneSpy = spyOn(AddTypeFormWrapper.prototype, 'submitCallback').and.callThrough();
		});

		describe('success', () => {
			const {Happens} = require('../../app/assets/javascripts/components.js');
			let happensSpy;
			const successData = {success: true};
			beforeEach(() => {
				happensSpy = spyOn(Happens, 'emit').and.stub();
				spyOn($, 'ajax').and.returnValue($.Deferred().resolve(successData).promise());
				subject.submit('some name');
			});

			it('sets correct state', () => {
				expect(subject.state).toEqual(jasmine.objectContaining({name: null, submission: 'success'}))
			});

			it('emits success event', () => {
				expect(happensSpy).toHaveBeenCalledWith(`${type}-created`, successData);
			});

			it('in 5 seconds, sets state to submission: idle, timer: null', () => {
				jasmine.clock().tick(5001);
				expect(subject.state).toEqual(jasmine.objectContaining({submission: 'idle', timer: null}));
			});
		});

		describe('failure', () => {
			let emitErrorsSpy;
			const errors = {errors: ['some error']};
			beforeEach(() => {
				emitErrorsSpy = spyOn(AddTypeFormWrapper.prototype, 'emitErrors').and.stub();
				spyOn($, 'ajax').and.returnValue($.Deferred().resolve(errors).promise());
				subject.submit('some name');
			});

			it('emits errors', () => {
				expect(emitErrorsSpy).toHaveBeenCalledWith(['some error']);
			});
		});
	});

	describe('#emitErrors', () => {
		const {Happens} = require('../../app/assets/javascripts/components.js');
		let happensSpy;
		beforeEach(() => {
			happensSpy = spyOn(Happens, 'emit').and.stub();
			subject.emitErrors(['some error']);
		});

		it('emits error with correct type', () => {
			expect(happensSpy.calls.mostRecent().args[0]).toBe(`errors-${type}-new`);
		});
	});
});