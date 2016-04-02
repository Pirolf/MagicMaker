class Header extends React.Component {
	render() {
		const {title} = this.props;
		return (
			<div className="header">
				<div className="container">
					<h3>{title}</h3>
				</div>
			</div>
		);
	}
}

Header.props = {
	title: React.PropTypes.string.isRequired
};

window.Header = Header;
module.exports = Header;