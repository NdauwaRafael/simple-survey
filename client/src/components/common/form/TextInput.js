import React, { Component } from "react";
import PropTypes from "prop-types";

class TextInput extends Component {
  render() {
    const { name, value, label, error, onChange, type } = this.props;
    let validatorClass = "";
    let parentValidator = "";
    let errorMessageValidator = "";

    if (error.length > 0) {
      validatorClass = "is-invalid";
      parentValidator = "has-danger";
      errorMessageValidator = "invalid-feedback";
    } else {
      validatorClass = "";
      parentValidator = "";
      errorMessageValidator = "text-muted";
    }
    return (
      <div className={"form-group " + parentValidator}>
        <label htmlFor={name}>{label}</label>
        <input
          type={type ? type : "text"}
          value={value || ""}
          id={name}
          name={name}
          onChange={onChange}
          className={"form-control " + validatorClass}
          placeholder={label}
        />

        <small className={"form-text " + errorMessageValidator}>{error}</small>
      </div>
    );
  }
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

TextInput.defaultProps = {
  error: "",
  value: ""
};

export default TextInput;
