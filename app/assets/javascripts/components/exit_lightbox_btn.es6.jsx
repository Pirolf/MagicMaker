class ExitLightboxBtn extends React.Component {
    constructor(props) {
        super(props)
    }

    exitLightBoxHandler() {
        window.events.emit('lightbox-exit')
    }
    render() {
        return (
            <div className="btn btn-primary btn-cancel">
                <div className="types-cancel" onClick={this.exitLightBoxHandler.bind(this)}>Cancel</div>
            </div>
        )
    }
}