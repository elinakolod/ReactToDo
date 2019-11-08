import React, { Component } from 'react';
import {connect} from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import { removeCommentRequest } from '../redux/actions';

class CommentItem extends Component {
  removeButtonClick = event => {
    event.preventDefault()
    this.props.removeCommentRequest(this.props.comment.id, this.props.comment.task_id)
  }

  render() {
    return (
      <ListGroup.Item variant="light">
        { this.props.comment.body }
        <a href="#" className="close-comment" onClick={this.removeButtonClick} />
      </ListGroup.Item>
    );
  }
}

const mapDispatchToProps = {
  removeCommentRequest: removeCommentRequest
}

export default connect(null, mapDispatchToProps)(CommentItem);
