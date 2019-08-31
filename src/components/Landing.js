import React from 'react';
import { connect } from 'react-redux';
import Bars from './Bars';
import Contact from './Contact';
import Footer from './Footer';
import Packages from './Packages';
import { HashLink as Link } from 'react-router-hash-link';

import { animateScroll } from '../../node_modules/react-scrollchor/lib/helpers';

import speaker from '../img/speaker.png';

class Landing extends React.Component {
  _scrollToRent = e => {
    function easeOutQuad(x, t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    }
    e.preventDefault();
    const {
      // default animate object
      offset = 0,
      duration = 400,
      easing = easeOutQuad
    } = {};

    const animate = { offset, duration, easing };

    animateScroll('rent', animate);
  };

  render() {
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('S_KEY:', process.env.REACT_APP_STRIPE_SECRET);
    console.log('P_KEY:', process.env.REACT_APP_STRIPE_PUBLIC);
    console.log('GSheets:', process.env.REACT_APP_GOOGLE_SHEETS);

    return (
      <div className='container'>
        <section className='hero center'>
          <div className='hero__wrap'>
            <img style={{ height: '20em' }} src={speaker} alt='Speaker' />
            <div>
              <h2 className='hero__text'>
                Get <span className='hero__text--loud'>LOUD</span> Kingston.
              </h2>
              <Link className='btn btn--primary rent-callto' to='/#rent'>
                Rent Now
              </Link>
            </div>
            <img style={{ height: '20em' }} src={speaker} alt='Speaker' />
          </div>
          <Bars />
        </section>
        <section id='rent' className='dark center'>
          <div className='section__header--big'>Packages</div>
          <Packages />
        </section>
        <section id='contact' className='dark center'>
          <div className='section__header'>
            Special requests? More questions? Need a playlist?
          </div>
          <Contact />
        </section>
        <Footer />
      </div>
    );
  }
}

export default connect()(Landing);
