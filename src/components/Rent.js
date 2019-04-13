import React from 'react';
import RentalForm from './RentalForm';
import { connect } from 'react-redux';

class Rent extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: '#2b2c43' }}>
        <RentalForm />
      </div>
    );
  }
}

export default connect()(Rent);
