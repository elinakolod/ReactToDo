import * as actions from '../redux/actions'
import axios from 'axios'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureStore(middlewares)
const startState = {}
const makeMockStore = (state = {}) => {
  return mockStore({
    ...startState,
    ...state,
  })
}

describe('actions', () => {
  beforeEach(() => moxios.install())
  afterEach(() => moxios.uninstall())

  let projects = [{
    id: 1,
    name: 'test project'
  }]

  let tasks = [{
    id: 1,
    project_id: 1,
    name: 'test task'
  }]

  let comments = [{
    id: 1,
    task_id: 1,
    body: 'test comment'
  }]

  it('fetchs projects', () => {
    const mockSuccess = data => ({ status: 200, response: data })

    const response = {
      data: projects
    }

    let expectedAction = {
      type: 'FETCH_PROJECTS',
      payload: projects
    }
    moxios.wait(() => {
      console.log('asdasdasd')
      const request = moxios.requests.mostRecent()
      request.respondWith(mockSuccess(response))
    })
    const store = mockStore({ entities: { projects: {} } })
    store.dispatch(actions.fetchProjectsRequest()).then(() => {
      expect(store.getActions()).toEqual([expectedAction])
    })
  })
})
