const LightboxLink = require('./lightbox_link.es6.jsx');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const classnames = require('classname');
const types = React.PropTypes;

class Auth extends React.Component {
	constructor(props) {
    	super(props);
    	this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  	}

	static propTypes = {
		authorized: types.bool.isRequired
	};

	render() {
		const {authorized} = this.props;
		if (authorized) {
			return (
				<div className="btn btn-primary">
					<a rel="nofollow" data-method="delete" href="/users/sign_out">Log out</a>
            	</div>
			);
		}
		const className = classnames('btn', 'btn-primary');
		return (
			<div className="auth-container">
				<div className="auth sign-in">
					<LightboxLink {...{url: '/users/sign_in'}}>
						<div {...{className}}>
							Sign in
	            		</div>
					</LightboxLink>
				</div>
				<div className="auth">
					<LightboxLink {...{url: '/users/sign_up'}}>
						<div {...{className}}>
							Sign up
	            		</div>
					</LightboxLink>
				</div>
			</div>
		);
	}
}

module.exports = Auth;