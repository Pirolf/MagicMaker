const Glyphicon = require('./glyphicon.es6.jsx')
class LightboxLink extends React.Component {
    static propsTypes = {
        url: React.PropTypes.string.isRequired,
        link_type: React.PropTypes.string
    }

    requestHtml() {
        $.ajax({
            method: "GET",
            url: this.props.url,
            dataType: 'html'
        }).done(function(html) {
            //emit event to lightbox
            window.events.emit('lightbox-update', { html: html });
            ReactRailsUJS.mountComponents();
            window.events.emit('bind-exit-lightbox-btn');
        })
    }
    render() {
        return (
            <div onClick={ this.requestHtml.bind(this) }>
                <Glyphicon type={ this.props.link_type } />
                {this.props.children}
            </div>
        )
    }
}

module.exports = LightboxLink;
window.LightboxLink = LightboxLink;