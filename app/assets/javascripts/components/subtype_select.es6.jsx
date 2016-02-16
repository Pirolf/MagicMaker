class SubtypeSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state= { subtypes: this.props.subtypes }
    }

    changeSubtype(data) {
        var type_id = data.type_id
        $.ajax({
            url: '/types/subtypes.json',
            method: 'GET',
            dataType: 'json',
            data: { id: type_id },
            success: function(data) {
                var subtypes = []
                data.forEach(function(subtype) {
                    subtypes.push({ id: subtype.id, name: subtype.name })
                })
                this.setState({ subtypes: subtypes })
            }.bind(this)
        })
    }

    subtypeSelectionChangeHandler(e) {
        window.events.emit('subtype-selection-changed', { subtype_name: e.target.selectedOptions[0].text })
    }

    componentDidMount() {
        window.events.addListener('type-selection-changed', this.changeSubtype.bind(this))
    }

    componentWillUnmount() {
        window.events.removeListener('type-selection-changed', this.changeSubtype.bind(this))
    }

    render() {
        var options = []
        options.push(<option key='blank_subtype'></option>)

        this.state.subtypes.forEach(function(s, index) {
            options.push(<option key={index} value={s.id}>{s.name}</option>)
        })

        var selectedSubtype
        if (!_.isNull(this.props.selected)){
            selectedSubtype = _.find(this.props.subtypes, function(subtype) {
                return subtype.id === this.props.selected.id
            }, this)
        }

        var selectedId
        if (selectedSubtype){
            selectedId = selectedSubtype.id
        }
        return (
            <select className="form-control" defaultValue={selectedId} onChange={this.subtypeSelectionChangeHandler.bind(this)} id="card_subtype" name="card[subtype_id]">
                {options}
            </select>
        )
    }
}

SubtypeSelect.props = {
    subtypes: React.PropTypes.array,
    selected: React.PropTypes.object
}