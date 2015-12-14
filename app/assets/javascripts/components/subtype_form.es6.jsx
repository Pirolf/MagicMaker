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

class UpdateBtn extends React.Component {
  render() {
    return (
      <div className="col-sm-1">
        <div className="actions">
          <input type="submit" name="commit" value="Update" className="btn btn-primary update-btn" />
        </div>
      </div>
    )
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
    /*
    if (!newName) {
      return;
    }
    */

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
