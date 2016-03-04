const {Happens} = require('./shared.es6.jsx');
class CardTypeSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = { type: this.props.type, subtype: this.props.subtype }
    }
    
    updateDisplayedType(data) {
        this.setState({ type: data.type_name, subtype: '' })
    }

    updateDisplayedSubtype(data) {
        this.setState({ subtype: data.subtype_name })
    }

    removeSubtype() {
        this.setState({subtype: null});
    }

    componentDidMount() {
        window.events.addListener('type-selection-changed', this.updateDisplayedType.bind(this));
        window.events.addListener('subtype-selection-changed', this.updateDisplayedSubtype.bind(this));
        window.events.addListener('remove-subtype', this.removeSubtype.bind(this));
    }

    componentWillUnmount() {
        window.events.removeListener('type-selection-changed', this.updateDisplayedType.bind(this));
        window.events.removeListener('subtype-selection-changed', this.updateDisplayedSubtype.bind(this));
        window.events.removeListener('remove-subtype', this.removeSubtype.bind(this));
    }

    render() {
        var hyphen;
        if (_.isString(this.state.subtype) && this.state.subtype !== '') {
            hyphen = '-';
        }

        return (
            <div className="type_name_text type_subtype">
                <span id="type_text">{ this.state.type }</span>
                <span id="hyphen">
                    { hyphen }
                </span>
                <span id="subtype_text">{ this.state.subtype }</span>
            </div>
        )
    }
}

CardTypeSection.props = {
    type: React.PropTypes.string,
    subtype: React.PropTypes.string
}

window.CardTypeSection = CardTypeSection;