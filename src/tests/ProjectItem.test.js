import React from 'react';
import ProjectItem from '../components/ProjectItem';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'

const middlewares = [thunk];
const mockStore = configureStore(middlewares)

describe('ProjectItem', () => {
  const state = {
    entities: {
      projects: {
        1: {id: 1, name: 'Project name', tasks: [{ id: 2, type: 'task' }]}
      },
      tasks: {
        2: {id: 2, name: 'Task name', project_id: 1, comments: [{ id: 3, type: 'comment' }]}
      },
      comments: {
        3: {id: 3, body: 'Comment body', task_id: 1}
      }
    }
  }

  const store = mockStore(state)

  let project = {
    id: 1,
    type: 'projects',
    attributes: {
      name: 'Project name'
    },
    tasks: [2]
  }

  it('matches ProjectItem snapshot', () => {
    const wrapper = renderer.create(<Provider store={store}><ProjectItem project={project}/></Provider>)

    expect(wrapper.toJSON()).toMatchSnapshot();
  })
})
