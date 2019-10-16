import axios from 'axios';


export const signUpUserRequest = user => {
  return dispatch => {
    axios.post('http://localhost:3000/api/v1/signups', user)
    .then(response => {
      localStorage.setItem("token", response.data.csrf)
      dispatch(loginUser(user))
    })
    .catch(error => console.log(error))
  }
}

export const signInUserRequest = user => {
  return dispatch => {
    axios.post('http://localhost:3000/api/v1/signins', user)
    .then(response => {
      localStorage.setItem("token", response.data.csrf)
      dispatch(loginUser(user))
    })
    .catch(error => console.log(error))
  }
}

export const fetchProjectsRequest = () => {
  return dispatch => {
    const token = localStorage.token;
    if (token) {
      return fetch("http://localhost:3000/api/v1/projects", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
            console.log(data.message)
            localStorage.removeItem("token")
          } else {
            dispatch(loginUser(data.user))
          }
        })
    }
  }
}

const loginUser = userObj => ({
  type: 'LOGIN_USER',
  payload: userObj
})
