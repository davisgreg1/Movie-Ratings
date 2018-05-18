import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Route, Link, Switch } from "react-router-dom";
import classNames from "classnames";
import TextField from "material-ui/TextField";
import Input, { InputLabel, InputAdornment } from "material-ui/Input";
import { FormControl, FormHelperText } from "material-ui/Form";
import MenuItem from "material-ui/Menu/MenuItem";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import RaisedButton from "material-ui/Button";

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

class LoginUser extends React.Component {
  state = {
    showPassword: false,
    user: "",
    usernameInput: "",
    passwordInput: "",
    message: "Forgot password?",
    loggedIn: false,
    fireRedirect: false
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  async submitLoginForm(e){
    e.preventDefault();
    const { usernameInput, passwordInput, loggedIn } = this.state;

    if (usernameInput.length < 3) {
      this.setState({
        message: "Username length must be at least 3"
      });
      return;
    }
    const res = await axios
      .post("/users/login", {
        username: usernameInput,
        password: passwordInput
      })
      .then(res => {
        console.log(res.data);
        this.props.setUser(res.data);
        // this.setState({
        //   user: res.data.username,
        //   loggedIn: true
        // });
      })
      .catch(err => {
        this.setState({
          usernameInput: "",
          passwordInput: "",
          message: "Username/Password not found"
        });
      });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  render() {
    const { fireRedirect, showPassword } = this.state;
    const {
      classes,
      loggedIn,
      user,
      username,
      password,
      message,
      handleInputChange,
      submitLoginForm
    } = this.props;
    const { handleClickShowPassword, handleMouseDownPassword } = this;

    if (loggedIn) {
      return <Redirect to= {`/users/${user.username}`}/>;
    }

    return (
      <React.Fragment>
        <div className="login-user-container">
          <div className="loginBox">
            <h1 className="site-name"> Movie Fights </h1>

            <form onSubmit={submitLoginForm}>
              <div className="login-user-username">
                <TextField
                  className={classes.textField}
                  id="with-placeholder"
                  label="Username"
                  name="username"
                  value={username}
                  placeholder="Username"
                  onChange={handleInputChange}
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
                      type={showPassword ? "text" : "password"}
                      value={password}
                      name="password"
                      onChange={handleInputChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? (
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
              <RaisedButton
                variant="log in"
                label="Log in"
                type="submit"
                value="Log in"
                primary={true}
                style={{ backgroundColor: "#253C78", color: "white" }}
              >
                Log in
              </RaisedButton>
            </form>
            <br />
            <p className="messageSize">{message}</p>
            <div className="smallerBox">
              <p className="dontHaveAcct">
                Don't have an account?<Link
                  to="/register"
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