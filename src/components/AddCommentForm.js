import React, { Component } from 'react';
import axios from 'axios';
import { Button, Popup, Comment, Modal, Form } from 'semantic-ui-react';
export default class AddCommentForm extends Component {
  constructor(props) {
    super();

    this.onSubmit = this.onSubmit.bind(this);
  }
  async onSubmit(event, x, y) {
    event.preventDefault();
    console.log('here');
    const newComment = {
      comment: event.target.comment.value,
      documentId: 1,
      color: 'red',
      x,
      y
    };

    console.log(newComment, 'NEW COMMENT');
    await axios.post('/api/comments', newComment);

    this.props.setComment();
    console.log('after axios');
  }

  render() {
    return (
      <Modal
        open={this.props.open}
        onClose={this.props.closeModal}
        closeOnDimmerClick={true}
      >
        <Modal.Content
          as={Form}
          onSubmit={e => this.onSubmit(e, this.props.x, this.props.y)}
        >
          <Form.TextArea name="comment" />
          <Button type="submit">Submit</Button>
        </Modal.Content>
      </Modal>
    );
  }
}
