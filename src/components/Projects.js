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
        projects
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchProjectsRequest: () => dispatch(fetchProjectsRequest())
})

export default connect(null, mapDispatchToProps)(Projects);
