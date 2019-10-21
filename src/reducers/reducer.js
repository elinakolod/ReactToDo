import { combineReducers } from 'redux'

const initialState = {
  login: !!localStorage.getItem('token'),
  projects: {}
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      return {...state, login: !!localStorage.getItem('token') }
    case 'LOGOUT_USER':
      return {...state, login: {} }
    default:
      return state;
  }
}

export function projects(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PROJECTS':
      return {...state, projects: action.payload }
    default:
      return state;
  }
}

export const mainReducer = combineReducers({
  auth,
  projects
});
