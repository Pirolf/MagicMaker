const LightboxLink = require('./lightbox_link.es6.jsx');
const types = React.PropTypes;

class Auth extends React.Component {
	static propTypes = {
		authorized: types.bool.isRequired
	};

	render() {
		const {authorized} = this.props;
		if (authorized) return (<a rel="nofollow" data-method="delete" href="/users/sign_out">Log out</a>);
		return (
			<div>
				<LightboxLink {...{url: '/users/sign_in', link_type: 'log_in'}} />
				<LightboxLink {...{url: '/users/sign_up', link_type: 'sign_up'}} />
			</div>
		);
	}
}

module.exports = Auth;
window.Auth = Auth;