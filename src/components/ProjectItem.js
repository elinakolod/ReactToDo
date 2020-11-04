import React, { Component } from 'react';
import {connect} from 'react-redux';
import { pick, values } from 'lodash';
import TaskItem from './TaskItem';
import { createTaskRequest, removeProjectRequest, updateProjectRequest } from '../redux/actions';
import { Form, Button, InputGroup, FormControl, ListGroup } from 'react-bootstrap';

class ProjectItem extends Component {
  state = {
    new_task_name: '',
    name: this.props.project.name,
    editFormVisible: false
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.createTaskRequest({ name: this.state.new_task_name }, this.props.project.id)
    this.setState({new_task_name: ''})
  }

  removeButtonClick = event => {
    event.preventDefault()
    this.props.removeProjectRequest(this.props.project.id)
  }

  editButtonClick = event => {
    this.setState({editFormVisible: true})
  }

  updateProjectName = event => {
    if (event.key === 'Enter') {
      let project_id = this.props.project.id
      let project = { name: event.target.value }
      this.props.updateProjectRequest(project, project_id)
      this.setState({editFormVisible: false})
    }
  }

  renderTask(task) {
    return (
      <TaskItem task={task} key={task.id}/>
    )
  }

  render() {
    return (
      <div>
        <span id={ 'projectName' + this.props.project.id }>
          { !this.state.editFormVisible ?
            <h3 id={'projectHeader' + this.props.project.id }>
              { this.props.project.name }
            </h3> : <Form.Control
                      id={ 'projectNameInput' + this.props.project.id}
                      name='name'
                      value={ this.state.name }
                      onKeyDown={this.updateProjectName}
                      onChange={this.handleChange} />
          }
        </span>
        <a href="#" onClick={this.editButtonClick}>Edit</a>
        <Button variant="outline-danger" onClick={this.removeButtonClick}>Remove</Button>
        <div style={{paddingTop: '10px'}}>
          <span class='error'>{ this.props.errors }</span>
          <Form onSubmit={this.handleSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                name='new_task_name'
                placeholder="Task's name"
                aria-label="Task's name"
                aria-describedby="basic-addon2"
                value={this.state.new_task_name}
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
    tasks: values(pick(state.entities.tasks, props.project.tasks.map(task => task.id))),
    errors: state.entities.errors?.name
  }
}

const mapDispatchToProps = {
  createTaskRequest: createTaskRequest,
  removeProjectRequest: removeProjectRequest,
  updateProjectRequest: updateProjectRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectItem);
