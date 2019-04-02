import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class RentalForm extends React.Component {
  renderInput(formProps) {
    return (
      <div>
        <label>{formProps.label}</label>
        <input {...formProps.input} />
      </div>
    );
  }

  onSubmit(formValues) {
    console.log(formValues);
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className='ui form'
      >
        <Field
          className='field'
          name='name'
          component={this.renderInput}
          type='text'
          label='Name'
        />
        <Field
          className='field'
          name='email'
          component={this.renderInput}
          type='text'
          label='Email'
        />
        <button className='ui primary button'>Submit</button>
      </form>
    );
  }
}

const rentalForm = reduxForm({ form: 'rent' })(RentalForm);

export default connect()(rentalForm);
