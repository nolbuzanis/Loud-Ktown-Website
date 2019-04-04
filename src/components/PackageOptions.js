import React from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';

class PackageOptions extends React.Component {
  renderSelect(formProps) {
    return (
      <select className='select-css' {...formProps.select}>
        <option value='single'>Single</option>
        <option value='double'>Double</option>
        <option value='deluxe'>Deluxe</option>
        <option value='conference'>Conference</option>
      </select>
    );
  }

  packagePrice() {}

  render() {
    return (
      <div className='two fields'>
        <div className='ten wide field'>
          <label style={{ color: 'white' }}>Select Package</label>
          <Field name='packageOptions' component={this.renderSelect} />
        </div>
        <div className='six wide field'>
          <label style={{ color: 'white', textAlign: 'center' }}>
            Package price/day
          </label>
          {this.packagePrice}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { package: 123 };
};

export default connect(
  mapStateToProps,
  {}
)(PackageOptions);
