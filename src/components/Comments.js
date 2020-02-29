import React from 'react';
import { Comment } from 'semantic-ui-react';

const CommentComponent = props => {
  return (
    <Comment.Group>
      <Comment>
        <Comment.Content>
          <Comment.Author>Alex</Comment.Author>
          <Comment.Text>{props.comment}</Comment.Text>
        </Comment.Content>
      </Comment>
    </Comment.Group>
  );
};

export default CommentComponent;
