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
      <div class="App">
        <Link to="/">Landing</Link>
        <Link to="/add">Add</Link>
        <Link to="/resume">Resume</Link>
        <Routes />
      </div>
    );
  }
}
