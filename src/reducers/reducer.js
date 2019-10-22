import { combineReducers } from 'redux'

const initialState = {
  login: !!localStorage.getItem('token'),
}

const entitiesInitState = {
  projects: {},
  comments: {},
  tasks: {}
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

export function entities(state = entitiesInitState, action) {
  switch (action.type) {
    case 'FETCH_PROJECTS':
      return {...state, ...action.payload.entities }
    default:
      return state;
  }
}

export const mainReducer = combineReducers({
  auth,
  entities
});
