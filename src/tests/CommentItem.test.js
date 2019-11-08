import React from 'react';
import CommentItem from '../components/CommentItem'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

const middlewares = [thunk];
const mockStore = configureStore(middlewares)

const state = {
  entities: {
    comments: {
      0: {id: 1, body: 'Comment body'}
    }
  }
}

let comment = {
  id: 1,
  body: 'Comment body',
  task_id: 1
}

const defaultProps = {
  comment: comment
}

const store = mockStore(state)

it('matches snapshot', () => {
  const wrapper = renderer.create(<Provider store={store}><CommentItem {...defaultProps}/></Provider>)

  expect(wrapper.toJSON()).toMatchSnapshot();
});
