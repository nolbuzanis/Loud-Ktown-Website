import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class RentalForm extends React.Component {
  renderInput(formProps) {
    console.log(formProps);
    return (
      <div>
        <label>{formProps.input.name}</label>
        <input
          onChange={formProps.input.onChange}
          value={formProps.input.value}
        />
      </div>
    );
  }

  render() {
    return (
      <form className='ui form'>
        <Field
          className='field'
          name='name'
          component={this.renderInput}
          type='text'
        />
        <Field
          className='field'
          name='email'
          component={this.renderInput}
          type='text'
        />
      </form>
    );
  }
}

const rentalForm = reduxForm({ form: 'rent' })(RentalForm);

export default connect()(rentalForm);
