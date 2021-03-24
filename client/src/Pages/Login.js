import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginUser } from "../Redux/actions/auth/index";

import TextInput from "../components/common/form/TextInput";
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {
        email: "",
        password: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(event) {
    let field = event.target.name;
    let value = event.target.value;

    this.setState({
      [field]: value
    });
  }

  validEmail(email) {
    const emailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
    return emailRegex.test(String(email).toLowerCase());
  }

  isFormValid() {
    const { email, password } = this.state;

    let isValid = true;

    if (!email || !this.validEmail(email)) {
      isValid = false;
      this.setState({
        errors: {
          ...this.state.errors,
          email: "Please enter a valid email"
        }
      });
    } else if (!password) {
      this.setState({
        errors: {
          ...this.state.errors,
          password: "Please enter a valid password!"
        }
      });
    }

    return isValid;
  }

  handleLogin() {
    if (!this.isFormValid()) {
      return;
    }
    const { email, password } = this.state;
    this.props.loginUser(email, password);
  }

  render() {
    const { email, password, errors } = this.state;

    return (
      <div className="card">
        <div className="card-body">
          <TextInput
            error={errors.email}
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={this.handleChange}
          />

          <TextInput
            error={errors.password}
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
          />

          <div className="mt-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: bindActionCreators(loginUser, dispatch)
  };
};
const mapStateToProps = ({ auth: { authError }, auth }) => {
  return {
    auth,
    authError
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
