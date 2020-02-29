import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class App extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
    markers: []
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { pageNumber, numPages } = this.state;
    return (
      <div>
        <Document
          onClick={event => console.log(event.pageX, event.pageY)}
          file="./example.pdf"
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={1}></Page>
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <h1>This is an example</h1>
      </div>
    );
  }
}
