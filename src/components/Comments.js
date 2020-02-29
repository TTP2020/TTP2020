import React from 'react';
import { Button, Popup, Comment, Modal } from 'semantic-ui-react';
const dummyProps = [
  { name: 'Alex', text: 'This is a comment' },
  { name: 'Tristan', text: 'This is a comment too' }
];
const CommentComponent = props => {
  return (
    <Comment.Group>
      {dummyProps.map(comment => (
        <Comment>
          <Comment.Content>
            <Comment.Author as="a">{comment.name}</Comment.Author>
            <Comment.Text>{comment.text}</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
              <Comment.Action>Save</Comment.Action>
              <Comment.Action>Hide</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      ))}
    </Comment.Group>
  );
};

export default CommentComponent;
