import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import classNames from "classnames";
import TextField from "material-ui/TextField";
import Input, { InputLabel, InputAdornment } from "material-ui/Input";
import { FormControl } from "material-ui/Form";

import { withStyles } from "material-ui/styles";

import IconButton from "material-ui/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import RaisedButton from "material-ui/Button";
// import AppBar from "material-ui/AppBar";
import Profile from "../users/Profile";
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

class RegisterUser extends React.Component {

  state = {
    id: "",
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    user: "",
    email: "",
    validEmail: false,
    showPassword: false,
    registered: false,
    signUpMessage: "By signing up, you agree to our Terms and Privacy Policy"
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
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

  // Track username and password input inside state
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // When user submits form
  handleFormSubmit = e => {
    e.preventDefault();
    const { email, username, firstname, lastname, password } = this.state;

    axios
      .post("/users/register", {
        username: username,
        firstname: firstname,
        lastname: lastname,
        password: password,
        email: email
      })

      .then(res => {
        console.log("REZ from post:", res);
        this.setState({
          id: res.data.data.id,
          username: "",
          firstname: "",
          lastname: "",
          password: "",
          email: "",
          registered: true,
          message: "Registered user"
        });
        axios
          .post("users/score_zero", {
            id: this.state.id
          })
          .then(res => {
            console.log("state in zeroo:", this.state);
            console.log("Score RES:", res);
          })
          .catch(err => {
            console.log("settLE ERr:", err);
          });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          email: "",
          firstname: "",
          lastname: "",
          username: "",
          password: "",
          message: "Error registering user"
        });
      });
  };

  settleTheScore = () => {
    console.log("the state in settle the score", this.state);
    if (this.state.id === "") {
      return console.log("the id is empty:", this.state);
    }
    axios
      .post("users/score_zero", {
        user_id: this.state.id
      })
      .then(res => {
        console.log("Score RES:", res);
      })
      .catch(err => {
        console.log("settLE ERr:", err);
      });
  };

  render() {
    const {
      username,
      password,
      firstname,
      lastname,
      registered,
      showPassword,
      email
    } = this.state;
    const {
      handleClickShowPassword,
      handleMouseDownPassword,
      handleFormSubmit,
      handleInput
    } = this;
    const { classes } = this.props;
    if (registered) {
      return <Redirect to="/login" />;
    }
    return (
      <React.Fragment>
        <div className="login-user-container">
          <div className="loginBox">
            <h1 className="site-name"> Movie Fights </h1>

            <form id="register-form" onSubmit={handleFormSubmit}>
              <div className="login-user-username">
                <TextField
                  className={classes.textField}
                  id="with-placeholder"
                  label="Username"
                  name="username"
                  value={username}
                  placeholder="Username"
                  onChange={handleInput}
                  margin="normal"
                />
              </div>
              <br />
              <div className="login-user-firstname">
                <TextField
                  className={classes.textField}
                  id="with-placeholder"
                  label="First Name"
                  name="firstname"
                  value={firstname}
                  placeholder="First Name"
                  onChange={handleInput}
                  margin="normal"
                />
              </div>
              <br />
              <div className="login-user-lastname">
                <TextField
                  className={classes.textField}
                  id="with-placeholder"
                  label="Last Name"
                  name="lastname"
                  value={lastname}
                  placeholder="Last Name"
                  onChange={handleInput}
                  margin="normal"
                />
              </div>
              <br />
              <div className="login-user-email">
                <TextField
                  className={classes.textField}
                  id="with-placeholder"
                  label="Email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={handleInput}
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
                      onChange={handleInput}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
              </div>
              <br />
              <RaisedButton
                variant="Register"
                label="Register"
                type="submit"
                value="submit"
                primary={true}
                style={{ backgroundColor: "#253C78", color: "white" }}
              >
                Register
              </RaisedButton>
            </form>
            <br />
            <div className="smallerBox">
              <p className="dontHaveAcct">
                Already have an account?<Link
                  to="/login"
                  className="noUnderline"
                >
                  {" "}
                  Log In
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
export default withStyles(styles)(RegisterUser);
