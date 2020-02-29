import React, { Component } from 'react';
import { Header, Container } from 'semantic-ui-react';
import MockDocument from '../components/MockDocument';
import './Landing.css'

export default class Landing extends Component {
  constructor() {
    super();
    this.state = {
      documents: [{}, {}, {}, {}, {}]
    }
  }

  componentDidMount() {

  }

  render() {
    const { documents } = this.state;
    return (<div className="landing">
      <Header as="h1" style={{ color: "white" }}>Welcome to Kritique</Header>
      <Header as="h2" style={{ color: "white" }}>Pending Resumes</Header>
      <div className="landing-documents">
        {documents.map(document => {
          return <MockDocument></MockDocument>
        })}
      </div>
    </div>)
  }
}
