import React from 'react';
import Bars from './Bars';
import Contact from './Contact';
import Footer from './Footer';

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
    return (
      <div className='container'>
        <section className='hero center'>
          <div className='hero__wrap'>
            <img style={{ height: '20em' }} src={speaker} alt='Speaker' />
            <div>
              <h2 className='hero__text'>
                Get <span className='hero__text--loud'>LOUD</span> Kingston.
              </h2>
              <button className='btn btn--primary' onClick={this._scrollToRent}>
                Rent Now
              </button>
            </div>
            <img style={{ height: '20em' }} src={speaker} alt='Speaker' />
          </div>
          <Bars />
        </section>
        <section id='rent' className='dark center'>
          <div className='section__header--big'>Rental Options</div>
        </section>
        <section id='FAQ' className='light center'>
          <div className='section__header--big'>FAQs</div>
          <div className='section__header'>Why should I rent from you?</div>
          <div className='section__content'>
            It's easy and it's cheap. We have competitive pricing that includes
            delivery service. You don't have to worry about finding the right
            speakers, picking them up, carrying them (they're heavy!),
            determining how all of the weird connector shapes fit together,
            un-tangling beer-covered cords, and waking up to return the speakers
            the next day. All you have to do is place the order.
          </div>
          <div className='section__header'>
            What happens once I place an order?
          </div>
          <div className='section__content'>
            Once your order is placed, you will receive a receipt by email.
            You'll then be contacted via text to set up a delivery time. We'll
            deliver and set up the speakers, and pick them up the following day.
          </div>
          <div className='section__header'>What time is pick-up/delivery?</div>
          <div className='section__content'>
            Pick up and delivery are organized ahead of time by text and
            typically take place between the hours of 5PM and 8PM for delivery,
            and 9AM and 12PM for pickup.
          </div>
          <div className='section__header'>
            Two speakers isn't enough, I want 3-4. Is this possible?
          </div>
          <div className='section__content'>
            If you're looking to really make some noise then feel free to
            contact me at{' '}
            <a className='link' href='tel:16475323221'>
              (647) 532-3221
            </a>{' '}
            and we can work out a deal.
          </div>
          <div className='section__header'>
            Do you always have speakers available?
          </div>
          <div className='section__content'>
            NO. Be forewarned...this business operates on a
            first-pay-first-reserved basis. Get your order in as soon as you
            know you're having a party or else you run the risk of disappointing
            your party guests with a lame sound source. As we all know... the
            music can make or break a party.
          </div>
          <div className='section__header'>
            What is your cancellation policy?
          </div>
          <div className='section__content'>
            Try not to book until you're sure. When speakers are reserved, other
            rental requests are turned away. If you cancel less than 24 hours in
            advance, I will do my best to find another customer; however, if I
            don't, I have to charge 75% of the rental fee.
          </div>
          <div className='section__header'>What about damage?</div>
          <div className='section__content'>
            Damage to your ears from cranking the volume? Or damage to the
            speakers? The speakers are very durable commercial quality. If,
            however, they somehow become damaged, you will be responsible for
            the majority cost of the repair/replacement.
          </div>
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

export default Landing;
