const CardApi = require('../api/card_api.es6.jsx');
class CardForm extends React.Component {
	submit = () => {
		CardApi.create();
	};

	render() {
		return (<form className='card-form' enctype="multipart/form-data" onSubmit={this.submit}>

		</form>);
	}
}

module.exports = CardForm;
window.CardForm = CardForm;