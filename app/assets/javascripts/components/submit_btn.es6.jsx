class SubmitBtn extends React.Component {
  render() {
    const {submission, btnId} = this.props;
    var spinner = '';

    switch (submission) {
      case 'sending':
        spinner = (
            <span className="spinner"><span className="glyphicon glyphicon-refresh small-glyph" /></span>
        )
        break
      case 'success':
        spinner = (<span className="ok"><span className="glyphicon glyphicon-ok small-glyph" /></span>)
        break
      case 'error':
        break
      case 'idle':
        break
      default:
        break
    }

    return (
      <div className="col-sm-2">
        <div className="actions">
          <div className='btn btn-primary submit-btn' id={btnId}>
            <span>
            {this.props.value}
            </span>
            {spinner}
          </div>
        </div>
      </div>
    )
  }
}

SubmitBtn.props = {
  value: React.PropTypes.string,
  submission: React.PropTypes.string,
  btnId: React.PropTypes.string
}
module.exports = SubmitBtn;