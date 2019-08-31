import React from 'react';
import Header from './Header';
import Landing from './Landing';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import Rent from './Rent';
import history from '../history';
import Faqs from './Faqs';

class App extends React.Component {
  render() {
    return (
      <>
        <Router history={history}>
          <Header />
          <Route path='/' exact component={Landing} />
          <Route path='/rent' exact component={Rent} />
          <Route path='/faqs' exact component={Faqs} />
        </Router>
      </>
    );
  }
}

export default connect()(App);
