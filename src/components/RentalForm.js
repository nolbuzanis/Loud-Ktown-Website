import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { submitOrder } from '../actions/index';
import DatePicker from 'react-datepicker';
import './RentalForm.css';
import { Link } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import { StripeProvider, Elements } from 'react-stripe-elements';

class RentalForm extends React.Component {
  state = {
    startDate: new Date(),
    endDate: new Date(),
    daysRented: 1
  };

  sendValuesToGoogleSheet = () => {};

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
          <h4
            style={{
              display: 'inline',
              marginRight: '7px',
              paddingBottom: '10px'
            }}
            className='package-header'
          >
            {this.props.selected.package.title}
          </h4>
          <Link style={{ display: 'inline', color: '#64c5be' }} to='/#rent'>
            change
          </Link>
        </div>
        <div className='package-description'>
          {this.props.selected.package.description}
        </div>
        <ul>{this.generateList(this.props.selected.package.includes)}</ul>
        <span>Price/day: ${this.props.selected.package.price}</span>
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
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className='col s12'
        >
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
          {/*
        <div className='add-ons-section'>
          <h3>Add-ons</h3>
          <ul className='add-ons-list'>
            <Field
              name='extraspeaker'
              component={this.renderRadioButtons}
              type='checkbox'
              label='Extra Speaker & Stand - $40/day'
            />
            <Field
              name='partylights'
              component={this.renderRadioButtons}
              type='checkbox'
              label='Party Lights - $10/day'
            />
            <Field
              name='floodlights'
              component={this.renderRadioButtons}
              type='checkbox'
              label='Flood Lights - $10/day'
            />
            <Field
              name='mic'
              component={this.renderRadioButtons}
              type='checkbox'
              label='Wired Mic - $10/day'
            />
          </ul>
        </div> */}
          <StripeProvider apiKey={`${process.env.REACT_APP_STRIPE_SECRET}`}>
            <Elements>
              <CheckoutForm daysRented={this.state.daysRented} />
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
