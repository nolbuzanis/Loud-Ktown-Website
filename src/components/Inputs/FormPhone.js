import React from 'react'
import { FormInput } from 'react-form'

export default class FormPhone extends React.Component {
  constructor(props) {
    super(props)
    this.field = props.field
    this.showErrors = props.showErrors
    this.placeholder = props.placeholder
    this.type = props.type
    this.state = {
      value: props.value
    }
  }

  formatNumber = (number) => {
    number = number.replace(/\s/g, '');
    number = number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    return number
  }

  render() {
    return (
      <FormInput field={this.field} showErrors={this.showErrors}>
        {({ setValue, getValue, setTouched }) => {
          return (
            <input
              className="form__textinput"
              placeholder={this.placeholder}
              type={this.type}
              value={getValue()} // Set the value to the forms value
              onChange={(e) => {
                e.preventDefault()
                this.setState({value: e.target.value});
                setValue(this.formatNumber(e.target.value));
              }}
              onBlur={() => {
                setTouched()
              }} // And the same goes for touched
            />
          )
        }}
      </FormInput>
    )
  }
}
