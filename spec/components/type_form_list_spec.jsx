require('../support/helpers/spec_helper.jsx');
describe('TypeFormList', () => {
	const TypeFormList = require('../../app/assets/javascripts/components/type_form_list.es6.jsx');
	const TypeForm = require('../../app/assets/javascripts/components/type_form.es6.jsx');
	const ReactDOM = require('react-dom');
	const {setProps} = require('../support/helpers/react_helper.jsx');
	const type = {name: 'new-type', id: 3};

	let subject, spy, props, addNewTypeToListSpy, typeFormSpy;
	props = {
		types: [	
			{name: 'type1', id: 1},
			{name: 'type2', id: 2}
		]
	};

	beforeEach(() => {
		addNewTypeToListSpy = spyOn(TypeFormList.prototype, 'addNewTypeToList').and.callThrough();
		spy = spyOn(TypeFormList.prototype, 'render').and.callThrough();
		typeFormSpy = spyOn(TypeForm.prototype, 'render').and.callThrough();
		subject = ReactDOM.render(<TypeFormList {...props}/>, root);
	});

	it('renders correct number of type forms', () => {
		const renderCalls = typeFormSpy.calls.all();
		expect(renderCalls.length).toBe(2);
	});

	it('passes the correct props to type forms', () => {
		const renderCalls = typeFormSpy.calls.all();
		const types = props.types;
		renderCalls.forEach((c, i) => {
			expect(c.object.props).toEqual(jasmine.objectContaining({
				name: types[i].name, 
				record_id: types[i].id
			}));
		})
	});

	describe("#addNewTypeToList", () => {
		const state = {types: props.types};
		beforeEach(() => {
			subject.setState(state);
			subject.addNewTypeToList({type});
		});

		it('add new type to state.types', () => {
			expect(subject.state).toEqual({types: props.types.concat(type)});
		});
	});

	describe('type-create event', () => {
		const {Happens} = require('../../app/assets/javascripts/components.js');
		beforeEach(() => {			
			Happens.emit('type-created', {type});
		});

		it('calls #addNewTypeToList', () => {
			expect(TypeFormList.prototype.addNewTypeToList).toHaveBeenCalled();
		});
	});
});