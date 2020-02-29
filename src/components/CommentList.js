import React from 'react';
import SingleComment from './SingleComment';

const dummyProps = [
  { name: 'Alex', text: 'This is a comment', score: 10 },
  { name: 'Tristan', text: 'This is a comment too', score: 20 },
];

export default function CommentList() {
  return (
    <div>
      {dummyProps.map((comment, index) => (
        <SingleComment comment={comment} index={index} key={index} />
      ))}
    </div>
  );
}
