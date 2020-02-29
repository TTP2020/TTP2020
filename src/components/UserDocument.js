import React, { Component } from 'react';
import { Page } from 'react-pdf';
import { Document } from 'react-pdf/dist/entry.webpack';
import { ReactComponent as Comment } from '../assets/comment.svg';
import { Button, Popup, Modal, Form } from 'semantic-ui-react';
import CommentComponent from './Comments';
import AddCommentForm from './AddCommentForm';
import axios from 'axios';
export default class UserDocument extends Component {
  constructor() {
    super();
    this.state = {
      numPages: null,
      pageNumber: 1,
      markers: {},
      open: false,
      x: null,
      y: null
    };

    this.closeModal = this.closeModal.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }
  async submitComment(event) {
    event.preventDefault();
    const newComment = {
      comment: event.target.comment.value,
      documentId: 1,
      color: 'red',
      x: this.state.x,
      y: this.state.y,
      pageNumber: this.state.pageNumber
    };
    await axios.post('/api/comments', newComment);
    let key = `${this.state.x}${this.state.y}`;
    this.setState(prevState => {
      return {
        markers: { ...prevState.markers, [key]: newComment },
        x: null,
        y: null,
        open: false
      };
    });
  }

  async componentDidMount() {
    //TODO: Fetch markers from backend.
    const { data } = await axios.get('/api/comments');
    this.setState({ markers: data });
    console.log(data);
  }
  closeModal() {
    this.setState({ open: false, x: null, y: null });
  }
  handleClick = (x, y) => {
    this.setState({ open: true, x, y });
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () => {
    const { pageNumber } = this.state;
    if (pageNumber - 1 > 0) this.setState({ pageNumber: pageNumber - 1 });
  };

  goToNextPage = () => {
    const { pageNumber, numPages } = this.state;
    if (pageNumber + 1 <= numPages)
      this.setState({ pageNumber: pageNumber + 1 });
  };

  render() {
    const { pageNumber, numPages, markers } = this.state;
    const markersArr = Object.values(markers);
    return (
      <div className="App">
        {markersArr.map(marker => {
          const { x, y, pageNumber } = marker;

          return (
            this.state.pageNumber === pageNumber && (
              <Popup
                trigger={
                  <Comment
                    key={`${x}${y}`}
                    style={{
                      width: '1%',
                      height: 'auto',
                      position: 'absolute',
                      color: 'red',
                      top: y - 15 + 'px',
                      left: x + 'px',
                      zIndex: 1
                    }}
                  />
                }
              >
                <Popup.Content>
                  <CommentComponent {...marker} />
                </Popup.Content>
              </Popup>
            )
          );
        })}
        <nav>
          <Button onClick={this.goToPrevPage}>Prev</Button>
          <Button onClick={this.goToNextPage}>Next</Button>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </nav>
        <Document
          onClick={event => this.handleClick(event.pageX, event.pageY)}
          file="./example.pdf"
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber}></Page>
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <AddCommentForm
          open={this.state.open}
          submitComment={this.submitComment}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}
