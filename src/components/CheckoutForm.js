import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

class CheckoutForm extends React.Component {
  render() {
    return (
      <div>
        <p>Would you like to complete this purchase?</p>
        <CardElement />
        <button onClick={() => console.log('Clicked!')}>Submit</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
