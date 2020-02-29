import React from 'react';
import { Comment } from 'semantic-ui-react';
import SingleComment from './SingleComment';

const dummyProps = [
  { name: 'Alex', text: 'This is a comment', score: 10 },
  { name: 'Tristan', text: 'This is a comment too', score: 20 },
];

const CommentComponent = props => {
  return (
    <Comment.Group>
      {dummyProps.map((comment, index) => (
        <SingleComment comment={comment} index={index} key={index} />
      ))}
    </Comment.Group>
  );
};

export default CommentComponent;
