import React from 'react';
import {CommentItem} from '../components/CommentItem';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const defaultProps = {
  id: 1,
  projectId: 1,
  editMode: false,
  definition: 'definition',
  newDefinition: '',
  handleNewDefinitionChange: jest.fn(),
  handleEditClick: jest.fn(),
  handleRemoveClick: jest.fn()
}

it('matches snapshot', () => {
  const wrapper = shallow(<CommentItem {...defaultProps} />);
  expect(wrapper).toMatchSnapshot();
});
