const {Happens} = require('./shared.es6.jsx');
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

    componentWillUnmount() {
        window.events.removeListener('lightbox-update', this.updateView.bind(this))
        window.events.removeListener('lightbox-exit', this.exitLightBoxHandler.bind(this))
    }

    click() {
        window.events.emit('lightbox-exit');
    }

    render() {
        return (
            <div>
                <div onClick={this.click} className={this.state.backdropClass}></div>
                <div className={this.state.lightboxClass} dangerouslySetInnerHTML={{__html: this.state.html}}>
                </div>
            </div>
        )
    }
}

module.exports = Lightbox;
window.Lightbox = Lightbox;
