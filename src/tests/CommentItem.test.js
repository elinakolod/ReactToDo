import React from 'react';
import CommentItem from '../components/CommentItem'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

const middlewares = [thunk];
const mockStore = configureStore(middlewares)

let comment = {
  id: 1,
  body: 'Comment body',
  task_id: 1
}

const defaultProps = {
  comment: comment
}

const store = mockStore({})

it('matches snapshot', () => {
  const wrapper = renderer.create(<Provider store={store}><CommentItem {...defaultProps}/></Provider>)

  expect(wrapper.toJSON()).toMatchSnapshot();
});
