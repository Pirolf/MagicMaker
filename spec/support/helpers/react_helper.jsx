const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const jQuery = require('jquery');

(function($) {
  $.fn.simulate = function(eventName, ...args) {
    if (!this.length) {
      throw new Error(`jQuery Simulate has an empty selection for '${this.selector}'`);
    }
    $.each(this, function() {
      if (['mouseOver', 'mouseOut'].includes(eventName)) {
        TestUtils.SimulateNative[eventName](this, ...args);
      } else {
        TestUtils.Simulate[eventName](this, ...args);
      }
    });
    return this;
  };
})(jQuery);

module.exports = {
  setProps(props, node = root) {
    const Component = this.constructor;
    ReactDOM.render(<Component {...this.props} {...props}/>, node);
  }
};