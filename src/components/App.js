import React, { Component } from 'react';
import UserDocument from './UserDocument';
import Routes from '../routes';

import { Link } from 'react-router-dom';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      numPages: null,
      pageNumber: 1,
      markers: {},
    };
  }

  componentDidMount() {
    //TODO: Fetch markers from backend.
  }

  render() {
    return (
      <div className="App">
        <Link to="/">Home</Link>
        <Link to="/resume">Resume</Link>
        <Link to="/comments">Comments</Link>

        <Routes />
      </div>
    );
  }
}
