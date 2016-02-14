class Glyphicon extends React.Component {
    render() {
        if (this.props.type === 'more_subtypes') {
           return (
            <span className='glyphicon glyphicon-menu-hamburger medium-glyph more-subtypes'></span>
            );
        }

        if (this.props.type === 'more_types') {
           return (
                <span className='glyphicon glyphicon-menu-hamburger medium-glyph more-types'></span>
            ); 
        }
        if (this.props.type === 'add_types') {
            return (
                <div className="glyphicon glyphicon-plus-sign medium-glyph" id="add-types"></div>
            );
        }

        if (this.props.type === 'sign_up') {
            return (
                <div id="sign_up">Sign up</div>
            );
        }

        if (this.props.type === 'log_in') {
            return (
                <div id="log_in">Log in</div>
            );
        }
        return false
    }
}

Glyphicon.props = {
    type: React.PropTypes.string
}

module.exports = Glyphicon