const ReactDOM = require('react-dom');
const $ = require('jquery');

beforeEach(() => {
	$('body').find('#root').remove().end().append('<div id="root"/>');
});

afterEach(() => {
	ReactDOM.unmountComponentAtNode(root);
});