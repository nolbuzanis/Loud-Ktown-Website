import React from 'react';
import './Packages.css';

class Packages extends React.Component {
  generateList = list => {
    return list.map(item => {
      return <div className='item'>{item}</div>;
    });
  };

  renderPackageCard = packageInfo => {
    return packageInfo.map(service => {
      console.log(service);
      return (
        <div className='card' style={{ position: 'relative' }}>
          <div
            className='content'
            style={{
              paddingTop: '20px',
              paddingBottom: '20px',
              minHeight: '420px'
            }}
          >
            <div className='large header'>{service.title}</div>
            <div className='description'>
              <p>{service.description}</p>
            </div>
            <div className='ui list' style={{ color: 'rgba(0,0,0,.75)' }}>
              {this.generateList(service.includes)}
            </div>
            <div className='header price'>${service.price}/day</div>
            <button
              className='ui teal button'
              style={{
                width: '90%',
                borderRadius: '2px',
                margin: '0',
                boxShadow: 'rgba(0,0,0,0.5) 1px 1px 3px'
              }}
            >
              Select
            </button>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className='ui packageGrid' style={{ color: 'black' }}>
        {this.renderPackageCard(packageInfo)}
      </div>
    );
  }
}

const packageInfo = [
  {
    title: 'Single',
    description: 'A premium speaker perfect for getting your party going.',
    includes: ['Speaker', 'Stand', 'Setup', 'Delivery & Pickup'],
    price: 40
  },
  {
    title: 'Double',
    description:
      'Dual speakers for stereo action or for maximum sound coverage.',
    includes: ['Speaker x2', 'Stand x2', 'Setup', 'Delivery & Pickup'],
    price: 80
  },
  {
    title: 'Deluxe',
    description:
      'Speakers, lasers and disco lights for a guaranteed good time.',
    includes: [
      'Speaker x2',
      'Stand x2',
      'Lasers & Disco Light',
      'Bluetooth (optional)',
      'Setup, Delivery & Pickup'
    ],
    price: 90
  },
  {
    title: 'Conference',
    description: 'The ideal setup for your conference or speaking event.',
    includes: [
      'Speaker x2',
      'Stand x2',
      'Setup',
      'Microphone',
      'Delivery & Pickup'
    ],
    price: 90
  }
];

export default Packages;
