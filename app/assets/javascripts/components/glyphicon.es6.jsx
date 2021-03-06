class Glyphicon extends React.Component {
    static propTypes = {
        type: React.PropTypes.string
    }

    render() {
        const {type} = this.props;
        switch(type) {
            case 'more_subtypes':
                return (<span className='glyphicon glyphicon-menu-hamburger medium-glyph more-subtypes'></span>);
            case 'more_types':
                return (<span className='glyphicon glyphicon-menu-hamburger medium-glyph more-types'></span> );
            case 'add_types':
                return (<div className="glyphicon glyphicon-plus-sign medium-glyph" id="add-types"></div> );
            case 'edit':
                return (<div className="glyphicon glyphicon-pencil medium-glyph" /> ); 
            case 'delete':
                return (<div className="glyphicon glyphicon-remove-circle medium-glyph" /> ); 
            default: break;
        }
        return null;
    }
}

module.exports = Glyphicon;