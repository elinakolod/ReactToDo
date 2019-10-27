import React, { Component } from 'react';
import {connect} from 'react-redux';
import { pick, values } from 'lodash';
import TaskItem from './TaskItem';
import { createTaskRequest, removeProjectRequest } from '../redux/actions';
import { Form, Button, InputGroup, FormControl, ListGroup } from 'react-bootstrap';

class ProjectItem extends Component {
  state = {
    name: ''
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.createTaskRequest(this.state, this.props.project.id)
  }

  removeButtonClick = event => {
    event.preventDefault()
    this.props.removeProjectRequest(this.props.project.id)
  }

  renderTask(task) {
    return (
      <TaskItem task={task} key={task.id}/>
    )
  }

  render() {
    console.log(this.props.tasks)
    return (
      <div>
        <h3>{ this.props.project.name }</h3>
        <Button variant="outline-danger" onClick={this.removeButtonClick}>Remove</Button>
        <div style={{paddingTop: '10px'}}>
          <Form onSubmit={this.handleSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                name='name'
                placeholder="Task's name"
                aria-label="Task's name"
                aria-describedby="basic-addon2"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <InputGroup.Append>
                <Button variant="primary" type="submit">Add Task</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>

          <ListGroup>
            { this.props.tasks.map(this.renderTask) }
          </ListGroup>
        </div>
        <br/>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    tasks: values(pick(state.entities.tasks, props.project.tasks.map(task => task.id)))
  }
}

const mapDispatchToProps = {
  createTaskRequest: createTaskRequest,
  removeProjectRequest: removeProjectRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectItem);
