import React from 'react';
import {Projects} from '../components/Projects';
import {configure, shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';

const middlewares = [thunk];
const mockStore = configureStore(middlewares)
configure({ adapter: new Adapter() })

describe('Projects', () => {

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

  let projects = [{
    id: 1,
    name: 'Project name'
  }]

  const defaultProps = {
    projects: projects
  }

  it('matches Projects snapshot', () => {
    const wrapper = shallow(<Provider store={store}><Projects {...defaultProps}/></Provider>)

    expect(toJson(wrapper)).toMatchSnapshot();
  })
})
