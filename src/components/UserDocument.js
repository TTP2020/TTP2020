import React, { Component } from "react";
import { Page } from "react-pdf";
import { Document } from "react-pdf/dist/entry.webpack";
import { ReactComponent as Comment } from "../assets/comment.svg";
import { Button, Popup, Modal, Form } from "semantic-ui-react";
import CommentComponent from "./Comments";
import AddCommentForm from "./AddCommentForm";
import CommentList from "./CommentList";
import axios from "axios";
const colors = [
  "red",
  "orange",
  "yellow",
  "blue",
  "green",
  "pink",
  "purple",
  "teal"
];
export default class UserDocument extends Component {
  constructor() {
    super();
    this.state = {
      numPages: null,
      pageNumber: 1,
      markers: {},
      open: false,
      x: null,
      y: null,
      pointer: 0,
      allComments: []
    };
    this.createComments = this.createComments.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }
  async submitComment(event, color = false, x = null, y = null) {
    event.preventDefault();
    const newX = x === null ? this.state.x : x;
    const newY = y === null ? this.state.y : y;
    const newComment = {
      comment: event.target.comment.value,
      documentId: 1,
      color: color
        ? color
        : colors[Math.floor(this.state.pointer % colors.length)],
      x: newX,
      y: newY,
      pageNumber: this.state.pageNumber
    };
    await axios.post("/api/comments", newComment);
    let key = `${newX},${newY}`;
    let updatedComments;
    if (this.state.markers[key]) {
      updatedComments = [...this.state.markers[key], newComment];
    } else {
      updatedComments = [newComment];
    }
    this.setState({
      markers: { ...this.state.markers, [key]: updatedComments },
      x: null,
      y: null,
      open: false,
      pointer: this.state.pointer + 1
    });
  }

  async componentDidMount() {
    //TODO: Fetch markers from backend.
    const { data } = await axios.get("/api/comments");
    let newMarkers = {};
    for (let i = 0; i < data.length; i++) {
      const curr = data[i];
      const key = `${curr.x},${curr.y}`;
      if (!newMarkers[key]) newMarkers[key] = [];
      newMarkers[key].push(curr);
    }
    this.setState({ markers: newMarkers, allComments: data });
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

  createComments() {
    const arr = [];
    for (let key in this.state.markers) {
      const { x, y, color } = this.state.markers[key][0];
      const comments = (
        <Popup
          on="click"
          trigger={
            <Comment
              key
              style={{
                width: "1%",
                height: "auto",
                position: "absolute",
                fill: `${color}`,
                top: y - 15 + "px",
                left: x + "px",
                zIndex: 1
              }}
            />
          }
        >
          <Popup.Content>
            <CommentComponent
              submitComment={this.submitComment}
              comments={this.state.markers[key]}
            />
          </Popup.Content>
        </Popup>
      );
      arr.push(comments);
    }
    return arr;
  }
  render() {
    const { pageNumber, numPages, markers } = this.state;
    return (
      <div className="App">
        {this.createComments()}
        <nav>
          {this.state.numPages > 1 ? (
            <div>
              <Button onClick={this.goToPrevPage}>Prev</Button>
              <Button onClick={this.goToNextPage}>Next</Button>
            </div>
          ) : null}
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </nav>
        <Document
          onClick={event => this.handleClick(event.pageX, event.pageY)}
          file={`./${this.props.location.state.fileName}`}
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
        <CommentList
          comments={this.state.allComments.sort((a, b) => a.color - b.color)}
        />
      </div>
    );
  }
}
