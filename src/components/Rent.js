import React from 'react';
import RentalForm from './RentalForm';
import { connect } from 'react-redux';
import CheckoutForm from './CheckoutForm';
import { Elements } from 'react-stripe-elements';

class Rent extends React.Component {
  render() {
    return (
      <div>
        <RentalForm />
        <Elements>
          <CheckoutForm />
        </Elements>
      </div>
    );
  }
}

export default connect()(Rent);
