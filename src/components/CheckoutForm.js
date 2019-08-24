import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { connect } from 'react-redux';

class CheckoutForm extends React.Component {
  state = {
    status: ''
  };

  submit = async e => {
    e.preventDefault();

    try {
      let { token } = await this.props.stripe.createToken({ name: 'Name' });
      let response = await fetch('/.netlify/functions/charge', {
        method: 'POST',
        body: JSON.stringify({
          amount: this.props.daysRented * this.props.package.price * 100,
          token: token.id
        })
      });

      if (response.ok) {
        this.setState({ status: 'complete' });
        console.log('Purchase Completed!');
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (err) {
      this.setState({ status: 'error' });
    }
  };

  render() {
    if (this.state.status === 'complete') {
      return <div className='CheckoutForm-complete'>Payment Sucessful!</div>;
    }
    return (
      <div>
        <h2 style={{ paddingTop: '40px', fontSize: '28px' }}>
          Payment Information
        </h2>

        <div>
          <CardElement />
          <div
            style={{
              textAlign: 'center',
              paddingTop: '40px',
              paddingBottom: '50px'
            }}
          >
            <button
              onClick={e => this.submit(e)}
              className='ui teal fluid button'
            >
              Pay: ${this.props.daysRented * this.props.package.price}.00
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { package: state.selected.package };
};

export default connect(
  mapStateToProps,
  null
)(injectStripe(CheckoutForm));
