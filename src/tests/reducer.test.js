import { entities, mainReducer, auth } from '../reducers/reducer'
import * as actions from '../redux/actions'

describe('post reducer', () => {
  const initialState = {
    auth: {
      login: false,
    },
    entities: {
      comments: {},
      projects: {},
      tasks: {}
    }
   }

  const projects = {
    1: { id: 1, name: 'Name', tasks: [{ id: 2, type: 'task' }] }
  }
  const tasks = {
    2: { id: 2, title: 'Title', comments: [{ id: 3, type: 'comment' }] }
  }
  const comments = {
    3: { id: 3, body: 'body', task_id: 2 }
  }

  const newProject = { 4: { id: 4, name: 'new name', tasks: [] } }
  const newTask = { 5: { id: 5, title: 'new title', project_id: 1, comments: [] } }
  const newComment = { 6: { id: 6, task_id: 2, body: 'new body' } }

  it('should return the initial state', () => {
    expect(mainReducer(undefined, {})).toEqual(initialState);
  });

  it('FETCH_PROJECTS', () => {
    expect(
      entities(
        {
          projects: {},
          tasks: {},
          comments: {}
        },
        {
          type: 'FETCH_PROJECTS',
          payload: {
            entities: {
              projects: projects,
              tasks: tasks,
              comments: comments
            }
          }
        }
      )
    ).toEqual(
      {
        comments: comments,
        projects: projects,
        tasks: tasks
      }
    )
  })

  it('CREATE_PROJECT_SUCCESS', () => {
    expect(
      entities(
        {
          projects: projects,
          tasks: tasks,
          comments: comments
        },
        {
          type: 'CREATE_PROJECT_SUCCESS',
          payload: {
            entities: {
              projects: newProject
            }
          }
        }
      )
    ).toEqual(
      {
        projects: {
          1: { id: 1, name: 'Name', tasks: [{ id: 2, type: 'task' }] },
          4: { id: 4, name: 'new name', tasks: [] }
        },
        tasks: tasks,
        comments: comments
      }
    )
  })

  it('UPDATE_PROJECT_SUCCESS', () => {
    expect(
      entities(
        {
          projects: projects,
          tasks: tasks,
          comments: comments
        },
        {
          type: 'UPDATE_PROJECT_SUCCESS',
          payload: {
            entities: {
              projects: { 1: { id: 1, name: 'Updated name', tasks:[{ id: 2 }] } }
            }
          }
        }
      )
    ).toEqual(
      {
        projects: {
          1: { id: 1, name: 'Updated name', tasks: [{ id: 2 }] }
        },
        tasks: tasks,
        comments: comments
      }
    )
  })

  it('DELETE_PROJECT_SUCCESS', () => {
    expect(
      entities(
        {
          projects: projects,
          tasks: tasks,
          comments: comments
        },
        {
          type: 'DELETE_PROJECT_SUCCESS',
          payload: 1
        }
      )
    ).toEqual(
      {
        projects: {},
        tasks: tasks,
        comments: comments
      }
    )
  })

  it('CREATE_TASK_SUCCESS', () => {
    expect(
      entities(
        {
          projects: projects,
          tasks: tasks,
          comments: comments
        },
        {
          type: 'CREATE_TASK_SUCCESS',
          payload: {
            entities: {
              tasks: newTask
            }
          }
        }
      )
    ).toEqual(
      {
        projects: {
          1: { id: 1, name: 'Name', tasks: [{ id: 2, type: 'task' }, { id: '5', type: 'task' }] }
        },
        tasks: {
          2: { id: 2, title: 'Title', comments: [{ id: 3, type: 'comment' }] },
          5: { id: 5, title: 'new title', project_id: 1, comments: [] }
        },
        comments: comments
      }
    )
  })

  it('UPDATE_TASK_SUCCESS', () => {
    expect(
      entities(
        {
          projects: projects,
          tasks: tasks,
          comments: comments
        },
        {
          type: 'UPDATE_TASK_SUCCESS',
          payload: {
            entities: {
              tasks: { 2: { id: 2, title: 'Updated title', project_id: 1, comments: []} }
            }
          }
        }
      )
    ).toEqual(
      {
        projects: projects,
        tasks: {
          2: { id: 2, title: 'Updated title', project_id: 1, comments: [] },
        },
        comments: comments
      }
    )
  })

  it('DELETE_TASK_SUCCESS', () => {
    expect(
      entities(
        {
          projects: projects,
          tasks: tasks,
          comments: comments
        },
        {
          type: 'DELETE_TASK_SUCCESS',
          project_id: 1,
          task_id: 2
        }
      )
    ).toEqual(
      {
        projects: {
          1: { id: 1, name: 'Name', tasks: [] }
        },
        tasks: {},
        comments: comments
      }
    )
  })

  it('CREATE_COMMENT_SUCCESS', () => {
    expect(
      entities(
        {
          projects: projects,
          tasks: tasks,
          comments: comments
        },
        {
          type: 'CREATE_COMMENT_SUCCESS',
          payload: {
            entities: {
              comments: newComment
            }
          }
        }
      )
    ).toEqual(
      {
        projects: projects,
        tasks: {
          2: { id: 2, title: 'Title', comments: [{ id: 3, type: 'comment' }, { id: '6', type: 'comment' }] },
        },
        comments: {
          3: { id: 3, body: 'body', task_id: 2 },
          6: { id: 6, body: 'new body', task_id: 2 }
        }
      }
    )
  })

  it('DELETE_COMMENT_SUCCESS', () => {
    expect(
      entities(
        {
          projects: projects,
          tasks: tasks,
          comments: comments
        },
        {
          type: 'DELETE_COMMENT_SUCCESS',
          task_id: 2,
          comment_id: 3
        }
      )
    ).toEqual(
      {
        projects: projects,
        tasks: {
          2: { id: 2, title: 'Title', comments: [] },
        },
        comments: {}
      }
    )
  })

  it('LOGIN_USER', () => {
    localStorage.setItem('token', 'auth_token')

    expect(
      auth(
        {
          login: false,
        },
        {
          type: 'LOGIN_USER'
        }
      )
    ).toEqual(
      {
        login: true
      }
    )
  })

  it('LOGOUT_USER', () => {
    expect(
      auth(
        {
          login: true,
        },
        {
          type: 'LOGOUT_USER'
        }
      )
    ).toEqual(
      {
        login: {}
      }
    )
  })

});
