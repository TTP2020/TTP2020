import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import UserDocument from './components/UserDocument';
import Test from './components/Test';
import Comments from './components/Comments';
import Landing from './components/Landing/Landing';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/resume" component={UserDocument} />
        <Route exact path="/comments" component={Comments} />

        {/* default route <Route component={LandingPage} /> */}
      </Switch>
    );
  }
}

export default withRouter(Routes);
