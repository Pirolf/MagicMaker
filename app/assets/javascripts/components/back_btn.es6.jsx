const LightboxLink = require('./lightbox_link.es6.jsx')
class BackBtn extends LightboxLink {
    render() {
        return (
            <div className="btn btn-primary">
                <div className="types-back" onClick={this.requestHtml.bind(this)}>Back</div>
            </div>
        )
    }
}

BackBtn.props = {
    url: React.PropTypes.string
}
module.exports = BackBtn
window.BackBtn = BackBtn