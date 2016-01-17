class SubmitBtn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {submission: 'idle'}
  }

  render() {
    let spinnerClasses = classname('btn', 'btn-primary', 'has-spinner', {active: submission === 'sending'})
    const {submission} = this.state
    console.log(submission)
    let spinner
    switch (submission) {
      case 'sending':
        spinner = (
          <div className={spinnerClasses} >
            <span className="spinner"><i className="icon-spin icon-refresh"></i></span>
          </div>
        )
        break
      case 'success':
        spinner = (<span className="glyphicon glyphicon-ok medium-glyph" />)
        break
      case 'error':
        break
      case 'idle':
        break
      default:
        break
    }

    return (
      <div className="col-sm-1">
        <div className="actions">
          <div className='btn btn-primary'>
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
  submission: React.PropTypes.string
}

module.exports = SubmitBtn