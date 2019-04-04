import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { submitOrder } from '../actions/index';
import DatePicker from 'react-datepicker';
import './RentalForm.css';
//import PackageOptions from './PackageOptions';

class RentalForm extends React.Component {
  state = {
    startDate: new Date(),
    endDate: new Date()
  };

  showErrors = ({ touched, error }) => {
    if (touched && error) {
      return <div style={{ color: '#9f3a38' }}>{error}</div>;
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
      <div
        className={`field ${
          formProps.meta.error && formProps.meta.touched ? 'error' : ''
        }`}
      >
        <label style={{ color: 'white' }}>{formProps.label}</label>
        <input {...formProps.input} autoComplete='off' />
        {this.showErrors(formProps.meta)}
      </div>
    );
  };

  renderSelect = formProps => {
    return (
      <select className='select-css' {...formProps.input}>
        <option value='single'>Single - $40 per day</option>
        <option value='double'>Double - $80 per day</option>
        <option value='deluxe'>Deluxe - $90 per day</option>
        <option value='conference'>Conference - $90 per day</option>
      </select>
    );
  };

  onSubmit = formValues => {
    formValues = {
      ...formValues,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };
    this.props.submitOrder(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className='ui form error'
      >
        <div className='two fields'>
          <Field
            name='firstname'
            component={this.renderInput}
            type='text'
            label='First Name'
          />
          <Field
            name='lastname'
            component={this.renderInput}
            type='text'
            label='Last Name'
          />
        </div>
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
        <div className='two fields'>
          <div className='field'>
            <label style={{ color: 'white' }}>Dropoff date</label>
            <DatePicker
              selected={this.state.startDate}
              selectsStart
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleChangeStart}
            />
          </div>
          <div className='field'>
            <label style={{ color: 'white' }}>Pickup date</label>
            <DatePicker
              selected={this.state.endDate}
              selectsEnd
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleChangeEnd}
            />
          </div>
        </div>
        <div className='two fields'>
          <div className='ten wide field'>
            <label style={{ color: 'white' }}>Select Package</label>
            <Field
              name='packageOptions'
              component={this.renderSelect}
              type='text'
            />
          </div>
          <div className='six wide field'>
            <label style={{ color: 'white', textAlign: 'center' }}>
              Package price/day
            </label>
            {this.packagePrice}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button className='ui teal button'>Submit</button>
        </div>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.firstname) {
    errors.firstname = 'Required';
  }
  if (!formValues.lastname) {
    errors.lastname = 'Required';
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
