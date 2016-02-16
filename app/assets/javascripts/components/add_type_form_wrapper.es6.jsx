const AddBtn = require('./add_btn.es6.jsx');
const {Happens} = require('../components.js');
const capitalize = require('lodash.capitalize');
const $ = require('jquery');

class AddTypeFormWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: null, submission: 'idle', timer: null };
  }

  handleNameChange (e) {
    this.setState({name: e.target.value});
  }

  emitErrors(errors) {
    Happens.emit(`errors-${this.props.type}-new`, {errors});
    this.setState({name: null, submission: 'error'});
  }

  submitCallback(data) {
    const {errors} = data;
    if (errors) {
      this.emitErrors(errors);
      return;
    }

    this.setState({name: null, submission: 'success'}, () => {
      const timer = setTimeout(() => {
        this.setState({submission: 'idle', timer: null});
      }, 5000);
      this.setState({timer});
    });
  }

  submit(name) {
    const {auth_token, type_id, type, url} = this.props;
    const payload = type === 'type' ? {name} : {name, type_id};
    $.ajax({
      url,
      type: 'POST',
      data: {
        [type]: payload, 
        commit: 'add', 
        utf8: '✓', 
        authenticity_token: auth_token 
      },
      dataType: 'json'
    })
    .done(this.submitCallback.bind(this));
  }

  handleSubmit(e) {
    e.preventDefault();
    const name = this.state.name.trim();
    if (!name || name === '') {
      this.emitErrors([`${capitalize(this.props.type)} name cannot be empty`]);
      return;
    }
    clearTimeout(this.state.timer);
    this.setState({timer: null, submission: 'sending'}, this.submit(name));
  }

  render() {
    const {type} = this.props;
    return (
      <form className=`new_${type}` id=`new_${type}`>
        <div className="col-sm-3">
          <div className="field form-group">
            <input className="form-control" value={this.state.name} onChange={this.handleNameChange.bind(this)} type="text" 
            name=`${type}[name]` id=`${type}_name`></input>
          </div>
        </div>
        <div onClick={this.handleSubmit.bind(this)}>
          <AddBtn />
        </div>
      </form>
    )
  }
}

AddTypeFormWrapper.propTypes = {
  type_id: React.PropTypes.number,
  auth_token: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired
};

module.exports = AddTypeFormWrapper;
window.AddTypeFormWrapper = AddTypeFormWrapper;