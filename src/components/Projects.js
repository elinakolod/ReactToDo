import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchProjectsRequest } from '../redux/actions';
import ProjectItem from './ProjectItem';
import {createProjectRequest} from '../redux/actions';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';

class Projects extends Component {
  componentDidMount = () => {
    this.props.fetchProjectsRequest()
  }

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
    this.props.createProjectRequest(this.state)
    this.setState({name: ''})
  }

  renderProject(project) {
    return (
      <ProjectItem project={project} key={project.id}/>
    )
  }

  render() {
    return (
      <div>
        <h2>Projects for {this.props.userName}</h2>
        <hr/>
        <br/>
        <span class='error'>{ this.props.errors }</span>
        <Form onSubmit={this.handleSubmit} id='project-form'>
          <InputGroup className="mb-3">
            <FormControl
              name='name'
              placeholder="Project's name"
              aria-label="Project's name"
              aria-describedby="basic-addon2"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <InputGroup.Append>
              <Button variant="primary" type="submit">Create Project</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
        <br/>

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
    userName: state.auth.user?.first_name,
    errors: state.entities.errors?.name
  }
}

const mapDispatchToProps = {
  fetchProjectsRequest: fetchProjectsRequest,
  createProjectRequest: createProjectRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
