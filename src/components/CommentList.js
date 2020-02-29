import React from 'react';
import SingleComment from './SingleComment';
import { Container } from 'semantic-ui-react';
const dummyProps = [
  { name: 'Alex', text: 'This is a comment', score: 10 },
  { name: 'Tristan', text: 'This is a comment too', score: 20 }
];

export default function CommentList(props) {
  return (
    <div>
      {props.comments.map((comment, index) => (
        <SingleComment
          comment={comment}
          index={index}
          key={index}
          score={Math.floor(Math.random() * 10)}
        />
      ))}
    </div>
  );
}
