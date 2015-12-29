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

class Lightbox extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            html: '', 
            backdropClass: 'backdrop', 
            lightboxClass: 'lightbox'
        }
    }

    exitLightBoxHandler() {
        this.setState({ 
            backdropClass: 'backdrop',
            lightboxClass: 'lightbox' 
        })
    }

    updateView(data) {
        this.setState({ 
            html: data.html, 
            backdropClass: 'backdrop-active', 
            lightboxClass: 'lightbox-active' 
        })
    }


    componentDidMount() {
        window.events.addListener('lightbox-update', this.updateView.bind(this))
        window.events.addListener('lightbox-exit', this.exitLightBoxHandler.bind(this))
    }

    componentWIllUnmount() {
        window.events.removeListener('lightbox-update', this.updateView.bind(this))
        window.events.removeListener('lightbox-exit', this.exitLightBoxHandler.bind(this))
    }

    render() {
        var lightboxClasses = this.state.lightboxClass.concat(' edit-type')
        return (
            <div>
                <div className={this.state.backdropClass}></div>
                <div className={lightboxClasses} dangerouslySetInnerHTML={{__html: this.state.html}}>
                </div>
            </div>
        )
    }
}