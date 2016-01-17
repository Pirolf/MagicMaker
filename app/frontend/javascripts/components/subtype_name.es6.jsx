class SubtypeName extends React.Component {
  constructor (props) {
    super(props)
    this.state = {name: props.subtype_name}
  }

  componentWillReceiveProps (newProps) {
    this.setState({name: newProps.subtype_name})
  }

  render() {
    const id = `subtype_name_${this.props.subtype_id}`
    return (
      <div className="col-sm-3">
        <div className="field form-group">
          <input className="form-control" type="text" onChange={this.props.onChange} value={this.state.name} name="subtype[name]" id={id} />
        </div>
      </div>
    )
  }
}

SubtypeName.propTypes = {
  subtype_name: React.PropTypes.string,
  subtype_id: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired
}
module.exports = SubtypeName