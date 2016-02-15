describe('TypeForm', () => {
	const TypeForm = require('../../app/assets/javascripts/components/type_form.es6.jsx');
	const ReactDOM = require('react-dom');
	const $ = require('jquery');

	let subject, request, doneSpy;

	const record_id = 1;
	const props = {
		name: 'some-type',
		record_id,
		auth_token: 'some-auth-token'
	};

	beforeEach(() => {
		subject = ReactDOM.render(<TypeForm {...props}/>, root);
	});

	describe('#handleSubmit', () => {
		let submitSpy;
		beforeEach(() => {
			submitSpy = spyOn(TypeForm.prototype, 'submit').and.stub();
			subject = ReactDOM.render(<TypeForm {...props}/>, root);
			$('.submit-btn').simulate('click');
		})

		it('timer: null, submission: sending', () => {
			expect(subject.state).toEqual(jasmine.objectContaining({timer: null, submission: 'sending'}));
		});

		it('calls submit', () => {
			expect(submitSpy).toHaveBeenCalled();
		});
	});
	
	describe('#submit', () => {
		let request;
		const newName = 'some new name';
		
		describe('PATCH /type/:id', ()=> {
			beforeEach(() => {
				subject = ReactDOM.render(<TypeForm {...props}/>, root);
				subject.submit(newName);
				request = jasmine.Ajax.requests.mostRecent();
			});

			it('requests with correct url, method, and data', () => {
				expect(request.url).toBe(`/types/${record_id}`);
				expect(request.method).toBe('PATCH');
				expect(request.data()['type[name]']).toEqual([newName]);
			});
		});

		describe('on errors', () => {
			const {Happens} = require('../../app/assets/javascripts/components.js');
			let happensSpy;
			const errors = {errors: ['some error']};
			beforeEach(() => {
				doneSpy = spyOn(TypeForm.prototype, 'submitCallback').and.callThrough();
				spyOn($, 'ajax').and.returnValue($.Deferred().resolve(errors).promise());
				happensSpy = spyOn(Happens, 'emit').and.callThrough();

				subject = ReactDOM.render(<TypeForm {...props}/>, root);
				subject.submit(newName);
			});

			it('emits error event', () => {
				expect(happensSpy).toHaveBeenCalledWith(`errors-type-${record_id}`, errors);
			});
		});

		describe('on update success', () => {
			beforeEach(() => {
				doneSpy = spyOn(TypeForm.prototype, 'submitCallback').and.callThrough();
				spyOn($, 'ajax').and.returnValue($.Deferred().resolve({}).promise());

				subject = ReactDOM.render(<TypeForm {...props}/>, root);
				subject.submit(newName);

				expect(subject.state.name).toBe(newName);
				expect(subject.state.timer).not.toBe(null);
				jasmine.clock().tick(5001);
			});

			it('done has been called', () => {
				expect(doneSpy).toHaveBeenCalled();
			});

			it('sets idle and time null', () => {
				expect(subject.state).toEqual(jasmine.objectContaining({submission: 'idle', timer: null}));
			})
		})
	});
});