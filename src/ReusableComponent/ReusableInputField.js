import React, { Component } from 'react'

class ReusableInputField extends Component {
  render() {
    return (
      <div className="form-group row">
        {/* Label For Input Field - Sudama [13/06/2020] */}
        <label htmlFor={this.props.id} className="col-sm-4 col-form-label">{`Player ${this.props.index + 1} Name`}</label>
        <div className="col-sm-8">
          {/* Input Field Code - Sudama [13/06/2020] */}
          <input
            type={this.props.type}
            id={this.props.id}
            placeholder={this.props.placeholder}
            onChange={this.props.onchange}
            value={this.props.value}
            className="form-control"
            required
          />
        </div>
      </div>
    )
  }
}

export default ReusableInputField;
