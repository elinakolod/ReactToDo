import { combineReducers } from 'redux'
import { merge, concat, filter } from 'lodash';

const initialState = {
  login: !!localStorage.getItem('token'),
}

const entitiesInitState = {
  projects: {},
  comments: {},
  tasks: {}
}

export function auth(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      return {...state, login: !!action.payload, user: action.payload }
    case 'LOGOUT_USER':
      return {...state, login: {} }
    case 'LOGIN_USER_ERROR':
      return {...state, ...action.payload}
    default:
      return state;
  }
}

export function entities(state = entitiesInitState, action) {
  switch (action.type) {
    case 'FETCH_PROJECTS':
      return {...state, ...action.payload.entities}
    case 'CREATE_PROJECT_SUCCESS':
      return  merge({}, state, action.payload.entities)
    case 'UPDATE_PROJECT_SUCCESS':
      return {...state, projects: {...state.projects, ...action.payload.entities.projects}}
    case 'CREATE_TASK_SUCCESS':
      let project_id = Object.values(action.payload.entities.tasks).shift().project_id
      let task_id = Object.keys(action.payload.entities.tasks).shift()
      return {
        ...state,
        projects: {
          ...state.projects,
          [project_id]: {
            ...state.projects[project_id],
            tasks: concat(state.projects[project_id].tasks, [{ id: task_id, type: 'task' }])
          }
        },
        tasks: merge({}, state.tasks, action.payload.entities.tasks)
      }
    case 'UPDATE_TASK_SUCCESS':
      return {...state, tasks: {...state.tasks, ...action.payload.entities.tasks}}
    case 'CREATE_COMMENT_SUCCESS':
      let comment_task_id = Object.values(action.payload.entities.comments).shift().task_id
      let comment_id = Object.keys(action.payload.entities.comments).shift()
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [comment_task_id]: {
            ...state.tasks[comment_task_id],
            comments: concat(state.tasks[comment_task_id].comments, [{ id: comment_id, type: 'comment' }])
          }
        },
        comments: merge({}, state.comments, action.payload.entities.comments)
      }
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
      let newTasksState = Object.assign({}, state.tasks)
      delete newTasksState[action.task_id]
      return {
        ...state,
        projects: {
          ...state.projects,
          [action.project_id]: {
            ...state.projects[action.project_id],
            tasks: filter(state.projects[action.project_id].tasks, (task) => task.id !== action.task_id )
          }
        },
        tasks: newTasksState
      }
    case 'DELETE_COMMENT_SUCCESS':
      let newCommentsState = Object.assign({}, state.comments)
      delete newCommentsState[action.comment_id]
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.task_id]: {
            ...state.tasks[action.task_id],
            comments: filter(state.tasks[action.task_id].comments, (comment) => comment.id !== action.comment_id )
          }
        },
        comments: newCommentsState
      }
    default:
      return state;
  }
}

export const mainReducer = combineReducers({
  auth,
  entities
});
