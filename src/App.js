import React, { Component } from 'react';
import { Page } from 'react-pdf';
import { Document } from 'react-pdf/dist/entry.webpack';
import { ReactComponent as Comment } from './assets/comment.svg';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      numPages: null,
      pageNumber: 1,
      markers: {}
    }
  }

  componentDidMount() {
    //TODO: Fetch markers from backend.
  }

  handleClick = (x, y) => {
    let newMarker = {
      x, y, pageNumber: this.state.pageNumber
    }
    let newArr = this.state.markers.concat(newMarker)
    console.log(this.state)
    this.setState(
      { markers: newArr }
    )
  }

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
    return (
      <div>
        {markers.map(marker => {
          const { x, y, pageNumber } = marker

          return this.state.pageNumber === pageNumber ? <Comment style={{
            width: "1%",
            height: "auto",
            position: "absolute",
            color: "red",
            top: y - 15 + 'px',
            left: x + 'px',
            zIndex: 1
          }}>

          </Comment> : <></>
        })
        }
        <nav>
          <button onClick={this.goToPrevPage}>Prev</button>
          <button onClick={this.goToNextPage}>Next</button>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </nav>
        <Document
          onClick={(event) => this.handleClick(event.pageX, event.pageY)}
          file="./example.pdf"
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber}></Page>
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
}
