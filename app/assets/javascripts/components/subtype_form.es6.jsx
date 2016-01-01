class SubtypeName extends React.Component {
  constructor (props) {
    super(props)
    this.state = { name: props.subtype_name }
  }

  componentWillReceiveProps (newProps) {
    this.setState({ name: newProps.subtype_name})
  }

  render() {
    var id = "subtype_name_".concat(this.props.subtype_id)
    return (
      <div className="col-sm-3">
        <div className="field form-group">
          <input className="form-control" type="text" onChange={this.props.onChange} value={ this.state.name } name="subtype[name]" id={id} />
        </div>
      </div>
    )
  }
}

SubtypeName.propTypes = {
  subtype_name: React.PropTypes.string,
  subtype_id: React.PropTypes.number,
  onChange: React.PropTypes.func
}

class SubmitBtn extends React.Component {
  render() {
    return (
      <div className="col-sm-1">
        <div className="actions">
          <input type="submit" name="commit" value={this.props.value} className="btn btn-primary" />
        </div>
      </div>
    )
  }
}
SubmitBtn.props = {
  value: React.PropTypes.string
}

class UpdateBtn extends React.Component {
  render() {
    return (<SubmitBtn value="Update" />)
  }
}

class AddBtn extends React.Component {
  render() {
    return (<SubmitBtn value="Add" />)
  }
}

class DeleteBtn extends React.Component {
  render() {
    var deleteLink = "/subtypes/".concat(this.props.record_id)
    return (
      <div className="col-sm-1">
          <a data-confirm="Are you sure" className="delete-btn" rel="nofollow" data-method="delete" href={ deleteLink } >
            <span className="glyphicon glyphicon-remove-sign medium-glyph" />
          </a>
      </div>
    )
  }
}
DeleteBtn.propTypes = {
  record_id: React.PropTypes.number
};

class SubtypeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {name: props.name}
  }

  handleNameChange (e) {
    this.setState({name: e.target.value});
  }

  handleSubmit (e) {
    e.preventDefault()
    
    var newName = this.state.name.trim()
    
    if (!newName) {
      window.events.emit('errors-subtype-'.concat(this.props.record_id), { errors: ['Subtype name cannot be empty!'] })
      window.events.emit('success-subtype-'.concat(this.props.record_id), { itemName: null })
      return;
    }

    $.ajax({
      url: "/subtypes/".concat(this.props.record_id),
      dataType: 'json',
      type: 'PATCH',
      data: { 
        subtype: {
          name: newName
        }, 
        commit: 'update', 
        utf8: "✓", 
        "authenticity_token": this.props.auth_token 
      },
      success: function(data) {
        var errors = data.errors
        if (errors) {
          window.events.emit('errors-subtype-'.concat(this.props.record_id), { errors: errors })
          window.events.emit('success-subtype-'.concat(this.props.record_id), { itemName: null })
          this.setState({name: this.props.name})
        } else {
          this.setState({name: newName})
          window.events.emit('errors-subtype-'.concat(this.props.record_id), { errors: [] })
          window.events.emit('success-subtype-'.concat(this.props.record_id), { itemName: 'subtype'})
        }
      }.bind(this),
      error: function(xhr, status, err) {
        //console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

    this.setState({name: ''});
  }

  render () {
    var id = "edit_subtype_".concat(this.props.record_id)
    var action = "/subtypes/".concat(this.props.record_id)
    return (
      <form className="edit_subtype" id={id} onSubmit={this.handleSubmit.bind(this)}>
        <SubtypeName subtype_name={this.state.name} subtype_id={this.props.record_id} onChange={this.handleNameChange.bind(this)}/>
        <UpdateBtn />
        <DeleteBtn record_id={this.props.record_id}/>
      </form>
    );
  }
}

SubtypeForm.propTypes = {
  name: React.PropTypes.string,
  record_id: React.PropTypes.number,
  auth_token: React.PropTypes.string
};

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
    
    $.ajax({
      url: '/subtypes',
      type: 'POST',
      data: {
        subtype: {
          name: this.state.name,
          type_id: this.props.type_id
        }, 
        commit: 'Add', 
        utf8: '✓', 
        'authenticity_token': this.props.auth_token 
      },
      dataType: 'json',
      success: function(data) {
        var errors = data.errors
        if (errors) {
          window.events.emit('errors-subtype-new', { errors: errors })
          window.events.emit('success-subtype-new', { itemName: null })
          this.setState({name: this.props.name})
        } else {
          this.setState({name: ''})
          window.events.emit('subtype-created', { subtype: data.subtype })
          window.events.emit('errors-subtype-new', { errors: [] })
          window.events.emit('success-subtype-new', { itemName: 'subtype'})
        }
      }.bind(this)
    })
  }

  render() {
    return (
      <form className="new_subtype" id="new_subtype" onSubmit={this.handleSubmit.bind(this)}>
        <div className="col-sm-3">
          <div className="field form-group">
            <input className="form-control" value={ this.state.name } onChange={this.handleNameChange.bind(this)} type="text" name="subtype[name]" id="subtype_name"></input>
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