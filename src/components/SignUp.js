import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signUpUserRequest} from '../redux/actions';
import { Form, Button } from 'react-bootstrap';

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
      <Form onSubmit={this.handleSubmit}>
        <h1>Sign Up For An Account</h1>
        <hr/>

        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
              name='firstName'
              value={this.state.firstName}
              onChange={this.handleChange}
              placeholder="First Name" />
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
              name='lastName'
              value={this.state.lastName}
              onChange={this.handleChange}
              placeholder="Last Name" />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name='email'
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signUpUserRequest: userInfo => dispatch(signUpUserRequest(userInfo))
})

export default connect(null, mapDispatchToProps)(Signup);
