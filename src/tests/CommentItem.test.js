import React from 'react';
import {CommentItem} from '../components/CommentItem';

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

it('matches snapshot', () => {
  const wrapper = <CommentItem {...defaultProps}/>

  expect(wrapper).toMatchSnapshot();
});
