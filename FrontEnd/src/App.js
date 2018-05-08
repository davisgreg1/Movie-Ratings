import React from "react";
import { Link, Route, Switch, Redirect } from "react-router-dom";

import { FormControl, FormHelperText } from "material-ui/Form";
import { FormControlLabel, FormGroup } from "material-ui/Form";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/Button";
import { Switch as MatUISwitch } from "material-ui/Switch";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "material-ui/Menu/MenuItem";
import IconButton from "material-ui/IconButton";
import Menu from "material-ui/Menu";
import { withStyles } from "material-ui/styles";

import Home from "./Components/Home";
import Game from "./Components/Game";
import RegisterUser from "./Components/login/RegisterUser";
import Users from "./Components/users/Users";
import Profile from "./Components/users/Profile";
import LoginUser from "./Components/login/LoginUser";
import axios from "axios";
import "./Views/App.css";
import NavBar from "./Components/NavBar";

//Styles for Material UI
const styles = {
  root: {
    height: "100%",
    flexGrow: 1
  },
  flex: {
    flex: 1,
    color: "white",
    paddingLeft: "0px"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      username: "",
      password: "",
      visitor: true,
      loggedIn: false,
      anchorEl: null,
      message: "",
      score: "",
      fireRedirect: false
    };
  }

  logOut = () => {
    axios
      .get("/users/logout")
      .then(res => {
        // this.props.logOutUser();
        this.setState({
          loggedOut: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getUserInfo = () => {
    axios
      .get("/users/userinfo")
      .then(res => {
        // Current
        let user = res.data.userInfo;
        let currentUser = this.state.user.username;
        if (!this.state.loggedIn) {
          this.setState({
            loggedIn: true,
            user: user
          });
        }
      })
      .catch(err => {
        this.setState({
          loggedIn: false
        });
      });
  };

  getUserScore = () => {
    console.log("the get user score user", this.state.user)
    axios
      .get("/users/getcurrentscore")
      .then(res => {
        console.log("score?", res);
        this.setState({
          score: res.data.data.points
        })
      })
      .catch(err => {
        console.log("err:", err);
      });
  };

  // Home is the feed screen
  renderProfile = () => {
    const { user } = this.state;
    if (user) {
      return <Profile user={user} />;
    } else {
      return <h1>Must be logged in</h1>;
    }
  };

  handleMenu = event => {
    console.log("event curr:", event.currentTarget);
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  frontendRegister = user => {
    this.setState({
      user: { username: user.username }
    });
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitLoginForm = e => {
    e.preventDefault();
    const { username, password, loggedIn } = this.state;

    if (username.length < 3) {
      this.setState({
        message: "Username length must be at least 3"
      });
      return;
    }
    axios
      .post("/users/login", {
        username: username,
        password: password
      })
      .then(res => {
        console.log(res.data);
        // this.props.setUser(res.data);
        this.setState({
          user: res.data,
          loggedIn: true
        });
      })
      .catch(err => {
        this.setState({
          username: "",
          password: "",
          message: "Username/Password not found"
        });
      });
      this.getUserScore();
  };



  appLogIn = () => {
    this.setState({
      loggedIn: true
    });
    this.getUserScore();
  };

  componentDidMount() {
    this.getUserInfo();
  }

  render() {
    const {
      user,
      visitor,
      loggedIn,
      anchorEl,
      username,
      password,
      message,
      fireRedirect,
      score
    } = this.state;
    const { classes } = this.props;
    const {
      handleInputChange,
      submitLoginForm,
      appLogIn,
      frontendRegister,
      getUserInfo,
      logOut,
      handleClick
    } = this;
    console.log("the score in state:", score)
    let open = Boolean(anchorEl);

    return (
      <div className="entire-app">
        {/* <div className={classes.root}> */}
        <NavBar
          loggedIn={loggedIn}
          handleClick={handleClick}
          user={user}
          getUserInfo={getUserInfo}
          logOut={logOut}
          classes={classes}
        />

        <Switch>
          <Route exact path="/" component={Home} />

          <Route
            path="/login"
            render={() => (
              <LoginUser
                handleInputChange={handleInputChange}
                submitLoginForm={submitLoginForm}
                user={user}
                username={username}
                password={password}
                message={message}
                loggedIn={loggedIn}
              />
            )}
          />
          <Route
            path="/register"
            render={() => {
              return (
                <RegisterUser
                  frontendRegister={frontendRegister}
                  appLogIn={appLogIn}
                />
              );
            }}
          />
          <Route
            path="/users"
            render={props => <Users {...props} currentUser={user} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
