import React, { Component } from 'react';
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Projects from './components/Projects';
import history from './redux/history';
import {connect} from 'react-redux';
import {logoutUserRequest} from './redux/actions';
import { Container, Col, Row, Button } from 'react-bootstrap';
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
        <Container style={{marginTop: '50px', width: '100%'}}>
          <Row>
            <Col xs lg="3"/>
            <Col md="auto" style={{backgroundColor: 'white', padding: '30px', borderRadius: '10px'}}>             <div>
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
            </Col>
            <Col xs lg="3">
              {
                this.state.showLogoutButton
                ? <Button variant="primary" type="submit" onClick={this.handleClick}>Log Out</Button>
                : null
              }
            </Col>
          </Row>
        </Container>
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
