import React from 'react';
import ReactDOM from 'react-dom';
import { CardElement, injectStripe } from 'react-stripe-elements';
import './CheckoutForm.css';
import { connect } from 'react-redux';
import history from '../history';

class CheckoutForm extends React.Component {
  state = {
    status: ''
  };

  submit = async e => {
    e.preventDefault();

    let { token } = await this.props.stripe.createToken({ name: 'Name' });
    let response = await fetch('/.netlify/functions/charge', {
      method: 'POST',
      body: JSON.stringify({
        amount: this.props.info.totalprice * 100,
        token: token.id
      })
    });

    if (response.ok) {
      this.setState({ status: 'complete' });
      console.log('Purchase Completed!');
    }
  };

  render() {
    if (!this.props.info) {
      history.push('/rent');
      return null;
    }
    if (this.state.status === 'complete') {
      return <div className='CheckoutForm-complete'>Payment Sucessful!</div>;
    }
    return ReactDOM.createPortal(
      <div
        className='modal-container'
        onClick={() => {
          history.push('/rent');
        }}
      >
        <div
          className='modal-body'
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <h2>Order Summary</h2>
          <ul className='summary-list'>
            <li>Name:{' ' + this.props.info.name}</li>
            <li>Email:{' ' + this.props.info.email}</li>
            <li>Phone:{' ' + this.props.info.phone}</li>
            <li>Address:{' ' + this.props.info.address}</li>
            <li>
              Dropoff on:
              {' ' + this.props.info.startdate.toString().substring(0, 15)}
            </li>
            <li>
              Pickup on:
              {' ' + this.props.info.enddate.toString().substring(0, 15)}
            </li>
            <li>Product:{' ' + this.props.info.package}</li>
            <li>Price/day:{' $' + this.props.info.dayprice}</li>
            <li>
              <h3>Total:{' $' + this.props.info.totalprice.toString()}</h3>
            </li>
          </ul>
          <div>
            <CardElement />
            <button onClick={e => this.submit(e)}>Submit</button>
          </div>
        </div>
      </div>,
      document.querySelector('#modal')
    );
  }
}

const mapStateToProps = state => {
  return { info: state.orders[0] };
};

export default connect(
  mapStateToProps,
  null
)(injectStripe(CheckoutForm));
