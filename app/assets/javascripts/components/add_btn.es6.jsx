const SubmitBtn = require('./submit_btn.es6.jsx');
class AddBtn extends React.Component {
  render() {
    return (<SubmitBtn value="Add" submission={this.props.submission} />)
  }
}

AddBtn.propTypes = {
	submission: React.PropTypes.string
};

module.exports = AddBtn;