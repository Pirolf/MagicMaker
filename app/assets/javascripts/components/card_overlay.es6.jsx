const LightboxLink = require('./lightbox_link.es6.jsx');
const Glyphicon = require('./glyphicon.es6.jsx');

const types = React.PropTypes;

class CardOverlay extends React.Component {
	static propTypes = {
		cardId: types.number.isRequired,
		show: types.bool
	};

	render() {
		const {cardId, show} = this.props;

		return show && (
		    <div className='overlay'>
		    	<a href={`/cards/${cardId}/edit`}>
					<Glyphicon type="edit"/>
				</a>
				<a href={`/cards/${cardId}`} data-method="delete">
					<Glyphicon type="delete"/>
				</a>
		    </div>
	    );
	}
}

module.exports = CardOverlay;
window.CardOverlay = CardOverlay;