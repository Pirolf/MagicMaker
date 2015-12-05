class Errors extends React.Component {
  constructor () {
    super()
    this.state = { errors: [] }
  }

  componentDidMount () {
    this.setState({errors: []})
    window.events.addListener('errors-'.concat(this.props.id), this.handleErrors.bind(this))
  }

  componentWillUnmount () {
    console.log("removing listener")
    window.events.removeListener('errors-'.concat(this.props.id), this.handleErrors.bind(this))
  }

  handleErrors (data) {
    this.setState({errors: data.errors})
    if (this.state.errors.length > 0) {
      setTimeout(function() {
        this.setState({errors: []})
      }.bind(this), 5000)
    }
  }

  render () {
    if (this.state.errors.length == 0) {
        return false
    }
    
    var errorsList = []
    this.state.errors.forEach(function(m, index) {
        errorsList.push(<div key={ index } className='error'>{ m }</div>)
    })

    return (
        <div className='error-explanation' key="error-explanation">
          <div className='error-notice'>{ this.state.errors.length } errors prohibited this type from being saved:</div>
          <div className='errors-list'>{ errorsList }</div>
        </div>
    )
  }
}

Errors.propTypes = {
  id: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
}