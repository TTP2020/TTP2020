import React, { Component } from "react";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import MockDocument from "../MockDocument/MockDocument";
import "./Landing.css";


export default class Landing extends Component {
  constructor() {
    super();
    this.state = {
      // documents: [{}, {}, {}, {}, {}],
      documents: [
        { fileName: 'example.pdf', title: 'Frontend Dev', type: 'resume' },
        { fileName: 'example2.pdf', title: 'Roast me plz', type: 'resume' },
        { fileName: 'example3.pdf', title: 'Software Eng', type: 'resume' },
        { fileName: 'example4.pdf', title: 'Data Scientist', type: 'resume' },
        {
          fileName: 'example5.pdf',
          title: 'Cover Letter',
          type: 'coverLetter',
        },
        {
          fileName: 'example6.pdf',
          title: 'Another Cover Letter',
          type: 'coverLetter',
        },
        { fileName: 'example7.pdf', title: 'Reach out', type: 'outreach' },
        {
          fileName: 'example8.pdf',
          title: 'LinkedIn Outreach Message',
          type: 'outreach',
        },
      ],
    };
  }

  componentDidMount() { }

  render() {
    const { documents } = this.state;
    return (
      <div className="landing">
        <div>
          <Image src="./logo.png" size="huge"></Image>
        </div>
        <div>
          <h2 as="h2" style={{ color: "white" }}>
            Pending Resumes
        </h2>
        </div>
        <div className="landing-documents">
          {documents.map(document => {
            return (
              <Link
                to={{
                  pathname: '/resume',
                  state: {
                    fileName: document.fileName,
                  },
                }}
              >
                <MockDocument title={document.title}></MockDocument>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}
