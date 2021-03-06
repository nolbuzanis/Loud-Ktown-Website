import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { submitOrder } from '../actions/index';
import DatePicker from 'react-datepicker';
import './RentalForm.css';
import { Link } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import { StripeProvider, Elements } from 'react-stripe-elements';
import micImage from '../img/Mic.jpg';
import partyLightsImage from '../img/Lasers.jpg';
import floodLightsImage from '../img/FloodLight.jpg';

class RentalForm extends React.Component {
  state = {
    startDate: new Date(),
    endDate: new Date(),
    daysRented: 1,
    mic: false,
    partylights: false,
    floodlights: false,
    addons: 0
  };

  showErrors = ({ touched, error }) => {
    if (touched && error) {
      return (
        <div
          style={{
            color: '#9f3a38',
            position: 'absolute',
            fontSize: '12px',
            marginTop: '5px'
          }}
        >
          {error}
        </div>
      );
    }
    return null;
  };

  getNextDate(date) {
    const currentDay = date.getDate();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    return new Date(currentYear, currentMonth, currentDay + 1);
  }

  getPreviousDate(date) {
    const currentDay = date.getDate();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    return new Date(currentYear, currentMonth, currentDay - 1);
  }

  componentDidMount() {
    this.setState({
      endDate: this.getNextDate(this.state.startDate)
    });
  }

  handleChangeStart = e => {
    if (!(e.getTime() < this.state.endDate.getTime())) {
      this.setState({
        endDate: this.getNextDate(e)
      });
    }
    this.setState(
      {
        startDate: e
      },
      () => this.updatePackageDetails()
    );
  };

  handleChangeEnd = e => {
    if (e.getTime() < this.state.startDate.getTime()) {
      this.setState({
        startDate: this.getPreviousDate(e)
      });
    }

    this.setState({ endDate: e }, () => this.updatePackageDetails());
  };

  updatePackageDetails = () => {
    const millisecondsInADay = 24 * 60 * 60 * 1000;

    this.setState({
      daysRented: Math.ceil(
        (this.state.endDate.getTime() - this.state.startDate.getTime()) /
          millisecondsInADay
      )
    });
  };

  renderInput = formProps => {
    return (
      <div className='input-container'>
        <label
          className={
            formProps.meta.active || formProps.input.value !== ''
              ? 'active'
              : ''
          }
        >
          {formProps.label}
        </label>
        <input
          {...formProps.input}
          autoComplete='off'
          className='input-element input'
        />
        {this.showErrors(formProps.meta)}
      </div>
    );
  };

  onAddonClick = e => {
    var item = e.target;
    item.classList.toggle('addon-active');
    var overlay = item.children[0];
    overlay.classList.toggle('overlay-active');

    if (overlay.children[0].innerHTML === 'Mic') {
      if (!this.state.mic) {
        this.setState({ mic: true, addons: this.state.addons + 1 });
      } else {
        this.setState({ mic: false, addons: this.state.addons - 1 });
      }
    } else if (overlay.children[0].innerHTML === 'Party Lights') {
      if (!this.state.partylights) {
        this.setState({ partylights: true, addons: this.state.addons + 1 });
      } else {
        this.setState({
          partylights: false,
          addons: this.state.addons - 1
        });
      }
    } else if (overlay.children[0].innerHTML === 'Flood Lights') {
      if (!this.state.floodlights) {
        this.setState({ floodlights: true, addons: this.state.addons + 1 });
      } else {
        this.setState({ floodlights: false, addons: this.state.addons - 1 });
      }
    } else {
      console.log('Error: Add-on did not match records.');
    }
  };

  //googleSheets.post('', formValues);
  // POST req to google sheets database to store form values

  generateList = list => {
    return list.map(item => {
      return <div className='item'>{item}</div>;
    });
  };

  renderPackageDetails = () => {
    if (!this.props.selected.package) {
      this.props.selected.package = defaultPackage;
    }
    return (
      <>
        <div>
          <div>
            <h4
              style={{
                display: 'inline',
                marginRight: '7px'
              }}
              className='package-header'
            >
              {this.props.selected.package.title}
            </h4>
            <Link style={{ display: 'inline', color: '#64c5be' }} to='/#rent'>
              change
            </Link>
          </div>
          <div style={{ marginTop: '10px' }} className='package-description'>
            {this.props.selected.package.description}
          </div>
          <ul>{this.generateList(this.props.selected.package.includes)}</ul>
          <span>
            Price/day: <strong>${this.props.selected.package.price}</strong>
          </span>
        </div>
        <h4
          style={{
            display: 'inline',
            marginRight: '7px'
          }}
          className='package-header'
        >
          <div style={{ clear: 'both' }}></div>
          Add-ons
        </h4>
        <div className='ui grid container'>
          <div
            className='add-ons'
            style={{
              background: `url(${micImage}) center center no-repeat`,
              backgroundSize: 'cover'
            }}
            onClick={e => this.onAddonClick(e)}
          >
            <div className='addon-overlay'>
              <h5>Mic</h5>
              <span>+ $10/day</span>
            </div>
          </div>
          <div
            className='add-ons'
            style={{
              background: `url(${partyLightsImage}) center center no-repeat`,
              backgroundSize: 'cover'
            }}
            onClick={e => this.onAddonClick(e)}
          >
            <div className='addon-overlay'>
              <h5>Party Lights</h5>
              <span>+ $10/day</span>
            </div>
          </div>
          <div
            className='add-ons'
            style={{
              background: `url(${floodLightsImage}) center center no-repeat`,
              backgroundSize: 'cover'
            }}
            onClick={e => this.onAddonClick(e)}
          >
            <div className='addon-overlay'>
              <h5>Flood Lights</h5>
              <span>+ $10/day</span>
            </div>
          </div>
        </div>
      </>
    );
  };

  onSubmit = formValues => {
    formValues = {
      ...formValues,
      startdate: this.state.startDate,
      enddate: this.state.endDate,
      dayPrice: this.props.selected.package.price,
      totalPrice: this.props.selected.package.price * this.state.daysRented
    };
    this.props.submitOrder(formValues);
    console.log(formValues);
  };

  render() {
    return (
      <>
        <form className='col s12'>
          <h2
            className='form-title'
            style={{ textAlign: 'left', fontSize: '28px' }}
          >
            Place Your Order
          </h2>
          <Field
            name='name'
            component={this.renderInput}
            type='text'
            label='Name'
          />
          <div className='two fields'>
            <div className='ten wide field'>
              <Field
                name='email'
                component={this.renderInput}
                type='text'
                label='Email'
              />
            </div>
            <div className='six wide field'>
              <Field
                name='phone'
                component={this.renderInput}
                type='text'
                label='Phone'
              />
            </div>
          </div>
          <Field
            name='address'
            component={this.renderInput}
            type='text'
            label='Address'
          />
          <Field
            name='ambassador'
            component={this.renderInput}
            type='text'
            label='Hear about LOUD from an ambassador? Let us know their name.'
          />
          <div className='dates-container'>
            <div className='date-container'>
              <label>Drop-off Date</label>
              <DatePicker
                selected={this.state.startDate}
                selectsStart
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeStart}
              />
            </div>
            <div className='date-container'>
              <label>Pick-up Date</label>
              <DatePicker
                selected={this.state.endDate}
                selectsEnd
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeEnd}
              />
            </div>
          </div>

          <div className='package-details'>{this.renderPackageDetails()}</div>

          <StripeProvider apiKey={`${process.env.REACT_APP_STRIPE_PUBLIC}`}>
            <Elements>
              <CheckoutForm
                daysRented={this.state.daysRented}
                addons={this.state.addons}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                mic={this.state.mic}
                plights={this.state.partylights}
                flights={this.state.floodlights}
              />
            </Elements>
          </StripeProvider>
        </form>
      </>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.name) {
    errors.name = 'Required';
  }
  if (!formValues.email) {
    errors.email = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
  ) {
    errors.email = 'Invalid email address';
  }
  if (!formValues.phone) {
    errors.phone = 'Required';
  } else if (isNaN(Number(formValues.phone))) {
    errors.phone = 'Must be a number';
  }
  if (!formValues.address) {
    errors.address = 'Required';
  }
  return errors;
};

const defaultPackage = {
  title: 'Single',
  description: 'A premium speaker perfect for getting your party going.',
  includes: ['Speaker', 'Stand', 'Setup', 'Delivery & Pickup'],
  price: 40
};

const rentalForm = reduxForm({ form: 'rent', validate })(RentalForm);

const mapStateToProps = state => {
  return { selected: state.selected };
};

export default connect(
  mapStateToProps,
  { submitOrder }
)(rentalForm);
