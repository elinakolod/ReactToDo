import React from 'react';
import SignUp from '../components/SignUp'
import renderer from 'react-test-renderer'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const middlewares = [thunk];
const mockStore = configureStore(middlewares)
const state = {}
const store = mockStore(state)

it('matches snapshot', () => {
  const wrapper = renderer.create(<Provider store={store}><SignUp/></Provider>)

  expect(wrapper.toJSON()).toMatchSnapshot();
});
