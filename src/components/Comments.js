import React from 'react';
import { Button, Popup, Comment, Modal } from 'semantic-ui-react';
const dummyProps = [
  { name: 'Alex', text: 'This is a comment' },
  { name: 'Tristan', text: 'This is a comment too' },
];
const CommentComponent = props => {
  return (
    <Comment.Group>
      {dummyProps.map(comment => (
        <Comment>
          <Comment.Avatar className="dot" />

          <Comment.Content>
            <Comment.Author className={'commentColorWhite'}>
              {comment.name}
            </Comment.Author>
            <Comment.Text className={'commentColorWhite'}>
              {comment.text}
            </Comment.Text>
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
