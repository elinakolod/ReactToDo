//import axios from 'axios';

//class SignIn extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     headers: []
  //   }
  // }

  // getTasks() {
  //   let params = {
  //     email: 'test10@i.ua',
  //     password: 'BoraBora1',
  //     password_confirmation: 'BoraBora1'
  //   }

  //   axios.post('/auth', params)
  //   .then(response => {
  //     this.setState({headers: response.headers})
  //   })
  //   .catch(error => console.log(error))
  // }

  // componentDidMount() {
  //   this.getTasks()
  // }

  import React, {Component} from 'react';
  import {connect} from 'react-redux';
  import {signInUserRequest} from '../redux/actions';

  class SignIn extends Component {
    state = {
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
      this.props.signInUserRequest(this.state)
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <h1>Login</h1>

          <label>Email</label>
          <input
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

  const mapDispatchToProps = {
    signInUserRequest: signInUserRequest
  }

  export default connect(null, mapDispatchToProps)(SignIn);
