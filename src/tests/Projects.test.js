import React from 'react'
import Projects from '../components/Projects'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const middlewares = [thunk];
const mockStore = configureStore(middlewares)
const mock = new MockAdapter(axios)

describe('Projects', () => {
  let projects = [{
    id: 1,
    type: 'projects',
    attributes: {
      name: 'test project'
    }
  }]

  const state = {
    entities: {
      projects: {
        0: {id: 1, name: 'Project name', tasks: [{ id: 2, type: 'task' }]}
      },
      tasks: {
        0: {id: 2, name: 'Task name', project_id: 1, comments: [{ id: 3, type: 'comment' }]}
      },
      comments: {
        0: {id: 3, body: 'Comment body', task_id: 1}
      }
    }
  }
  const store = mockStore(state)

  const response = {
    data: projects
  }

  mock.onGet('http://localhost:3000/api/v1/projects').reply(200, response)

  it('matches Projects snapshot', () => {
    const wrapper = renderer.create(<Provider store={store}><Projects /></Provider>)

    expect(wrapper.toJSON()).toMatchSnapshot()
  })
})
