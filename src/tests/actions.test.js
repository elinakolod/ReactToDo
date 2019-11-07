import * as actions from '../redux/actions'
import axios from 'axios'
import configureStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'
import thunk from 'redux-thunk'

const middlewares = [thunk];
const mockStore = configureStore(middlewares)
const mock = new MockAdapter(axios)
const store = mockStore({})

describe('actions', () => {
  beforeEach(() => store.clearActions())

  let projects = [{
    id: 1,
    name: 'test project'
  }]

  let tasks = [{
    id: 2,
    project_id: 1,
    name: 'test task'
  }]

  let comments = [{
    id: 3,
    task_id: 2,
    body: 'test comment'
  }]

  it('fetchs projects', async () => {
    const response = {
      data: projects
    }

    let expectedAction = {
      type: 'FETCH_PROJECTS',
      payload: {
        result: { undefined: [ 1 ] },
        entities: { undefined: { '1': { id: 1 } } }
      }
    }

    mock.onGet('http://localhost:3000/api/v1/projects').reply(200, response)

    await store.dispatch(actions.fetchProjectsRequest())
    console.log(store.getActions()[0].payload.result)
    console.log([expectedAction])
    expect(store.getActions()).toEqual([expectedAction])
  })

  it('creates project', async () => {
    const response = {
      data: projects
    }

    let expectedAction = {
      type: 'CREATE_PROJECT_SUCCESS',
      payload: {
        result: { undefined: [ 1 ] },
        entities: { undefined: { '1': { id: 1 } } }
      }
    }

    mock.onPost('http://localhost:3000/api/v1/projects').reply(200, response)

    await store.dispatch(actions.createProjectRequest())
    expect(store.getActions()).toEqual([expectedAction])
  })

  it('updates project', async () => {
    const response = {
      data: [{
        id: 1,
        name: 'New name'
      }]
    }

    let project = {
      name: 'New name'
    }

    let expectedAction = {
      type: 'UPDATE_PROJECT_SUCCESS',
      payload: {
        result: { undefined: [ 1 ] },
        entities: { undefined: { '1': { id: 1 } } }
      }
    }

    mock.onPut('http://localhost:3000/api/v1/projects/' + projects[0].id).reply(200, response)

    await store.dispatch(actions.updateProjectRequest(project, projects[0].id))
    expect(store.getActions()).toEqual([expectedAction])
  })

  it('creates task', async () => {
    const response = {
      data: tasks
    }

    let expectedAction = {
      type: 'CREATE_TASK_SUCCESS',
      payload: {
        result: { undefined: [ 2 ] },
        entities: { undefined: { '2': { id: 2 } } }
      }
    }

    mock.onPost('http://localhost:3000/api/v1/projects/' + projects[0].id + '/tasks').reply(200, response)

    await store.dispatch(actions.createTaskRequest(tasks[0], tasks[0].project_id))
    expect(store.getActions()).toEqual([expectedAction])
  })

  it('updates task', async () => {
    const response = {
      data: [{
        id: 2,
        name: 'New name'
      }]
    }

    let task = {
      name: 'New name'
    }

    let expectedAction = {
      type: 'UPDATE_TASK_SUCCESS',
      payload: {
        result: { undefined: [ 2 ] },
        entities: { undefined: { '2': { id: 2 } } }
      }
    }

    mock.onPut('http://localhost:3000/api/v1/tasks/' + tasks[0].id).reply(200, response)

    await store.dispatch(actions.updateTaskRequest(task, tasks[0].id))
    expect(store.getActions()).toEqual([expectedAction])
  })

  it('creates comment', async () => {
    const response = {
      data: comments
    }

    let expectedAction = {
      type: 'CREATE_COMMENT_SUCCESS',
      payload: {
        result: { undefined: [ 3 ] },
        entities: { undefined: { '3': { id: 3 } } }
      }
    }

    mock.onPost('http://localhost:3000/api/v1/tasks/' + tasks[0].id + '/comments').reply(200, response)

    await store.dispatch(actions.createCommentRequest(comments[0], comments[0].task_id))
    expect(store.getActions()).toEqual([expectedAction])
  })

  it('deletes project', async () => {
    let expectedAction = {
      type: 'DELETE_PROJECT_SUCCESS',
      payload: projects[0].id
    }

    mock.onDelete('http://localhost:3000/api/v1/projects/' + projects[0].id).reply(204)

    await store.dispatch(actions.removeProjectRequest(projects[0].id))
    expect(store.getActions()).toEqual([expectedAction])
  })

  it('deletes task', async () => {
    let expectedAction = {
      type: 'DELETE_TASK_SUCCESS',
      task_id: tasks[0].id,
      project_id: tasks[0].project_id
    }

    mock.onDelete('http://localhost:3000/api/v1/tasks/' + tasks[0].id).reply(204)

    await store.dispatch(actions.removeTaskRequest(tasks[0].project_id, tasks[0].id))
    expect(store.getActions()).toEqual([expectedAction])
  })

  it('deletes comment', async () => {
    let expectedAction = {
      type: 'DELETE_COMMENT_SUCCESS',
      comment_id: comments[0].id,
      task_id: comments[0].task_id
    }

    mock.onDelete('http://localhost:3000/api/v1/comments/' + comments[0].id).reply(204)

    await store.dispatch(actions.removeCommentRequest(comments[0].id, comments[0].task_id))
    expect(store.getActions()).toEqual([expectedAction])
  })
})
