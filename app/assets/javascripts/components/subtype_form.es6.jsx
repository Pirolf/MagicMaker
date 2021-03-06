const DeleteBtn = require('./delete_btn.es6.jsx');
const SubtypeName = require('./subtype_name.es6.jsx');
const UpdateBtn = require('./update_btn.es6.jsx');

const {Happens} = require('./shared.es6.jsx');

class SubtypeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {name: props.name, submission: 'idle', timer: null}
  }

  handleNameChange (e) {
    this.setState({name: e.target.value});
  }

  handleSubmit (e) {
    e.preventDefault();

    var newName = this.state.name.trim();
    const {record_id, auth_token} = this.props;

    const errorEvent = `errors-subtype-${record_id}`;
    
    if (!newName) {
      Happens.emit(errorEvent, { errors: ['Subtype name cannot be empty!'] });
      this.setState({name: this.props.name});
      return;
    }
    
    const {submission} = this.state;
    if (submission === 'sending') return;

    clearTimeout(this.state.timer);
    this.setState({timer: null, submission: 'sending'}, () => {
      $.ajax({
        url: `/subtypes/${record_id}`,
        dataType: 'json',
        type: 'PATCH',
        data: { 
          subtype: {name: newName}, 
          commit: 'update', 
          utf8: "✓", 
          "authenticity_token": auth_token 
        }
      })
      .done((data) => {
        const {errors} = data;
        const {name, type_id} = this.props;
        if (errors) {
          Happens.emit(errorEvent, {errors});
          this.setState({name, submission: 'error'});
          return;
        }
        window.events.emit('subtypes-updated', {id: record_id, name: newName, type_id});
        this.setState({name: newName, submission: 'success'}, () => {
          const timer = setTimeout(() => { this.setState({submission: 'idle', timer: null})}, 5000);
          this.setState({timer});
        });
      });
    })
  }

  render () {
    const {auth_token, record_id} = this.props;
    const {name, submission} = this.state;
    const id = `edit_subtype_${record_id}`;
    const url = `/subtypes/${record_id}.json`;
    return (
      <form className="edit_subtype" {...{id}} >
        <SubtypeName subtype_name={name} subtype_id={record_id} onChange={this.handleNameChange.bind(this)}/>
        <div onClick={this.handleSubmit.bind(this)}>
          <UpdateBtn {...{submission}}/>
        </div>
        <DeleteBtn {...{auth_token, id: record_id, type: 'subtype', url}}/>
      </form>
    );
  }
}

SubtypeForm.propTypes = {
  name: React.PropTypes.string,
  record_id: React.PropTypes.number,
  auth_token: React.PropTypes.string,
  type_id: React.PropTypes.number
};

module.exports = SubtypeForm