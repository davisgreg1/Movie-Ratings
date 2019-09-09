import React from "react";
import { withRouter } from "react-router";
import { Link, Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import classNames from "classnames";
import TextField from "material-ui/TextField";
import Input, { InputLabel, InputAdornment } from "material-ui/Input";
import { FormControl } from "material-ui/Form";
import { withStyles } from "material-ui/styles";
import IconButton from "material-ui/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import RaisedButton from "material-ui/Button";
import {login} from '../../actions/SessionActions';

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
    username: "",
    password: "",
    message: "Forgot password?",
    fireRedirect: false,
    redirectToReferrer: false
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  submitLoginForm = e => {
    e.preventDefault();
    const { username, password } = this.state;

    if (username.length < 3) {
      this.setState({
        message: "Username length must be at least 3"
      });
      return;
    }
    this.props.loginUser(username, password);
    // if (this.props.isAuthenticated ) {
    //   this.setState({
    //     redirectToReferrer: true
    //   })
    // }
  };


  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { showPassword, password, username, message,redirectToReferrer } = this.state;
    const {classes,errorMsg,isAuthenticated}=this.props;
    const { handleClickShowPassword, handleMouseDownPassword,submitLoginForm,handleInputChange } = this;
    // const { from } = this.props.location.state.pathname || { from: { pathname: '/'} }
    // console.log("TCL: LoginUser -> render -> this.props.location.state.pathname", this.props.location.state.pathname)
    // console.log("TCL: LoginUser -> render -> from", from)

    // if (redirectToReferrer === true) {
    //   return <Redirect to={from} />
    // }

    return (
      <React.Fragment>
        <div className="login-user-container">
          <div className="loginBox">
            <h1 className="site-name"> Movie Fights </h1>
            <form className = "login-form" onSubmit={submitLoginForm}>
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
                      placeholder="Password"
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
              <p>{errorMsg}</p>
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

const mapStateToProps = state => ({
  // authenticatedUser: state.sessionReducer.user.data,
  isAuthenticated: state.sessionReducer.userAuthenticated,
  errorMsg: state.sessionReducer.errorMsg
})

const mapDispatchToProps = dispatch => ({
  loginUser: (username, password) => dispatch(login(username, password))
 })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginUser)));
