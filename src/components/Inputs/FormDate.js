import React from 'react'
import { FormInput } from 'react-form'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default class FormDate extends React.Component {
  constructor(props) {
    super(props);
    this.field = props.field;
    this.showErrors = props.showErrors;
    this.excludeDates = props.excludeDates;
    this.placeholderText = props.placeholderText;
    this.state = {
      selectedDate: props.value
    }
  }

  handleInputChange = (event, setValue) => {
    event.preventDefault();
    const val = event.target.value;
    this.setState({selectedDate: val}, () => {
      setValue(val);
    });
  }

  renderDatePicker = ({ setValue, getValue, setTouched }) => {
    if (typeof window.orientation !== 'undefined') {
      return (
        <input
          className="form__textinput"
          type="date"
          value={getValue()} // Set the value to the forms value
          onChange={(e) => this.handleInputChange(e, setValue)}
          onBlur={() => {
            setTouched()
          }} // And the same goes for touched
          valid={this.state.selectedDate}
          placeholder={getValue() ? '' : this.placeholderText}
        />
      )
    } else {
      return (
        <DatePicker
          className="form__textinput"
          placeholderText={this.placeholderText}
          value={getValue()} // Set the value to the forms value
          excludeDates={this.excludeDates}
          selected={this.state.selectedDate}
          onChange={(val) => {
            this.setState({selectedDate: val});
            setValue(moment(val).format('YYYY-MM-DD'));
          }}
          onBlur={() => setTouched()} // And the same goes for touched
        />
      )
    }
  }

  render() {
    return (
      <FormInput field={this.field} showErrors={this.showErrors}>
        {({ setValue, getValue, setTouched }) => {
          return (
            this.renderDatePicker({ setValue, getValue, setTouched })
          )
        }}
      </FormInput>
    )
  }
}
