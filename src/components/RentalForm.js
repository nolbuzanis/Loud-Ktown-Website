import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { submitOrder } from '../actions/index';
import DatePicker from 'react-datepicker';
import './RentalForm.css';

class RentalForm extends React.Component {
  state = {
    startDate: new Date(),
    endDate: new Date()
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
    this.setState({
      startDate: e
    });
    if (!(e.getTime() < this.state.endDate.getTime())) {
      this.setState({
        endDate: this.getNextDate(e)
      });
    }
  };

  handleChangeEnd = e => {
    this.setState({ endDate: e });
    if (e.getTime() < this.state.startDate.getTime()) {
      this.setState({
        startDate: this.getPreviousDate(e)
      });
    }
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

  onSubmit = formValues => {
    formValues = {
      ...formValues,
      startdate: this.state.startDate,
      enddate: this.state.endDate
    };
    this.props.submitOrder(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className='col s12'
      >
        <h1 className='form-title'>Place Your Order</h1>
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
        <Field
          name='selectedPackage'
          component={this.renderInput}
          type='text'
          label='Package'
        />
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
          <button className='ui teal large button'>Checkout</button>
        </div>
      </form>
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

const rentalForm = reduxForm({ form: 'rent', validate })(RentalForm);

export default connect(
  null,
  { submitOrder }
)(rentalForm);
