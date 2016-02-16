const AddSubtypeForm = require('./add_subtype_form.es6.jsx');
const SubtypeFormList = require('./subtype_form_list.es6.jsx');
class SubtypeSection extends React.Component {
	render() {
		const {auth_token, type_id, subtypes} = this.props;
		const addSubtypeFormProps = {auth_token, type_id};
		const subtypeFormListProps = {auth_token, subtypes};

		return (
			<div>
				<div className="row">
					<AddSubtypeForm {...addSubtypeFormProps}/>
				</div>
				<SubtypeFormList {...subtypeFormListProps}/>
			</div>
		);
	}
}

SubtypeSection.propTypes = {
	auth_token: React.PropTypes.string.isRequired,
	type_id: React.PropTypes.number.isRequired,
	subtypes: React.PropTypes.array
};
module.exports = SubtypeSection;
window.SubtypeSection = SubtypeSection;