import React from 'react';
import RentalForm from './RentalForm';
import { connect } from 'react-redux';

import Footer from './Footer';

class Rent extends React.Component {
  render() {
    return (
      <div>
        <RentalForm />
        <Footer />
      </div>
    );
  }
}

export default connect()(Rent);
