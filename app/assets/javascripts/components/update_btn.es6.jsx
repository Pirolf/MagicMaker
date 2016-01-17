class UpdateBtn extends React.Component {
  render() {
    return (<SubmitBtn value="Update" submission={this.props.submission} />)
  }
}

UpdateBtn.props = {
  submission: React.PropTypes.string
}