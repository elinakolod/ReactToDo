import React, { Component } from 'react';
import {connect} from 'react-redux';
import { pick, values } from 'lodash';
import CommentItem from './CommentItem';

class TaskItem extends Component {
    renderComment(comment) {
      return (
        <CommentItem comment={comment} key={comment.id}/>
      )
    }

  render() {
    console.log(this.props.comments)
    return (
      <div>
        <h4>{ this.props.task.name }</h4>
        <ul>
          { this.props.tasks.map(this.renderComment) }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    tasks: values(pick(state.entities.comments, props.task.comments.map(comment => comment.id)))
  }
}

export default connect(mapStateToProps, null)(TaskItem);
