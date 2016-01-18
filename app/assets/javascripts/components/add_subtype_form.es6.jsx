const AddBtn = require('./add_btn.es6.jsx')
class AddSubtypeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {name: null}
  }

  handleNameChange (e) {
    this.setState({name: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault()

    if (!this.state.name) {
      window.events.emit('errors-subtype-new', { errors: ['Subtype name cannot be empty!'] })
      window.events.emit('success-subtype-new', { itemName: null })
      return;
    }
    const {name} = this.state
    const {auth_token, type_id} = this.props
    $.ajax({
      url: '/subtypes',
      type: 'POST',
      data: {
        subtype: {name, type_id}, 
        commit: 'add', 
        utf8: '✓', 
        'authenticity_token': auth_token 
      },
      dataType: 'json'
    })
    .done((data) => {
      var errors = data.errors
      if (errors) {
        window.events.emit('errors-subtype-new', { errors: errors })
        window.events.emit('success-subtype-new', { itemName: null })
        this.setState({name})
      } else {
        this.setState({name: ''})
        window.events.emit('subtype-created', { subtype: data.subtype })
        window.events.emit('errors-subtype-new', { errors: [] })
        window.events.emit('success-subtype-new', { itemName: 'subtype'})
      }
    })
  }

  render() {
    return (
      <form className="new_subtype" id="new_subtype" onSubmit={this.handleSubmit.bind(this)}>
        <div className="col-sm-3">
          <div className="field form-group">
            <input className="form-control" value={this.state.name} onChange={this.handleNameChange.bind(this)} type="text" name="subtype[name]" id="subtype_name"></input>
          </div>
        </div>
        <AddBtn />
      </form>
    )
  }
}
AddSubtypeForm.propTypes = {
  type_id: React.PropTypes.number,
  auth_token: React.PropTypes.string
};

window.AddSubtypeForm = AddSubtypeForm