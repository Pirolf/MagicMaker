class LightboxLink extends React.Component {
    constructor(props) {
        super(props)
    }
    requestHtml() {
        $.ajax({
            method: "GET",
            url: this.props.url,
            dataType: 'html'
        }).done(function(html) {
            //emit event to lightbox
            window.events.emit('lightbox-update', { html: html })
            ReactRailsUJS.mountComponents()
            window.events.emit('bind-exit-lightbox-btn')
        })
    }
    render() {
        return (
            <div onClick={ this.requestHtml.bind(this) }>
                <Glyphicon type={ this.props.link_type } />
            </div>
        )
    }
}

LightboxLink.props = {
    url: React.PropTypes.string,
    link_type: React.PropTypes.string
}

class Glyphicon extends React.Component {
    render() {
        if (this.props.type === 'more_subtypes') {
           return (
            <span className='glyphicon glyphicon-menu-hamburger medium-glyph more-subtypes'></span>
            ) 
        }

        if (this.props.type === 'add_types') {
            return (
                <div className="glyphicon glyphicon-plus-sign medium-glyph" id="add-types"></div>
            )
        }
        return false
    }
}

Glyphicon.props = {
    type: React.PropTypes.string
}
