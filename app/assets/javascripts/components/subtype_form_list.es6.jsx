const Errors = require('./errors.es6.jsx');
const SubtypeForm = require('./subtype_form.es6.jsx');

class SubtypeFormList extends React.Component {
    render() {
        const {auth_token, subtypes, type_id} = this.props;
        const subtypeList = subtypes.map((s) => {
            const {id, name} = s;
            return(
                <div key={id}>
                    <Errors {...{id}} type="subtype"/>
                    <div className="row">
                        <SubtypeForm {...{name, auth_token, type_id}} record_id={id} />
                    </div>
                </div>
            );
        });
        return (<div>{subtypeList}</div>);
    }
}

SubtypeFormList.props = {
    subtypes: React.PropTypes.array.isRequired,
    auth_token: React.PropTypes.string.isRequired,
    type_id: React.PropTypes.number.isRequired
}

module.exports = SubtypeFormList;
window.SubtypeFormList = SubtypeFormList;