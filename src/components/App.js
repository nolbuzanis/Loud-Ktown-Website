import React from 'react';
import Header from './Header';
import Landing from './Landing';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import Rent from './Rent';
import history from '../history';
import { StripeProvider } from 'react-stripe-elements';

class App extends React.Component {
  render() {
    return (
      <>
        <Router history={history}>
          <Header />
          <Route path='/' exact component={Landing} />
          <StripeProvider apiKey='pk_test_TYooMQauvdEDq54NiTphI7jx'>
            <Route path='/rent' exact component={Rent} />
          </StripeProvider>
        </Router>
      </>
    );
  }
}

export default connect()(App);
