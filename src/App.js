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

  handleClick = (x, y, comment) => {
    let newMarker = {
      x, y, pageNumber: this.state.pageNumber, comments: []
    }
    let key = `${x}${y}`;
    console.log(this.state.markers)
    this.setState((prevState) => {
      return {
        markers: { ...prevState.markers, [key]: newMarker }
      }
    }
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
    const markersArr = Object.values(markers)
    return (
      <div>
        {markersArr.map(marker => {
          const { x, y, pageNumber } = marker

          return this.state.pageNumber === pageNumber ? <Comment key={`${x}${y}`} style={{
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
