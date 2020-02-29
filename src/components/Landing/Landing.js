import React, { Component } from "react";
import { Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import MockDocument from "../MockDocument/MockDocument";
import UploadResume from "../UploadResume";
import axios from "axios";
import "./Landing.css";

const filters = [
  ["All", ""],
  ["Resumes", "resume"],
  ["Cover Letters", "coverLetter"],
  ["Messages", "outreach"]
];

export default class Landing extends Component {
  constructor() {
    super();
    this.state = {
      // documents: [{}, {}, {}, {}, {}],
      // documents: [
      //   { fileName: "example.pdf", title: "Frontend Dev", type: "resume" },
      //   { fileName: "example2.pdf", title: "Roast me plz", type: "resume" },
      //   { fileName: "example3.pdf", title: "Software Eng", type: "resume" },
      //   { fileName: "example4.pdf", title: "Data Scientist", type: "resume" },
      //   {
      //     fileName: "example5.pdf",
      //     title: "Cover Letter",
      //     type: "coverLetter"
      //   },
      //   {
      //     fileName: "example6.pdf",
      //     title: "Another Cover Letter",
      //     type: "coverLetter"
      //   },
      //   { fileName: "example7.pdf", title: "Reach out", type: "outreach" },
      //   {
      //     fileName: "example8.pdf",
      //     title: "LinkedIn Outreach Message",
      //     type: "outreach"
      //   }
      // ],
      documents: [],
      filter: "",
      docsLoaded: false
    };
    this.loadDocuments = this.loadDocuments.bind(this);
  }
  async componentDidMount() {
    await this.loadDocuments();
  }
  async loadDocuments() {
    const documents = await axios.get("/api/resume");
    console.log("Docs ", documents.data);
    const data = await documents.data;
    this.setState({ documents: data, docsLoaded: true });
  }

  filter = type => {
    this.setState({ filter: type });
  };

  render() {
    const { documents, filter } = this.state;
    console.log("LOADED ", this.state.docsLoaded);
    return (
      <div className="landing">
        <div>
          <Image src="./logo.png" size="huge"></Image>
        </div>
        <UploadResume loadDocuments={this.loadDocuments} />
        <div>
          {filters.map(filter => {
            return (
              <Button
                key={filter[1]}
                color={"youtube"}
                onClick={() => {
                  this.filter(filter[1]);
                }}
              >
                {filter[0]}
              </Button>
            );
          })}
        </div>
        <div className="landing-documents">
          {this.state.docsLoaded
            ? documents.map((document, index) => {
                if (filter.length === 0 || document.type === filter) {
                  return (
                    <Link
                      key={index}
                      to={{
                        pathname: "/resume",
                        state: {
                          fileName: document.fileName
                        }
                      }}
                    >
                      <MockDocument title={document.title}></MockDocument>
                    </Link>
                  );
                }
              })
            : null}
        </div>
      </div>
    );
  }
}
