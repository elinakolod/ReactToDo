import React, { Component } from 'react';
import {connect} from 'react-redux';
import { pick, values } from 'lodash';
import CommentItem from './CommentItem';
import { removeTaskRequest, createCommentRequest, updateTaskRequest } from '../redux/actions';
import { Form, Button, InputGroup, FormControl, ListGroup } from 'react-bootstrap';

class TaskItem extends Component {
  state = {
    new_comment_body: '',
    name: this.props.task.name,
    editFormVisible: false
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.createCommentRequest({ body: this.state.new_comment_body }, this.props.task.id)
    this.setState({new_task_name: ''})
  }

  renderComment(comment) {
    return (
      <CommentItem comment={comment} key={comment.id}/>
    )
  }

  removeButtonClick = event => {
    this.props.removeTaskRequest(this.props.task.project_id, this.props.task.id)
  }

  checkTask = event => {
    let task = { done: event.target.checked }
    this.props.updateTaskRequest(task, this.props.task.id)
  }

  editButtonClick = event => {
    this.setState({editFormVisible: true})
  }

  updateTaskName = event => {
    if (event.key === 'Enter') {
      let task_id = this.props.task.id
      let task = { name: event.target.value }
      this.props.updateTaskRequest(task, task_id)
      this.setState({editFormVisible: false})
    }
  }

  render() {
    return (
      <ListGroup.Item action>
        <input
          type="checkbox"
          defaultChecked={this.props.task.done}
          onChange={this.checkTask} />
        <span id={ 'taskName' + this.props.task.id }>
          { !this.state.editFormVisible ?
            <h6
              id={ 'taskHeader' + this.props.task.id }
              className={ this.props.task.done ? "done" : '' }>
              { this.props.task.name }
            </h6> : <Form.Control
                      id={ 'taskNameInput' + this.props.task.id }
                      value={ this.state.name }
                      name='name'
                      onKeyDown={this.updateTaskName}
                      onChange={this.handleChange} />
          }
        </span>
        <a href="#" onClick={this.editButtonClick}>Edit</a>
        <a href="#" className="close-task" onClick={this.removeButtonClick} />

        <ListGroup>
          { this.props.comments.map(this.renderComment) }
        </ListGroup>

        <Form onSubmit={this.handleSubmit} id='comment-form'>
            <InputGroup className="mb-3">
              <FormControl
                name='new_comment_body'
                placeholder="Comment's name"
                aria-label="Comment's name"
                aria-describedby="basic-addon2"
                value={this.state.new_comment_body}
                onChange={this.handleChange}
              />
              <InputGroup.Append>
                <Button variant="primary" type="submit">Add Comment</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
      </ListGroup.Item>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    comments: values(pick(state.entities.comments, props.task.comments.map(comment => comment.id)))
  }
}

const mapDispatchToProps = {
  removeTaskRequest: removeTaskRequest,
  createCommentRequest: createCommentRequest,
  updateTaskRequest: updateTaskRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
