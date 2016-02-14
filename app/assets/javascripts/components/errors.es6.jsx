const {Happens} = require('../components.js');

class Errors extends React.Component {
  constructor () {
    super()
    this.state = { errors: [], timer: null }
  }

  componentDidMount () {
    this.setState({errors: []})
    const {id, type} = this.props
    Happens.on(`errors-${type}-${id}`, this.handleErrors.bind(this))
  }

  componentWillUnmount () {
    const {id, type} = this.props
    Happens.off(`errors-${type}-${id}`, this.handleErrors.bind(this))
  }

  handleErrors (data) {
    this.setState({ errors: data.errors }, () => {
      const {errors, timer} = this.state
      if (errors.length === 0)return
      clearTimeout(timer)
      this.setState({
        timer: setTimeout(() => {this.setState({errors: []})}, 5000)
      })
    })
  }

  render () {
    const {errors} = this.state
    if (errors.length == 0) {
        return false
    }
    
    const errorsList = errors.map((m, i) => {
        return (<div key={i} className='error'>{m}</div>)
    })

    return (
        <div className='error-explanation' key="error-explanation">
          <div className='error-notice'>{errors.length} errors prohibited this type from being saved:</div>
          <div className='errors-list'>{errorsList}</div>
        </div>
    )
  }
}

Errors.propTypes = {
  id: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
    ]),
  type: React.PropTypes.string
}

module.exports = Errors
window.Errors = Errors