import React, { Component } from 'react';
import {connect} from 'react-redux';

class CommentItem extends Component {
  render() {
    return (
      <li>
        { this.props.comment.body }
      </li>
    );
  }
}

export default CommentItem;
