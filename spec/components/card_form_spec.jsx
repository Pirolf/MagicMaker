require('../support/helpers/spec_helper.jsx');
describe('CardForm', () => {
	let CardApi, CardForm;

	beforeEach(() => {
		CardForm = require('../../app/assets/javascripts/components/card_form.es6.jsx');
		CardApi = require('../../app/assets/javascripts/api/card_api.es6.jsx');
		ReactDOM.render(<CardForm />, root);
	});

	it('renders a card form', () => {
		expect('.card-form').toExist();
	});

	describe('submit', () => {
		let createSpy;
		beforeEach(() => {
			createSpy = spyOn(CardApi, 'create');
			$('.card-form').simulate('submit');
		})

		it('CardApi.create is called with form data', () => {
			expect(createSpy).toHaveBeenCalled();
		});
	});
});