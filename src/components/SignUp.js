import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signUpUserRequest} from '../redux/actions';
import { Form, Button } from 'react-bootstrap';

class Signup extends Component {
  state = {
    first_name: "",
    last_name: "",
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
        <span class='error'>
          <ul>
            { this.props.errors ?
              this.props.errors.map((error) => <li>{ error }</li>) :
              ''
            }
          </ul>
        </span>

        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
              name='first_name'
              value={this.state.first_name}
              onChange={this.handleChange}
              placeholder="First Name" />
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
              name='last_name'
              value={this.state.last_name}
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

const mapStateToProps = (state) => {
  return {
    errors: state.auth.error
  }
}

const mapDispatchToProps = dispatch => ({
  signUpUserRequest: userInfo => dispatch(signUpUserRequest(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
