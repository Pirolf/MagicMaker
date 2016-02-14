const SubmitBtn = require('./submit_btn.es6.jsx');
class AddBtn extends SubmitBtn {
  render() {
    return (<SubmitBtn value="Add" />)
  }
}

module.exports = AddBtn;