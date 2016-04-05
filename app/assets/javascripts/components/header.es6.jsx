const Auth = require('./auth.es6.jsx');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const types = React.PropTypes;

class Header extends React.Component {
	constructor(props) {
    	super(props);
    	this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  	}

	static props = {
		authorized: types.bool.isRequired,
		title: types.string.isRequired
	}

	render() {
		const {authorized, title} = this.props;
		return (
			<div className="header">
				<div className="container">
					<div className="header-row">
						<h3>{title}</h3>
						<Auth {...{authorized}}/>
					</div>
				</div>
			</div>
		);
	}
}

window.Header = Header;
module.exports = Header;