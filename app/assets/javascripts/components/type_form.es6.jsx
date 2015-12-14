class TypeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { name: props.name }
    }

    handleNameChange (e) {
        this.setState({ name: e.target.value })
    }

    handleSubmit (e) {
        e.preventDefault()
        var newName = this.state.name.trim();

        $.ajax({
            url: '/types/'.concat(this.props.record_id),
            type: 'PATCH',
            data: { 
                type: { 
                    name: newName
                },
                commit: 'update',
                utf8: "✓",
                "authenticity_token": this.props.auth_token
            },
            dataType: 'json',
            success: function(data) {
                var errors = data.errors
                if (errors) {
                  window.events.emit('errors-type-'.concat(this.props.record_id), { errors: errors })
                  window.events.emit('success-type-'.concat(this.props.record_id), { itemName: null })
                  this.setState({name: this.props.name})
                } else {
                  this.setState({name: newName})
                  window.events.emit('errors-type-'.concat(this.props.record_id), { errors: [] })
                  window.events.emit('success-type-'.concat(this.props.record_id), { itemName: 'type'})
                }
            }.bind(this),
            error: function(xhr, status, err) {
                //console.error(this.props.url, status, err.toString());
            }.bind(this)
        })
    }

    render () {
        var id = 'edit_type_'.concat(this.props.record_id)
        var deleteLink = "/types/".concat(this.props.record_id)
        return (
            <form className="edit_type" id={id} onSubmit={this.handleSubmit.bind(this)}>
                <div className="row">
                    <div className="col-xs-8 small-padding">
                        <div className="field form-group">
                          <input className="form-control" type="text" onChange={this.handleNameChange.bind(this)} value={this.state.name} name="type[name]" id="type_name" />
                        </div>
                    </div>
                    <div className="col-xs-2 small-padding">
                        <div className="actions">
                          <input type="submit" name="commit" value="Update" className="btn btn-primary update-btn" />
                        </div>
                    </div>
                    <div className="col-xs-1 small-padding">
                        <a data-confirm="Are you sure" className="delete-btn" rel="nofollow" data-method="delete" href={ deleteLink } >
                            <span className="glyphicon glyphicon-remove-sign medium-glyph" />
                        </a>
                    </div>
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
