import React, { Component } from 'react';
import {connect} from 'react-redux';
import { pick, values } from 'lodash';
import TaskItem from './TaskItem';
import {createTaskRequest} from '../redux/actions';

class ProjectItem extends Component {
  state = {
    taskName: ''
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

  renderTask(task) {
    return (
      <TaskItem task={task} key={task.id}/>
    )
  }

  render() {
    console.log(this.props.tasks)
    return (
      <div>
        <h4>{ this.props.project.name }</h4>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              name='taskName'
              placeholder='Task name'
              value={this.state.taskName}
              onChange={this.handleChange}
              />
            <input type='submit'/>
          </form>
          { this.props.tasks.map(this.renderTask) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    tasks: values(pick(state.entities.tasks, props.project.tasks.map(task => task.id))),
    task: state.task
  }
}

const mapDispatchToProps = {
  createTaskRequest: createTaskRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectItem);
