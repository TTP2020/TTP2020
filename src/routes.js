import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import UserDocument from './components/UserDocument';
import Landing from './components/Landing/Landing';
import Test from './components/Test';
import CommentList from './components/CommentList';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/resume" component={UserDocument} />
        <Route exact path="/comments" component={CommentList} />

        {/* default route <Route component={LandingPage} /> */}
      </Switch>
    );
  }
}

export default withRouter(Routes);
