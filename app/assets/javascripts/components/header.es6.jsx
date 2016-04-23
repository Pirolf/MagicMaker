const Auth = require('./auth.es6.jsx');
const ReactMixin = require('react-mixin');
const AnimationMixin = require('pui-react-animation');
const HeaderDropdown = require('./header_dropdown.es6.jsx');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const types = React.PropTypes;

class Header extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {};
  	}

  	static props = {
		authorized: types.bool.isRequired,
		title: types.string.isRequired
	};

  	updateMessage = ({message}) => {
  		this.setState({message, invisible: false});
  	};

  	animateNotice = (message) => {
  		const duration = 200;
  		const opacity = this.animate('opacity-notice', message ? 1 : 0, duration);
  		if (opacity >= 1) setTimeout(() => {this.setState({invisible: true})}, 2000);
  		return {opacity};
  	};

  	fadeNotice = () => {
  		const duration = 200;
  		const opacity = this.animate('opacity-notice', 0, duration);
  		return {opacity};	
  	};

  	componentDidMount() {
  		window.events.on('action-complete', this.updateMessage);
  	}

  	componentWillUnmount() {
  		window.events.off('action-complete', this.updateMessage);
  	}

	render() {
		const {authorized, title} = this.props;
		const {message, invisible} = this.state;
		const opacity = invisible ? this.fadeNotice() : this.animateNotice(message);

		return (
			<div className="header">
				<div className="container">
					<div className="header-row">
						<h3 className="main-title">Magic Maker</h3>
						<HeaderDropdown {...{title}}/>
						<div style={opacity} className='notice'>{message}</div>
						<div className="gutter" />
						<Auth {...{authorized}}/>
					</div>
				</div>
			</div>
		);
	}
}

ReactMixin(Header.prototype, AnimationMixin);
ReactMixin(Header.prototype, PureRenderMixin);

window.Header = Header;
module.exports = Header;