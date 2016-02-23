const update = require('react-addons-update');
class SubtypeSelect extends React.Component {
    constructor(props) {
        super(props);
        const {subtypes, selected} = this.props;
        this.state = { subtypes, selected };
    }

    changeSubtype(data) {
        const type_id = data.type_id;
        $.ajax({
            url: '/types/subtypes.json',
            method: 'GET',
            dataType: 'json',
            data: { id: type_id },
            success: function(data) {
                var subtypes = []
                data.forEach(function(subtype) {
                    subtypes.push({ id: subtype.id, name: subtype.name, type_id: subtype.type_id })
                })
                this.setState({ subtypes: subtypes })
            }.bind(this)
        })
    }

    updateSubtypes(data) {
        const {subtypes} = this.state;
        if (subtypes.length === 0) return;
        if (subtypes[0].type_id !== data.type_id) return;
        const index = subtypes.findIndex((s) => {
            return s.id === data.id;
        });
        this.setState({subtypes: update(subtypes, {[index]: {$set: data}})});
    }

    subtypeSelectionChangeHandler(e) {
        this.setState({selected: {id: e.target.value}});
        window.events.emit('subtype-selection-changed', { subtype_name: e.target.selectedOptions[0].text })
    }

    addSubtype(data) {
        const {subtypes} = this.state;
        this.setState({
            subtypes: update(subtypes, {$push: [data.subtype]}),
            selected: data.subtype
        });
        window.events.emit('subtype-selection-changed', { subtype_name: data.subtype.name })
    }

    componentDidMount() {
        window.events.addListener('type-selection-changed', this.changeSubtype.bind(this));
        window.events.addListener('subtypes-updated', this.updateSubtypes.bind(this));
        window.events.addListener('subtype-created', this.addSubtype.bind(this));
    }

    componentWillUnmount() {
        window.events.removeListener('type-selection-changed', this.changeSubtype.bind(this));
        window.events.removeListener('subtypes-updated', this.updateSubtypes.bind(this));
        window.events.removeListener('subtype-created', this.addSubtype.bind(this));
    }

    render() {
        var options = [];
        options.push(<option key='blank_subtype'></option>);
 
        this.state.subtypes.forEach(function(s, index) {
            options.push(<option key={index} value={s.id}>{s.name}</option>)
        });

        const {selected} = this.state;
        var selectedId;
        if (selected !== null && selected !== undefined) selectedId = selected.id;

        return (
            <select className="form-control" value={selectedId} onChange={this.subtypeSelectionChangeHandler.bind(this)} id="card_subtype" name="card[subtype_id]">
                {options}
            </select>
        )
    }
}

SubtypeSelect.props = {
    subtypes: React.PropTypes.array,
    selected: React.PropTypes.object
}

window.SubtypeSelect = SubtypeSelect;