import React from 'react'
import { FormInput } from 'react-form'

export default class RadioInput extends React.Component {
  constructor(props) {
    super(props)
    this.value = props.value
  }

  render() {
    return (
      <FormInput field={this.field} showErrors={this.showErrors}>
        {({ setValue, getValue, setTouched }) => {
          return (
            <span
                onClick={() => {
                  setValue(this.value);
                }}
                role="radio"
                aria-checked="false"
                className="radio" // {checked ? radioStyles.radioChecked : radioStyles.radio}
                value={getValue()} // Set the value to the forms value
                onBlur={() => setTouched()} // And the same goes for touched
            >
            </span>
          )
        }}
      </FormInput>
    )
  }
};
