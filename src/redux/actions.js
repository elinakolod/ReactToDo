import axios from 'axios'
import history from './history'
import normalize from 'jsonapi-normalizer'
import { Binding } from '@babel/traverse'

const headers = {
  'Content-Type': 'application/json',
  'X-CSRF-Token': localStorage.token
}

export const signUpUserRequest = user => {
  return dispatch => {
    axios.post('http://localhost:3000/api/v1/signups', user)
    .then(response => {
      localStorage.setItem("token", response.data.csrf)
      dispatch(loginUser(user))
      history.push('/projects')
    })
    .catch(error => console.log(error))
  }
}

export const signInUserRequest = user => {
  return dispatch => {
    axios.post('http://localhost:3000/api/v1/signins', user, { withCredentials: true })
    .then(response => {
      localStorage.setItem("token", response.data.csrf)
      dispatch(loginUser(user))
      history.push('/projects')
    })
    .catch(error => console.log(error))
  }
}

export const logoutUserRequest = () => {
  return dispatch => {
    localStorage.removeItem('token')
    dispatch(logoutUser())
    history.push('/signin')
  }
}

export const fetchProjectsRequest = () => {
  return dispatch => {
    axios.get('http://localhost:3000/api/v1/projects',
    { withCredentials: true })
    .then(response => {
      dispatch(projectsRequestSuccess(normalize(response.data)))
    })
    .catch(error => console.log(error))
  }
}

const loginUser = userObj => ({
  type: 'LOGIN_USER',
  payload: userObj
})

const logoutUser = () => ({
  type: 'LOGOUT_USER'
})

const projectsRequestSuccess = projectsArray => ({
  type: 'FETCH_PROJECTS',
  payload: projectsArray
})
