const AddSubtypeForm = require('./add_subtype_form.es6.jsx');
const SubtypeFormList = require('./subtype_form_list.es6.jsx');
const update = require('react-addons-update');
class SubtypeSection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {subtypes: props.subtypes};
	}

    addSubtype(data) {
        const subtypes = this.state.subtypes.concat(data.subtype);
        this.setState({subtypes});
    }

	removeSubtype(data) {
		const subtypes = this.state.subtypes.filter((subtype) => {
			return subtype.id !== data.id;
		});
		this.setState({subtypes});
	}

	componentDidMount() {
		window.events.on('remove-subtype', this.removeSubtype.bind(this));
        window.events.on('subtype-created', this.addSubtype.bind(this));
	}

	componentWillUnmount() {
		window.events.off('remove-subtype', this.removeSubtype.bind(this));
        window.events.off('subtype-created', this.addSubtype.bind(this));
	}

	render() {
		const {auth_token, type_id} = this.props;
		const {subtypes} = this.state;
		const addSubtypeFormProps = {auth_token, type_id};
		const subtypeFormListProps = {auth_token, subtypes, type_id};

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