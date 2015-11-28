class Errors extends React.Component {
  render () {
    
    if (this.props.errorCount == 0) {
        return false
    }
    
    var errorsList = []
    this.props.messages.forEach(function(m, index) {
        errorsList.push(<div key={ index } className='error'>{ m }</div>)
    })

    return (
        <div className="error-explanation">
          <div className='error-notice'>{ this.props.errorCount } errors prohibited this type from being saved:</div>
          <div className='errors-list'>{ errorsList }</div>
        </div>
    )
  }
}

Errors.propTypes = {
  errorCount: React.PropTypes.number,
  messages: React.PropTypes.array
}
