import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Route, Link, Switch } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import classNames from "classnames";
import TextField from "material-ui/TextField";
import Input, { InputLabel, InputAdornment } from "material-ui/Input";
import { FormControl, FormHelperText } from "material-ui/Form";
import MenuItem from "material-ui/Menu/MenuItem";
import IconButton from "material-ui/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import RaisedButton from 'material-ui/Button';

import Profile from "./Profile";
import "../../Views/App.css";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  textField: {
    flexBasis: 200
  }
});

const ranges = [
  {
    value: "0-20",
    label: "0 to 20"
  },
  {
    value: "21-50",
    label: "21 to 50"
  },
  {
    value: "51-100",
    label: "51 to 100"
  }
];

class LoginUser extends React.Component {
  state = {
    showPassword: false,
    user: "",
    usernameInput: "",
    passwordInput: "",
    message: "Forgot password?",
    loggedIn: false
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm = e => {
    e.preventDefault();
    const { usernameInput, passwordInput, loggedIn } = this.state;

    if (usernameInput.length < 3) {
      this.setState({
        message: "Username length must be at least 3"
      });
      return;
    }
    axios
      .post("/users/login", {
        username: usernameInput,
        password: passwordInput
      })

      .then(res => {
        console.log(res.data);
        console.log(res.data);
        this.props.setUser(res.data);
        this.setState({
          user: res.data.username,
          loggedIn: true
        });
      })
      .catch(err => {
        this.setState({
          usernameInput: "",
          passwordInput: "",
          message: "Username/Password not found"
        });
      });
  };

  setUser = () => {
    const { user } = this.state;
    return <Profile user={user} />;
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  render() {
    const { usernameInput, passwordInput, message, loggedIn } = this.state;
    const { classes } = this.props;

    if (loggedIn) {
      return <Redirect to="/users/profile" />;
    }

    return (
      <React.Fragment>
        <div className="login-user-container">
          <div className="loginBox">
            <h1 className="site-name"> Movie Fights </h1>

            <form onSubmit={this.submitForm}>
              <div className="login-user-username">
                <TextField
                  className={classes.textField}
                  id="with-placeholder"
                  label="Username"
                  name="usernameInput"
                  value={usernameInput}
                  placeholder="Username"
                  onChange={this.handleInput}
                  margin="normal"
                />
              </div>
              <br />
              <div className="login-user-password">
                <div className={classes.root}>
                  <FormControl
                    className={classNames(classes.margin, classes.textField)}
                  >
                    <InputLabel htmlFor="adornment-password">
                      Password
                    </InputLabel>
                    <Input
                      id="adornment-password"
                      type={this.state.showPassword ? "text" : "password"}
                      value={this.state.passwordInput}
                      name="passwordInput"
                      onChange={this.handleInput}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {this.state.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
              </div>
              <br />
              <RaisedButton label="Log in" type="submit" value="Log in" primary={true} style={{backgroundColor:"grey", color: "white"}}/>
              {/* <input className="loginBtn" type="submit" value="Log in" /> */}
            </form>
            <br />
            <p className="messageSize">{message}</p>
            <div className="smallerBox">
              <p className="dontHaveAcct">
                Don't have an account?<Link
                  to="/users/new"
                  className="noUnderline"
                >
                  {" "}
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          <div className="getAppBox">
            <p className="getTheApp">Get Movie Fights Mobile!</p>
            <div className="appStore-container">
              <img
                className="appStore"
                src="https://i.imgur.com/UAP0XMk.png"
                alt="available on the app store"
                width="136"
                height="40"
              />
              <img
                src="https://i.imgur.com/1dnbtWG.png"
                alt="available on google play"
                width="136"
                height="40"
              />
            </div>
            <div className="c4q-container">
              <img
                src="https://i.imgur.com/EVU0sxy.png"
                alt="Coalition for Queens"
                width="100"
                height="30"
                align="center"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(LoginUser);
