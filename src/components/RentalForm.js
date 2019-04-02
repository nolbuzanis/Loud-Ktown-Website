import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class RentalForm extends React.Component {
  showErrors = ({ touched, error }) => {
    if (touched && error) {
      return <div style={{ color: '#9f3a38' }}>{error}</div>;
    }
    return null;
  };

  renderInput = formProps => {
    return (
      <div
        className={`field ${
          formProps.meta.error && formProps.meta.touched ? 'error' : ''
        }`}
      >
        <label
          style={{
            color: 'white'
          }}
        >
          {formProps.label}
        </label>
        <input {...formProps.input} autoComplete='off' />
        {this.showErrors(formProps.meta)}
      </div>
    );
  };

  onSubmit(formValues) {
    //validate(formValues);
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className='ui form error'
      >
        <Field
          name='name'
          component={this.renderInput}
          type='text'
          label='Name'
        />
        <Field
          name='email'
          component={this.renderInput}
          type='text'
          label='Email'
        />
        <button className='ui teal button'>Submit</button>
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
  return errors;
};

const rentalForm = reduxForm({ form: 'rent', validate })(RentalForm);

export default connect()(rentalForm);
