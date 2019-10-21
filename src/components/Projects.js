import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchProjectsRequest} from '../redux/actions';

class Projects extends Component {
  componentDidMount = () => {
    this.props.fetchProjectsRequest()
  }

  render() {
    return (
      <div>
        this.props.projects
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects
  }
}

const mapDispatchToProps = dispatch => ({
  fetchProjectsRequest: () => dispatch(fetchProjectsRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
