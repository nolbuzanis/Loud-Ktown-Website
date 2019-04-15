import React from 'react';
import RentalForm from './RentalForm';
import { connect } from 'react-redux';

class Rent extends React.Component {
  render() {
    return (
      <div>
        <RentalForm />
      </div>
    );
  }
}

export default connect()(Rent);
