  import React, { Component } from 'react';
  import { connect } from 'react-redux';
  import { signInUserRequest } from '../redux/actions';
  import { Form, Button } from 'react-bootstrap';

  class SignIn extends Component {
    state = {
      email: '',
      password: ''
    }

    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSubmit = event => {
      event.preventDefault()
      this.props.signInUserRequest(this.state)
    }

    render() {
      return (
        <Form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          <hr/>
          <span class='error'>
            <ul>
              { this.props.errors ?
                this.props.errors.map((error) => <li>{ error }</li>) :
                ''
              }
            </ul>
          </span>
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

  const mapDispatchToProps = {
    signInUserRequest: signInUserRequest
  }

  export default connect(null, mapDispatchToProps)(SignIn);
