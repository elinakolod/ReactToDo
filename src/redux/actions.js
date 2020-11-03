import axios from 'axios'
import history from './history'
import normalize from 'jsonapi-normalizer'

export const signUpUserRequest = user => dispatch => {
  return axios.post('http://localhost:3000/api/v1/signups', user,
  { withCredentials: true })
  .then(response => {
    console.log(response.data)
    localStorage.setItem("token", response.data.csrf)
    dispatch(loginUser(response.data.user))
    history.push('/projects')
  })
  .catch(error => dispatch(loginUserError(error.response.data)))
}

export const signInUserRequest = user => dispatch => {
  return axios.post('http://localhost:3000/api/v1/signins', user,
  { withCredentials: true })
  .then(response => {
    localStorage.setItem("token", response.data.csrf)
    dispatch(loginUser())
    history.push('/projects')
  })
  .catch(error => alert(error))
}

export const logoutUserRequest = () => {
  return dispatch => {
    localStorage.removeItem('token')
    dispatch(logoutUser())
    history.push('/signin')
  }
}

export const fetchProjectsRequest = () => dispatch => {
  return axios.get('http://localhost:3000/api/v1/projects',
  { withCredentials: true })
  .then(response => {
    dispatch(projectsRequestSuccess(normalize(response.data)))
  })
  .catch(error => console.log(error))
}

export const createProjectRequest = (project) => dispatch => {
  return axios('http://localhost:3000/api/v1/projects', {
    method: "post",
    data: project,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': localStorage.token
    }
  })
  .then(response => {
    dispatch(projectCreateRequestSuccess(normalize(response.data)))
  })
  .catch(error => console.log(error))
}

export const removeProjectRequest = (project_id) => dispatch => {
  return axios('http://localhost:3000/api/v1/projects/' + project_id, {
    method: "delete",
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': localStorage.token
    }
  })
  .then(response => {
    dispatch(projectDeleteRequestSuccess(project_id))
  })
  .catch(error => console.log(error))
}

export const updateProjectRequest = (project, project_id) => dispatch => {
  return axios('http://localhost:3000/api/v1/projects/' + project_id, {
    method: "put",
    data: project,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': localStorage.token
    }
  })
  .then(response => {
    dispatch(projectUpdateRequestSuccess(normalize(response.data)))
  })
  .catch(error => console.log(error))
}

export const createTaskRequest = (task, project_id) => dispatch => {
  return axios('http://localhost:3000/api/v1/projects/' + project_id + '/tasks', {
    method: "post",
    data: task,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': localStorage.token
    }
  })
  .then(response => {
    dispatch(taskCreateRequestSuccess(normalize(response.data)))
  })
  .catch(error => console.log(error))
}

export const removeTaskRequest = (project_id, task_id) => dispatch => {
  return axios('http://localhost:3000/api/v1/tasks/' + task_id, {
    method: "delete",
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': localStorage.token
    }
  })
  .then(response => {
    dispatch(taskDeleteRequestSuccess(project_id, task_id))
  })
  .catch(error => console.log(error))
}

export const updateTaskRequest = (task, task_id) => dispatch => {
  return axios('http://localhost:3000/api/v1/tasks/' + task_id, {
    method: "put",
    data: task,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': localStorage.token
    }
  })
  .then(response => {
    dispatch(taskUpdateRequestSuccess(normalize(response.data)))
  })
  .catch(error => console.log(error))
}

export const createCommentRequest = (comment, task_id) => dispatch => {
  return axios('http://localhost:3000/api/v1/tasks/' + task_id + '/comments', {
    method: "post",
    data: comment,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': localStorage.token
    }
  })
  .then(response => {
    dispatch(commentCreateRequestSuccess(normalize(response.data)))
  })
  .catch(error => console.log(error))
}

export const removeCommentRequest = (comment_id, task_id) => dispatch => {
  return axios('http://localhost:3000/api/v1/comments/' + comment_id, {
    method: "delete",
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': localStorage.token
    }
  })
  .then(response => {
    dispatch(commentDeleteRequestSuccess(comment_id, task_id))
  })
  .catch(error => console.log(error))
}

const loginUser = user => ({
  type: 'LOGIN_USER',
  payload: user
})

const loginUserError = errors => ({
  type: 'LOGIN_USER_ERROR',
  payload: errors
})

const logInError = errors => ({
  type: 'LOGIN_USER_ERROR',
  payload: errors
})

const logoutUser = () => ({
  type: 'LOGOUT_USER'
})

const projectsRequestSuccess = projectsArray => ({
  type: 'FETCH_PROJECTS',
  payload: projectsArray
})

const projectCreateRequestSuccess = project => ({
  type: 'CREATE_PROJECT_SUCCESS',
  payload: project
})

const projectUpdateRequestSuccess = project => ({
  type: 'UPDATE_PROJECT_SUCCESS',
  payload: project
})

const projectDeleteRequestSuccess = project_id => ({
  type: 'DELETE_PROJECT_SUCCESS',
  payload: project_id
})

const taskCreateRequestSuccess = task => ({
  type: 'CREATE_TASK_SUCCESS',
  payload: task
})

const taskDeleteRequestSuccess = (project_id, task_id) => ({
  type: 'DELETE_TASK_SUCCESS',
  task_id,
  project_id
})

const taskUpdateRequestSuccess = task => ({
  type: 'UPDATE_TASK_SUCCESS',
  payload: task
})

const commentCreateRequestSuccess = comment => ({
  type: 'CREATE_COMMENT_SUCCESS',
  payload: comment
})

const commentDeleteRequestSuccess = (comment_id, task_id) => ({
  type: 'DELETE_COMMENT_SUCCESS',
  task_id,
  comment_id
})
