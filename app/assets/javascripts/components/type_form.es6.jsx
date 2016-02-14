const DeleteBtn = require('./delete_btn.es6.jsx');
const UpdateBtn = require('./update_btn.es6.jsx');

const {Happens} = require('../components.js');
class TypeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: props.name, submission: 'idle', timer: null };
    }

    handleNameChange (e) {
        this.setState({ name: e.target.value });
    }

    handleSubmit (e) {
        e.preventDefault();
        const newName = this.state.name.trim();
        const {record_id, auth_token, name} = this.props;
        const errorEvent = `errors-type-${record_id}`;

        clearTimeout(this.state.timer);
        this.setState({timer: null, submission: 'sending'}, () => {
            $.ajax({
                url: `/types/${record_id}`,
                type: 'PATCH',
                data: { 
                    type: { 
                        name: newName
                    },
                    commit: 'update',
                    utf8: "✓",
                    "authenticity_token": auth_token
                },
                dataType: 'json'
            })
            .done((data) => {
                const {errors} = data;
                const {name} = this.props;
                if (errors) {
                  Happens.emit(errorEvent, {errors});
                  this.setState({name, submission: 'error'});
                  return;
                }
                
                this.setState({name: newName, submission: 'success'}, () => {
                  const timer = setTimeout(() => { this.setState({submission: 'idle', timer: null})}, 5000);
                  this.setState({timer});
                });
            });
        });
    }

    render () {
        const {record_id} = this.props;
        const {submission} = this.state;
        const id = `edit_type_${record_id}`;
        const deleteLink = `/types/${record_id}`;
        return (
            <form className="edit_type" id={id} onSubmit={this.handleSubmit.bind(this)}>
                <div className="row">
                    <div className="col-xs-8 small-padding">
                        <div className="field form-group">
                          <input className="form-control" type="text" onChange={this.handleNameChange.bind(this)} value={this.state.name} name="type[name]" id="type_name" />
                        </div>
                    </div>
                    <div onClick={this.handleSubmit.bind(this)}>
                        <UpdateBtn {...{submission}}/>
                    </div>
                    <DeleteBtn {...{record_id}}/>
                </div>                
            </form>
        );
    }
}

TypeForm.propTypes = {
    name: React.PropTypes.string, 
    record_id: React.PropTypes.number,
    auth_token: React.PropTypes.string
}

module.exports = TypeForm;
window.TypeForm = TypeForm;