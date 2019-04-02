import React from 'react'
import { FormInput } from 'react-form'

export default class FormDayNight extends React.Component {
  constructor(props) {
    super(props);
    this.field = props.field;
    this.rest = props.rest;
    this.night = false;
  }

  render() {
    return (
      <FormInput field={this.field}>
        {({ setValue, getValue, setTouched }) => {
          return (
            <div className="toggleWrapper">
              <input type="checkbox" className="dn" id="dn"
                {...this.rest} // Send the rest of your props to React-Select
                value={getValue()} // Set the value to the forms value
                onChange={() => {
                  this.night = !this.night;
                  setValue(this.night);
                }} // On Change, update the form value
                onBlur={() => setTouched()} // And the same goes for touched
              />
              <label htmlFor="dn" className="toggle">
                <span className="toggle__handler">
                  <span className="crater crater--1"></span>
                  <span className="crater crater--2"></span>
                  <span className="crater crater--3"></span>
                </span>
                <span className="star star--1"></span>
                <span className="star star--2"></span>
                <span className="star star--3"></span>
                <span className="star star--4"></span>
                <span className="star star--5"></span>
                <span className="star star--6"></span>
              </label>
            </div>
          )
        }}
      </FormInput>
    )
  }
}
