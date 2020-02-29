import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import AddCommentForm from './components/AddCommentForm';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class App extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
    markers: [{}],
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
    return (
      <div>
        {markers.map(marker => {
          console.log('rendered');
          return (
            <div
              style={{
                position: 'absolute',

                color: 'red',
                top: 100 + 'px',
                left: 100 + 'px',
                zIndex: 1,
              }}
            >
              ♥
            </div>
          );
        })}
        <nav>
          <button onClick={this.goToPrevPage}>Prev</button>
          <button onClick={this.goToNextPage}>Next</button>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </nav>

        <Document
          onClick={event => console.log(event.pageX, event.pageY)}
          file="./example.pdf"
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber}></Page>
        </Document>

        <AddCommentForm />
      </div>
    );
  }
}
