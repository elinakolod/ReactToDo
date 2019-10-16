import React, { Component } from 'react';
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Projects from './components/Projects';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

export class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <AuthButton />
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

function AuthButton() {
  return localStorage.getItem('token') ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          localStorage.removeItem('token');
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
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

export default App;
