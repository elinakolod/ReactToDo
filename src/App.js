import React, { Component } from 'react';
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Projects from './components/Projects';
import history from './redux/history';
import {connect} from 'react-redux';
import {logoutUserRequest} from './redux/actions';
import {
  Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

export class App extends Component {
  state = {
    showLogoutButton: false
  }

  componentDidMount(){
    if (!!localStorage.getItem('token')){
      this.setState({showLogoutButton: true})
    }
}

  handleClick = event => {
    this.props.logoutUserRequest()
  }

  render() {
    return (
      <Router history={history}>
        <div>
          {
            this.state.showLogoutButton
            ? <button onClick={this.handleClick}>Log Out</button>
            : null
          }
          <Switch>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <PrivateRoute path="/">
              <Projects />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    );
  }
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
      localStorage.getItem('token') ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const mapDispatchToProps = {
  logoutUserRequest: logoutUserRequest
}


export default connect(null, mapDispatchToProps)(App);
