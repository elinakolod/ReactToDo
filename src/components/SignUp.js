import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signUpUserRequest} from '../redux/actions';

class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.signUpUserRequest(this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Sign Up For An Account</h1>

        <label>First Name</label>
        <input
          name='firstName'
          placeholder='first name'
          value={this.state.firstName}
          onChange={this.handleChange}
          /><br/>

        <label>Last Name</label>
        <input
          name='lastName'
          placeholder='last name'
          value={this.state.lastName}
          onChange={this.handleChange}
          /><br/>

        <label>Email</label>
        <textarea
          name='email'
          placeholder='email'
          value={this.state.email}
          onChange={this.handleChange}
          /><br/>

        <label>Password</label>
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={this.state.password}
          onChange={this.handleChange}
          /><br/>

        <input type='submit'/>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signUpUserRequest: userInfo => dispatch(signUpUserRequest(userInfo))
})

export default connect(null, mapDispatchToProps)(Signup);
