import React from 'react';
import { Comment, Form, Button, Accordion } from 'semantic-ui-react';
import AddCommentForm from './AddCommentForm';
// import SingleComment from './SingleComment';

// const dummyProps = [
//   { name: 'Alex', text: 'This is a comment', score: 10 },
//   { name: 'Tristan', text: 'This is a comment too', score: 20 },
// ];

const CommentComponent = props => {
  const { x, y, color } = props.comments[0];
  return (
    <Comment.Group>
      {props.comments.map(comment => (
        <Comment>
          <Comment.Content>
            <Comment.Author>Anonymouse</Comment.Author>
            <Comment.Text>{comment.comment}</Comment.Text>
          </Comment.Content>
        </Comment>
      ))}

      <Form onSubmit={e => props.submitComment(e, color, x, y)}>
        <Form.TextArea name="comment" />
        <Button type="submit">Submit</Button>
      </Form>
    </Comment.Group>
  );
};

export default CommentComponent;
