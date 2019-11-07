import React from 'react';
import {TaskItem} from '../components/TaskItem';
import {configure, shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

const middlewares = [thunk];
const mockStore = configureStore(middlewares)
configure({ adapter: new Adapter() })

describe('TaskItem', () => {

  const state = {
    entities: {
      tasks: {
        0: {id: 2, name: 'Task name', project_id: 1, done: false, comments: [{ id: 3, type: 'comment' }]}
      },
      comments: {
        0: {id: 3, body: 'Comment body', task_id: 1}
      }
    }
  }
  const store = mockStore(state)

  let task = {
    id: 2,
    name: 'Task name',
    project_id: 1,
    done: false
  }

  const defaultProps = {
    task: task
  }

  it('matches TaskItem snapshot', () => {
    const wrapper = shallow(<Provider store={store}><TaskItem {...defaultProps}/></Provider>)

    expect(toJson(wrapper)).toMatchSnapshot();
  })
})
