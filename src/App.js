import React, { Component } from 'react';
import { Page } from 'react-pdf';
import { Document } from 'react-pdf/dist/entry.webpack';
import { ReactComponent as Comment } from './assets/comment.svg'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      numPages: null,
      pageNumber: 1,
      markers: []
    }
  }

  componentDidMount() {
    //TODO: Fetch markers from backend.
  }

  handleClick = (x, y) => {
    let newMarker = {
      x, y,
    }
    let newArr = this.state.markers.concat(newMarker)
    console.log(this.state)
    this.setState(
      { markers: newArr }
    )
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {
    const { pageNumber, numPages, markers } = this.state;
    return (
      <div>
        {markers.map(marker => {
          const { x, y } = marker
          return <Comment style={{
            width: "1%",
            height: "auto",
            position: "absolute",
            color: "red",
            top: y - 15 + 'px',
            left: x + 'px',
            zIndex: 1
          }}>

          </Comment>
        })
        }
        <Document
          onClick={(event) => this.handleClick(event.pageX, event.pageY)}
          file="./example.pdf"
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={1}>
          </Page>
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div >
    );
  }
}
