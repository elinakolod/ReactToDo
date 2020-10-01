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
    type: 'projects',
    attributes: {
      name: 'test project'
    }
  }]

  let task = {
    id: 2,
    type: 'tasks',
    attributes: {
      name: 'task',
      done: false,
      project_id: 1
    }
  }

  let comment = {
    id: 3,
    type: 'comments',
    attributes: {
      task_id: 2,
      body: 'test comment'
    }
  }

  it('fetchs projects', async () => {
    const response = {
      data: projects
    }

    let expectedAction = {
      type: 'FETCH_PROJECTS',
      payload: {
        result: { projects: [ 1 ] },
        entities: { projects: { '1': { id: 1, name: 'test project' } } }
      }
    }

    mock.onGet('http://localhost:3000/api/v1/projects').reply(200, response)

    await store.dispatch(actions.fetchProjectsRequest())
    expect(store.getActions()).toEqual([expectedAction])
  })

  it('creates project', async () => {
    const response = {
      data: projects
    }

    let expectedAction = {
      type: 'CREATE_PROJECT_SUCCESS',
      payload: {
        result: { projects: [ 1 ] },
        entities: { projects: { '1': { id: 1, name: 'test project' } } }
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
        type: 'projects',
        attributes: {
          name: 'new name'
        }
      }]
    }

    let project = {
      id: 1,
      name: 'new name'
    }

    let expectedAction = {
      type: 'UPDATE_PROJECT_SUCCESS',
      payload: {
        result: { projects: [ 1 ] },
        entities: { projects: { '1': { id: 1, name: 'new name' } } }
      }
    }

    mock.onPut('http://localhost:3000/api/v1/projects/' + project.id).reply(200, response)

    await store.dispatch(actions.updateProjectRequest(project, project.id))
    expect(store.getActions()).toEqual([expectedAction])
  })

  it('creates task', async () => {
    const response = {
      data: task
    }

    let expectedAction = {
      type: 'CREATE_TASK_SUCCESS',
      payload: {
        result: { tasks: [ 2 ] },
        entities: { tasks: { '2': { id: 2, done: false, name: 'task', project_id: 1 } } }
      }
    }

    mock.onPost('http://localhost:3000/api/v1/projects/' + projects[0].id + '/tasks').reply(200, response)

    await store.dispatch(actions.createTaskRequest(task, projects[0].id))
    expect(store.getActions()).toEqual([expectedAction])
  })

  it('updates task', async () => {
    const response = {
      data: [{
        id: 2,
        type: 'tasks',
        attributes: {
          name: 'New name',
          done: false,
          project_id: 1
        }
      }]
    }

    let task = {
      id: 2,
      name: 'New name'
    }

    let expectedAction = {
      type: 'UPDATE_TASK_SUCCESS',
      payload: {
        result: { tasks: [ 2 ] },
        entities: { tasks: { '2': { id: 2, done: false, name: 'New name', project_id: 1 } } }
      }
    }

    mock.onPut('http://localhost:3000/api/v1/tasks/' + task.id).reply(200, response)

    await store.dispatch(actions.updateTaskRequest(task, task.id))
    expect(store.getActions()).toEqual([expectedAction])
  })

  it('creates comment', async () => {
    const response = {
      data: comment
    }

    let expectedAction = {
      type: 'CREATE_COMMENT_SUCCESS',
      payload: {
        result: { comments: [ 3 ] },
        entities: { comments: { '3': { id: 3, task_id: 2, body: 'test comment' } } }
      }
    }

    mock.onPost('http://localhost:3000/api/v1/tasks/' + comment.task_id + '/comments').reply(200, response)

    await store.dispatch(actions.createCommentRequest(comment, comment.task_id))
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
      task_id: task.id,
      project_id: task.project_id
    }

    mock.onDelete('http://localhost:3000/api/v1/tasks/' + task.id).reply(204)

    await store.dispatch(actions.removeTaskRequest(task.project_id, task.id))
    expect(store.getActions()).toEqual([expectedAction])
  })

  it('deletes comment', async () => {
    let expectedAction = {
      type: 'DELETE_COMMENT_SUCCESS',
      comment_id: comment.id,
      task_id: comment.task_id
    }

    mock.onDelete('http://localhost:3000/api/v1/comments/' + comment.id).reply(204)

    await store.dispatch(actions.removeCommentRequest(comment.id, comment.task_id))
    expect(store.getActions()).toEqual([expectedAction])
  })

  it('logins user', async () => {
    const response = {
      data: {
        csrf: 'token'
      }
    }

    let user = {
      name: 'name',
      password: 'pass'
    }

    let expectedAction = {
      type: 'LOGIN_USER',
    }

    mock.onPost('http://localhost:3000/api/v1/signins').reply(200, response)

    await store.dispatch(actions.signInUserRequest(user))
    expect(store.getActions()).toEqual([expectedAction])
  })

  it('logouts user', async () => {
    let expectedAction = {
      type: 'LOGOUT_USER',
    }

    await store.dispatch(actions.logoutUserRequest())
    expect(store.getActions()).toEqual([expectedAction])
  })
})
