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

module.exports = Glyphicon