import React, { Component } from 'react';
import UserDocument from './components/UserDocument'

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
    return <div class="App">
      <UserDocument></UserDocument>
    </div>
  }
}
