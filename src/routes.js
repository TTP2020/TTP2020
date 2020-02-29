import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import AddCommentForm from './components/AddCommentForm';
import UserDocument from './components/UserDocument';
import Landing from './components/Landing/Landing'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/add" component={AddCommentForm} />
        <Route exact path="/resume" component={UserDocument} />

        {/* default route <Route component={LandingPage} /> */}
      </Switch>
    );
  }
}

export default withRouter(Routes);
