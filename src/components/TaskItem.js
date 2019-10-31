import React, { Component } from 'react';
import {connect} from 'react-redux';
import { pick, values, map } from 'lodash';
import CommentItem from './CommentItem';
import { removeTaskRequest, createCommentRequest, updateTaskRequest } from '../redux/actions';
import { Form, Button, InputGroup, FormControl, ListGroup } from 'react-bootstrap';

class TaskItem extends Component {
  state = {
    body: '',
    show: true
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.createCommentRequest(this.state, this.props.task.id)
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
    let task_id = this.props.task.id
    let input = document.getElementById('taskNameInput' + task_id)
    let name_span = document.getElementById('taskName' + task_id)
    document.getElementById('taskHeader' + task_id).style.display = 'none'
    input.style.display = 'inline'
    input.value = this.props.task.name
    name_span.append(input)
  }

  updateTaskName = event => {
    if (event.key === 'Enter') {
      let task_id = this.props.task.id
      let task = { name: event.target.value }
      this.props.updateTaskRequest(task, task_id)
      event.target.style.display = 'none'
      document.getElementById('taskHeader' + task_id).style.display = 'inline'
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
          <h6
            id={ 'taskHeader' + this.props.task.id }
            className={ this.props.task.done ? "done" : '' }>
            { this.props.task.name }
          </h6>
        </span>
        <input
          id={ 'taskNameInput' + this.props.task.id }
          className= 'taskNameInput'
          onKeyDown={this.updateTaskName} />
        <a href="#" onClick={this.editButtonClick}>Edit</a>
        <a href="#" className="close-task" onClick={this.removeButtonClick} />

        <ListGroup>
          { this.props.comments.map(this.renderComment) }
        </ListGroup>

        <Form onSubmit={this.handleSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                name='body'
                placeholder="Comment's name"
                aria-label="Comment's name"
                aria-describedby="basic-addon2"
                value={this.state.body}
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
