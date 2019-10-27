import { combineReducers } from 'redux'
import { merge } from 'lodash';

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
    case 'CREATE_PROJECT_SUCCESS':
      return  merge({}, state, action.data.entities)
    case 'CREATE_TASK_SUCCESS':
      return {...state, ...action.payload }
    case 'CREATE_COMMENT_SUCCESS':
      return {...state, ...action.payload }
    case 'DELETE_PROJECT_SUCCESS':
      let newProjectState = Object.assign({}, state.projects)
      delete newProjectState[action.payload]
      return {
        ...state,
        projects: {
          ...newProjectState
        }
      }
    case 'DELETE_TASK_SUCCESS':
      return {...state, ...action.payload }
    case 'DELETE_COMMENT_SUCCESS':
      return {...state, ...action.payload }
    default:
      return state;
  }
}

export const mainReducer = combineReducers({
  auth,
  entities
});
