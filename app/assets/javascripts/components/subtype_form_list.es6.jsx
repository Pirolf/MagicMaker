const Errors = require('./errors.es6.jsx')
const SubtypeForm = require('./subtype_form.es6.jsx')

class SubtypeFormList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {subtypes: this.props.subtypes}
    }

    addNewSubtypeToList(data) {
        let subtypes = this.state.subtypes.concat(data.subtype)
        this.setState({subtypes})
    }

    componentDidMount() {
        window.events.addListener('subtype-created', this.addNewSubtypeToList.bind(this))
    }

    componentWillUnmount() {
        window.events.removeListener('subtype-created', this.addNewSubtypeToList.bind(this))
    }

    render() {
        const {auth_token} = this.props
        let subtypeList = this.state.subtypes.map((s) => {
            const {id, name} = s
            return(
                <div key={id}>
                    <Errors {...{id}} type="subtype"/>
                    <div className="row">
                        <SubtypeForm {...{name, auth_token}} record_id={id} />
                    </div>
                </div>
            )
        })

        return (<div>{subtypeList}</div>)
    }
}

SubtypeFormList.props = {
    subtypes: React.PropTypes.array,
    auth_token: React.PropTypes.string
}

window.SubtypeFormList = SubtypeFormList