import React from 'react';
import Header from './Header';
import Landing from './Landing';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import Rent from './Rent';
import history from '../history';

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Router history={history}>
          <Route path='/' exact component={Landing} />
          <Route path='/rent' exact component={Rent} />
        </Router>
      </>
    );
  }
}

export default connect()(App);
