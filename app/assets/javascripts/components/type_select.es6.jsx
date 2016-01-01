class TypeSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = { types: this.props.types }
    }

    typeChangeHandler(e) {
        //emit subtype change event
        window.events.emit('type-selection-changed', { type_id: e.target.value, type_name: e.target.selectedOptions[0].text })
    }

    render() {
        var options = []
        options.push(<option key='blank_type'></option>)
        this.state.types.forEach(function(t, index) {
            options.push(<option key={index} value={t.id}>{t.name}</option>)
        })

        var selectedType
        if (!_.isNull(this.props.selected)){
            selectedType = _.find(this.props.types, function(type) {
                return type.id === this.props.selected.id
            }, this)
        }

        var selectedId
        if (selectedType){
            selectedId = selectedType.id
        }
        return (
            <select className="form-control" defaultValue={selectedId} onChange={this.typeChangeHandler.bind(this)} id="card_type" name="card[type_id]">
                {options}
            </select>
        )
    }
}

TypeSelect.props = {
    types: React.PropTypes.array,
    selected: React.PropTypes.object
}

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
                console.log(data)
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