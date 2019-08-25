import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { connect } from 'react-redux';

class CheckoutForm extends React.Component {
  state = {
    status: ''
  };

  submit = async e => {
    e.preventDefault();

    // Callback function to parent component
    this.props.sendToGoogleSheet();

    this.setState({ status: 'submitting' });

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

  renderButton = () => {
    if (this.state.status === 'submitting') {
      return (
        <button onClick={e => this.submit(e)} className='ui teal fluid button'>
          Processing...
        </button>
      );
    }

    return (
      <button onClick={e => this.submit(e)} className='ui teal fluid button'>
        {`Pay: ${this.props.daysRented * this.props.package.price}.00`}
      </button>
    );
  };

  render() {
    if (this.state.status === 'complete') {
      return (
        <>
          <div
            style={{
              paddingTop: '40px',
              paddingBottom: '20px',
              fontSize: '28px',
              textAlign: 'center'
            }}
            className='CheckoutForm-complete'
          >
            Payment Sucessful!
          </div>
          <div>
            A reciept will be send to the email you provided above. We will be
            in touch to coordinate drop-off and pick-up times. Thank you for
            your purchase!
          </div>
        </>
      );
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
            {this.renderButton()}
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
