import React from 'react';
import Header from './Header';
import Landing from './Landing';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RentalForm from './RentalForm';

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Router>
          <Route path='/' exact component={Landing} />
          <Route path='/rent' exact component={RentalForm} />
        </Router>
      </>
    );
  }
}

export default connect()(App);
