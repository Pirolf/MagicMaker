const SubmitBtn = require('./submit_btn.es6.jsx')
class UpdateBtn extends React.Component {
  render() {
    return (<SubmitBtn value="Update" submission={this.props.submission} />)
  }
}

UpdateBtn.props = {
  submission: React.PropTypes.string
}
module.exports = UpdateBtn