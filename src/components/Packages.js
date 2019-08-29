import React from 'react';
import './Packages.css';
import { selectPackage } from '../actions/index';
import { connect } from 'react-redux';
import singleSpeaker from '../img/Single.jpg';
import doubleSpeaker from '../img/Double.png';

class Packages extends React.Component {
  generateList = list => {
    return list.map(item => {
      return <div className='item'>{item}</div>;
    });
  };

  submitPackage = service => {
    this.props.selectPackage(service);
  };

  renderPackageCard = packageInfo => {
    return packageInfo.map(service => {
      return (
        <div
          className='card'
          style={{ position: 'relative' }}
          onClick={() => this.submitPackage(service)}
        >
          <div
            style={{
              background: `url(${
                service.title === 'Single' ? singleSpeaker : doubleSpeaker
              }) center center no-repeat`,
              backgroundSize: 'cover',
              paddingBottom: '70%',
              width: '100%'
            }}
          ></div>
          <div className='content'>
            <div className='large header'>{service.title}</div>
            <div className='price'>${service.price}/day</div>
            <div className='description'>
              <p>{service.description}</p>
            </div>
            <div className='ui list' style={{ color: 'rgba(0,0,0,.75)' }}>
              {this.generateList(service.includes)}
            </div>
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
    price: 40,
    img: 'Single.jpg'
  },
  {
    title: 'Double',
    description:
      'Dual speakers for stereo action or for maximum sound coverage.',
    includes: ['Speaker x2', 'Stand x2', 'Setup', 'Delivery & Pickup'],
    price: 80,
    img: 'Double.jpg'
  }
];

export default connect(
  null,
  { selectPackage }
)(Packages);
