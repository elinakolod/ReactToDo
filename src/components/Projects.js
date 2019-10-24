import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchProjectsRequest } from '../redux/actions';
import ProjectItem from './ProjectItem';
import {createProjectRequest} from '../redux/actions';

class Projects extends Component {
  componentDidMount = () => {
    this.props.fetchProjectsRequest()
  }

  state = {
    projectName: ''
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.createProjectRequest(this.state)
  }

  renderProject(project) {
    return (
      <ProjectItem project={project} key={project.id}/>
    )
  }

  render() {
    return (
      <div>
        <h2>Projects</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            name='projectName'
            placeholder='Project name'
            value={this.state.projectName}
            onChange={this.handleChange}
            />
          <input type='submit'/>
        </form>
        <hr/>
        <div>
          { this.props.projects.map(this.renderProject) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: Object.values(state.entities.projects),
    project: state.project
  }
}

const mapDispatchToProps = {
  fetchProjectsRequest: fetchProjectsRequest,
  createProjectRequest: createProjectRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
