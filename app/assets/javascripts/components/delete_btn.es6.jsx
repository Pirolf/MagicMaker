class DeleteBtn extends React.Component {
  render() {
    var deleteLink = `/subtypes/${this.props.record_id}`
    return (
      <div className="col-sm-1">
          <a data-confirm="Are you sure" className="delete-btn" rel="nofollow" data-method="delete" href={deleteLink} >
            <span className="glyphicon glyphicon-remove-sign medium-glyph" />
          </a>
      </div>
    )
  }
}
DeleteBtn.propTypes = {
  record_id: React.PropTypes.number.isRequired
}