require('../support/helpers/spec_helper.jsx');
describe('TypeFormList', () => {
	const TypeFormList = require('../../app/assets/javascripts/components/type_form_list.es6.jsx');
	const TypeForm = require('../../app/assets/javascripts/components/type_form.es6.jsx');
	const LightboxLink = require('../../app/assets/javascripts/components/lightbox_link.es6.jsx');
	const ReactDOM = require('react-dom');
	const {setProps} = require('../support/helpers/react_helper.jsx');
	const type = {name: 'new-type', id: 3};

	let subject, spy, props, addNewTypeToListSpy, lightboxLinkSpy, typeFormSpy;
	props = {
		types: [	
			{name: 'type1', id: 1},
			{name: 'type2', id: 2}
		]
	};

	beforeEach(() => {
		addNewTypeToListSpy = spyOn(TypeFormList.prototype, 'addNewTypeToList').and.callThrough();
		spy = spyOn(TypeFormList.prototype, 'render').and.callThrough();
		lightboxLinkSpy = spyOn(LightboxLink.prototype, 'render').and.callThrough();
		typeFormSpy = spyOn(TypeForm.prototype, 'render').and.callThrough();
		subject = ReactDOM.render(<TypeFormList {...props}/>, root);
	});

	it('renders type forms', () => {
		const renderCalls = typeFormSpy.calls.all();
		const types = props.types;
		renderCalls.forEach((c, i) => {
			expect(c.object.props).toEqual(jasmine.objectContaining({
				name: types[i].name, 
				record_id: types[i].id
			}));
		})
	});

	it('renders lightbox links', () => {
		const renderCalls = lightboxLinkSpy.calls.all();
		renderCalls.forEach((c, i) => {
			expect(c.object.props).toEqual({
				url: `/types/${props.types[i].id}/edit`, 
				link_type: 'more_types'
			});
		});
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