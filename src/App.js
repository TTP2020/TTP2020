import React, { Component } from 'react';
import Landing from './components/Landing'

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
    return <div className="App">
      <Landing></Landing>
    </div>
  }
}
