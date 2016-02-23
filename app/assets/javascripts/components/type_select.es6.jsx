class TypeSelect extends React.Component {
    constructor(props) {
        super(props);
        const {types, selected} = this.props;
        this.state = {types, selected};
    }

    typeChangeHandler(e) {
        this.setState({selected: {id: e.target.value}});
        window.events.emit('type-selection-changed', { type_id: e.target.value, type_name: e.target.selectedOptions[0].text });
    }

    handleNewSubtype(data) {
        const {types} = this.props;
        const {selected: currentSelected} = this.props;
        if (currentSelected.id === data.subtype.type_id) return;
        const selected = types.find((t) => { return t.id === data.subtype.type_id});
        this.setState({selected});

        window.events.emit('type-selection-changed', { 
            type_id: selected.id, 
            type_name: selected.name 
        });
    }

    componentDidMount() {
        window.events.addListener('subtype-created', this.handleNewSubtype.bind(this));
    }

    componentWillUnmount() {
        window.events.removeListener('subtypes-created', this.handleNewSubtype.bind(this));
    }

    render() {
        var options = []
        options.push(<option key='blank_type'></option>)
        this.state.types.forEach(function(t, index) {
            options.push(<option key={index} value={t.id}>{t.name}</option>)
        });

        const {selected} = this.state;
        var selectedId;
        if (selected !== null && selected !== undefined) selectedId = selected.id;

        return (
            <select className="form-control" value={selectedId} onChange={this.typeChangeHandler.bind(this)} id="card_type" name="card[type_id]">
                {options}
            </select>
        )
    }
}

TypeSelect.props = {
    types: React.PropTypes.array,
    selected: React.PropTypes.object
}