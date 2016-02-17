const Errors = require('./errors.es6.jsx');
const TypeForm = require('./type_form.es6.jsx');
const LightboxLink = require('./lightbox_link.es6.jsx');

const {Happens} = require('./shared.es6.jsx');

class TypeFormList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {types: this.props.types};
    }

    addNewTypeToList(data) {
        let types = this.state.types.concat(data.type);
        this.setState({types});
    }

    componentDidMount() {
        Happens.on('type-created', this.addNewTypeToList.bind(this));
    }

    componentWillUnmount() {
        Happens.off('type-created', this.addNewTypeToList.bind(this));
    }

    render() {
        const {auth_token} = this.props;
        let typeList = this.state.types.map((t) => {
            const {id, name} = t;
            const lightboxLinkProps = {url: `/types/${id}/edit`, link_type: 'more_types'};
            return(
                <div key={id}>
                    <Errors {...{id}} type="type"/>
                    <div className="row">
                        <div className="col-xs-10">
                            <TypeForm {...{name, auth_token, record_id: id}} />
                        </div>
                        <div className="col-xs-2">
                            <LightboxLink {...lightboxLinkProps} />
                        </div>
                    </div>
                </div>
            )
        });

        return (<div>{typeList}</div>);
    }
}

TypeFormList.props = {
    types: React.PropTypes.array,
    auth_token: React.PropTypes.string
}

module.exports = TypeFormList;
window.TypeFormList = TypeFormList;