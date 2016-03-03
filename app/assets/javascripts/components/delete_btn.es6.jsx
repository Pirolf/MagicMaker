const $ = require('jquery');

class DeleteBtn extends React.Component {
  delete() {
    const {auth_token, id, type, url} = this.props;
    $.ajax({
      method: 'DELETE',
      url,
      data: {
          commit: 'delete', 
          utf8: "✓", 
          "authenticity_token": auth_token 
      },
      dataType: 'json'
    })
    .done((data) => {
      window.events.emit(`remove-${type}`, {id});
    });
  }

  render() {
    return (
      <div className="col-sm-1">
          <div className="delete-btn" data-method="delete" onClick={this.delete.bind(this)}>
            <span className="glyphicon glyphicon-remove-sign medium-glyph" />
          </div>
      </div>
    )
  }
}

DeleteBtn.propTypes = {
  url: React.PropTypes.string.isRequired,
  auth_token: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  id: React.PropTypes.number.isRequired
}

module.exports = DeleteBtn