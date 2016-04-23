const PureRenderMixin = require('react-addons-pure-render-mixin');
const ReactMixin = require('react-mixin');

class HeaderDropdown extends React.Component {
  	static propTypes = {
  		title: React.PropTypes.string.isRequired
  	};

  	click = () => {

  	};

	render() {
		const {title} = this.props;
		return (
			<div className="action-bar">
				<h3 className="subtitle arrow">>></h3>
				<div className="action-picker">
					<h3 className="subtitle">{title}</h3>
				</div>
				<div>
					<div onClick={this.click} className="action-dropdown btn btn-primary">
						<i className="glyphicon glyphicon-triangle-bottom" />
					</div>
				</div>
			</div>
		);
	}
}

ReactMixin(HeaderDropdown.prototype, PureRenderMixin);
module.exports = HeaderDropdown;