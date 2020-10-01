import React from 'react';
import TaskItem from '../components/TaskItem';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'

const middlewares = [thunk];
const mockStore = configureStore(middlewares)

describe('TaskItem', () => {
  const state = {
    entities: {
      tasks: {
        2: {id: 2, name: 'Task name', project_id: 1, done: false, comments: [{ id: 3, type: 'comment' }]}
      },
      comments: {
        3: {id: 3, body: 'Comment body', task_id: 1}
      }
    }
  }

  const store = mockStore(state)

  let task = {
    id: 2,
    type: 'tasks',
    attributes: {
      name: 'test project'
    },
    comments: [3]
  }

  it('matches TaskItem snapshot', () => {
    const wrapper = renderer.create(<Provider store={store}><TaskItem task={task}/></Provider>)

    expect(wrapper.toJSON()).toMatchSnapshot();
  })
})
