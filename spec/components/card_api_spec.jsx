require('../support/helpers/spec_helper.jsx');
describe('CardApi', () => {
	let CardApi;
	beforeEach(() => {
		CardApi = require('../../app/assets/javascripts/api/card_api.es6.jsx');		
	});

	describe('#create', () => {
		let request;
		beforeEach(() => {
			request = jasmine.Ajax.requests.mostRecent();
		});

		it('POST /cards', () => {
			expect(request.url).toBe('/cards');
		});
	});
});