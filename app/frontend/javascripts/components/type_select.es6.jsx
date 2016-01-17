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

module.exports = TypeSelect