class Type extends React.Component {
  render () {
    return (
      <input className="form-control" type="text" defaultValue={ this.props.name } name="type[name]" id="type_name" />
    );
  }
}

Type.propTypes = {
  name: React.PropTypes.string
};
