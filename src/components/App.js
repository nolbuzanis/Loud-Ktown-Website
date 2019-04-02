import React from 'react';
import Header from './Header';
import Landing from './Landing';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Landing />
      </div>
    );
  }
}

export default connect()(App);
