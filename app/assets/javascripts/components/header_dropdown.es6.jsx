const PureRenderMixin = require('react-addons-pure-render-mixin');
const ReactMixin = require('react-mixin');

class HeaderDropdown extends React.Component {
  	static propTypes = {
  		title: React.PropTypes.string.isRequired
  	};

	render() {
		const {title} = this.props;
		return (
			<div className="action-bar">
				<h3 className="subtitle">>></h3>
				<div className="action-picker">
					<h3 className="subtitle">{title}</h3>
				</div>
				<div className="action-dropdown btn btn-primary">
					<i className="glyphicon glyphicon-triangle-bottom" />
				</div>
			</div>
		);
	}
}

ReactMixin(HeaderDropdown.prototype, PureRenderMixin);
module.exports = HeaderDropdown;