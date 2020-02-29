import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

export default class AddCommentForm extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <Modal
        open={this.props.open}
        onClose={this.props.closeModal}
        closeOnDimmerClick={true}
      >
        <Modal.Content as={Form} onSubmit={e => this.props.submitComment(e)}>
          <Form.TextArea name="comment" />
          <Button type="submit">Submit</Button>
        </Modal.Content>
      </Modal>
    );
  }
}
