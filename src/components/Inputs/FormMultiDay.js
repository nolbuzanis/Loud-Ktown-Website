import React from 'react'
import { FormInput } from 'react-form'

export default class FormMultiDay extends React.Component {
  constructor(props) {
    super(props);
    this.field = props.field;
    this.rest = props.rest;
    this.multiDay = false;
  }

  render() {
    return (
      <FormInput field={this.field}>
        {({ setValue, getValue, setTouched }) => {
          return (
            <input type="checkbox" className="dn" id="dn"
              {...this.rest} // Send the rest of your props to React-Select
              value={getValue()} // Set the value to the forms value
              onChange={e => {
                this.multiDay = !this.multiDay;
                setValue(this.multiDay);
              }} // On Change, update the form value
              onBlur={() => setTouched()} // And the same goes for touched
            />
          )
        }}
      </FormInput>
    )
  }
}
