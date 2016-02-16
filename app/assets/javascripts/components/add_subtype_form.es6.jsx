const Errors = require('./errors.es6.jsx');
const AddTypeFormWrapper= require('./add_type_form_wrapper.es6.jsx');

class AddSubtypeForm extends React.Component {
	render() {
		const {auth_token, type_id} = this.props;
		return (
			<div>
				<Errors id="new" type="subtype" />
				<AddTypeFormWrapper {...{auth_token, type_id, type: "subtype", url: "/subtypes"}}/>
			</div>
		);
	}
}

AddSubtypeForm.propTypes = {
	auth_token: React.PropTypes.string.isRequired,
	type_id: React.PropTypes.number
};

module.exports = AddSubtypeForm;
window.AddSubtypeForm = AddSubtypeForm;