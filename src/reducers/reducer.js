import { combineReducers } from 'redux'

const initialState = {
  login: !!localStorage.getItem('token')
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      return {...state, login: !!localStorage.getItem('token') }
    default:
      return state;
  }
}

export const mainReducer = combineReducers({
  reducer
});
