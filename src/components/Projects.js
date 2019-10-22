import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchProjectsRequest} from '../redux/actions';

class Projects extends Component {
  componentDidMount = () => {
    this.props.fetchProjectsRequest()
  }

  renderProject(project) {
    return (
      <div>
        {project.id}

        </div>
    )
  }

  render() {
    console.log(this.props.projects)
    return (
      <div>
        { this.props.projects.map(this.renderProject) }
      </div>
    );
  }
}

const mapStateToProps = state => {
  debugger
  return {
    projects: Object.values(state.entities.projects)
  }
}

const mapDispatchToProps = dispatch => ({
  fetchProjectsRequest: () => dispatch(fetchProjectsRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
