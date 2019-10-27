import React, { Component } from 'react';
import {connect} from 'react-redux';
import { pick, values } from 'lodash';
import CommentItem from './CommentItem';
import { removeTaskRequest, createCommentRequest } from '../redux/actions';
import { Form, Button, InputGroup, FormControl, ListGroup } from 'react-bootstrap';

class TaskItem extends Component {
  state = {
    body: ''
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
    event.preventDefault()
    this.props.removeTaskRequest(this.props.task.id)
  }

  alertClicked = () => {
    alert('You clicked the third ListGroupItem');
  }

  render() {
    console.log(this.props.comments)
    return (
      <ListGroup.Item action>
        <h6>{ this.props.task.name }</h6>
        <a href="#" className="close-task" onClick={this.removeButtonClick}></a>

        <ListGroup>
          { this.props.tasks.map(this.renderComment) }
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
    tasks: values(pick(state.entities.comments, props.task.comments.map(comment => comment.id)))
  }
}

const mapDispatchToProps = {
  removeTaskRequest: removeTaskRequest,
  createCommentRequest: createCommentRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
