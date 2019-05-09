import React from 'react';
import Header from './Header';
import Landing from './Landing';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import Rent from './Rent';
import history from '../history';
import { StripeProvider, Elements } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import keys from '../apis/stripe';

class App extends React.Component {
  render() {
    return (
      <>
        <Router history={history}>
          <Header />
          <Route path='/' exact component={Landing} />
          <Route path='/rent' exact component={Rent} />
          <StripeProvider apiKey={keys.public}>
            <Elements>
              <Route path='/checkout' exact component={CheckoutForm} />
            </Elements>
          </StripeProvider>
        </Router>
      </>
    );
  }
}

export default connect()(App);
