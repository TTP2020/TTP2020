import React, { Component } from 'react';
import axios from 'axios';

export default class AddCommentForm extends Component {
  async onSubmit(event) {
    event.preventDefault();

    const newComment = {
      comment: event.target.comment.value,
      documentId: 1,
    };

    console.log(newComment, 'NEW COMMENT');
    await axios.post('/api/comments', newComment);

    console.log('after axios');
  }

  render() {
    return (
      <div>
        <h3>ADD COMMENTS</h3>
        <form onSubmit={this.onSubmit}>
          <input type="text" name="comment" required></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
