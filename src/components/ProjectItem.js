import React, { Component } from 'react';
import {connect} from 'react-redux';
import { pick, values, map } from 'lodash';
import TaskItem from './TaskItem';
import { createTaskRequest, removeProjectRequest, updateProjectRequest } from '../redux/actions';
import { Form, Button, InputGroup, FormControl, ListGroup } from 'react-bootstrap';

export class ProjectItem extends Component {
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

  editButtonClick = event => {
    let project_id = this.props.project.id
    let project_input = document.getElementById('projectNameInput' + project_id)
    let name_span = document.getElementById('projectName' + project_id)
    document.getElementById('projectHeader' + project_id).style.display = 'none'
    project_input.style.display = 'inline'
    project_input.value = this.props.project.name
    name_span.append(project_input)
  }

  updateProjectName = event => {
    if (event.key === 'Enter') {
      let project_id = this.props.project.id
      let project = { name: event.target.value }
      this.props.updateProjectRequest(project, project_id)
      event.target.style.display = 'none'
      document.getElementById('projectHeader' + project_id).style.display = 'inline'
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
          <h3 id={'projectHeader' + this.props.project.id }>
            { this.props.project.name }
          </h3>
        </span>
        <input
          id={ 'projectNameInput' + this.props.project.id}
          className='projectNameInput'
          onKeyDown={this.updateProjectName} />
        <a href="#" onClick={this.editButtonClick}>Edit</a>
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
  removeProjectRequest: removeProjectRequest,
  updateProjectRequest: updateProjectRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectItem);
