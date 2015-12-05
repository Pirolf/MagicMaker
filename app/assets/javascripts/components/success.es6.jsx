class Success extends React.Component {
    constructor () {
        super()
        this.state = { itemName: null }
    }

    componentDidMount () {
        window.events.addListener('success-'.concat(this.props.id), this.handleSuccess.bind(this))
    }

    componentWillUnmount () {
        window.events.removeListener('errors-'.concat(this.props.id), this.handleSuccess.bind(this))
    }

    handleSuccess (data) {
        this.setState({itemName: data.itemName})
        /*
        if (this.state.itemName !== null) {
          setTimeout(function() {
            this.setState({itemName: null})
          }.bind(this), 5000)
        }
        */
    }

    render () {
        if (this.state.itemName === null) {
            return false
        }

        return (
            <div className='success-msg'>
                Successfully updated {this.state.itemName}!
            </div>
        )
    }
}

Success.propTypes = {
  id: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
}
