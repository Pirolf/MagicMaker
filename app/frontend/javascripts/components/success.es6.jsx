class Success extends React.Component {
    constructor () {
        super()
        this.state = {itemName: null, timer: null}
    }

    componentDidMount () {
        const {id, type} = this.props
        window.events.addListener(`success-${type}-${id}`, this.handleSuccess.bind(this))
    }

    componentWillUnmount () {
        const {id, type} = this.props
        window.events.removeListener(`success-${type}-${id}`, this.handleSuccess.bind(this))
    }

    handleSuccess (data) {
        const {itemName} = data
        const {timer} = this.state
        this.setState({itemName}, () => {
            if (itemName === null) return
            clearTimeout(timer)
            this.setState({
                timer: setTimeout(() => {this.setState({itemName: null})}, 5000).bind(this)
            })
        })
        
    }

    render () {
        if (this.state.itemName === null) return false
        return (
            <div className='success-msg'>
                <img src='/images/preloader_update.gif' />
            </div>
        )
    }
}

Success.propTypes = {
  id: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
    ]),
  type: React.PropTypes.string
}
module.exports = Success
