import React, { Component } from 'react';
import { Page } from 'react-pdf';
import { Document } from 'react-pdf/dist/entry.webpack';
import { ReactComponent as Comment } from '../assets/comment.svg';
import { Button, Popup, Modal, Form } from 'semantic-ui-react';
import AddCommentForm from './AddCommentForm';
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
    this.setComment = this.setComment.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  setComment() {
    let newMarker = {
      x: this.state.x,
      y: this.state.y,
      pageNumber: this.state.pageNumber,
      comments: []
    };
    let key = `${this.state.x}${this.state.y}`;
    this.setState(prevState => {
      return {
        markers: { ...prevState.markers, [key]: newMarker },
        x: null,
        y: null,
        open: false
      };
    });
  }
  componentDidMount() {
    //TODO: Fetch markers from backend.
  }
  closeModal() {
    this.setState({ open: false, x: null, y: null });
  }
  handleClick = (x, y, comment) => {
    this.setState({ open: true, x, y });
    // let newMarker = {
    //   x,
    //   y,
    //   pageNumber: this.state.pageNumber,
    //   comments: []
    // };
    // let key = `${x}${y}`;
    // console.log(this.state.markers);
    // this.setState(prevState => {
    //   return {
    //     markers: { ...prevState.markers, [key]: newMarker },
    //     open: true
    //   };
    // });
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

          return this.state.pageNumber === pageNumber ? (
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
            ></Comment>
          ) : (
            <></>
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
          setComment={this.setComment}
          closeModal={this.closeModal}
          x={this.state.x}
          y={this.state.y}
        />
      </div>
    );
  }
}
