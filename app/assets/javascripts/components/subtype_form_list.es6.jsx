class SubtypeFormList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { subtypes: this.props.subtypes }
    }

    addNewSubtypeToList(data) {
        var subtypes = this.state.subtypes
        subtypes.push(data.subtype)
        this.setState({ subtypes: subtypes })
    }

    componentDidMount() {
        window.events.addListener('subtype-created', this.addNewSubtypeToList.bind(this))
    }

    componentWillUnmount() {
        window.events.removeListener('subtype-created', this.addNewSubtypeToList.bind(this))
    }

    render() {
        var subtypeList = []
        var auth_token = this.props.auth_token
        this.state.subtypes.forEach(function(s) {
            var id = s.id
            var name = s.name
            var key = "subtype-container-" + id
            subtypeList.push(
                <div key={key}>
                    <Success id={id} type="subtype"/>
                    <Errors id={id} type="subtype"/>
                    <div className="row">
                        <SubtypeForm name={name} record_id={id} auth_token={auth_token}/>
                    </div>
                </div>
            )
        })

        return (
            <div>
                {subtypeList}
            </div>
        )
    }
}

SubtypeFormList.props = {
    subtypes: React.PropTypes.array,
    auth_token: React.PropTypes.string
}