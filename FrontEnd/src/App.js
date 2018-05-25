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
import Game from "./Components/Game/Game";
import Favorites from "./Components/Favorites/Favorites";
import RegisterUser from "./Components/login/RegisterUser";
import Users from "./Components/users/Users";
// import Profile from "./Components/users/Profile";
import LoginUser from "./Components/login/LoginUser";
import LeaderBoard from "./Components/Game/LeaderBoard";
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
      fireRedirect: false,
      leaderBoardData: null,
      allBlogs: null
    };
  }

  logOut = () => {
    axios
      .get("/users/logout")
      .then(res => {
        this.setState({
          loggedIn: false
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

getAllBlogPosts = () => {
  axios
    .get("/users/all_blogs")
    .then(res => {
      this.setState({
        allBlogs: res.data
      })
    })
    .catch(err => {
      console.log("Error Getting Blogs:", err)
    })
}

  getUserScore = () => {
    axios
      .get("/users/getcurrentscore")
      .then(res => {
        this.setState({
          score: res.data.data.points
        });
      })
      .catch(err => {
        console.log("Error getting user score:", err);
      });
  };

  handleMenu = event => {
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
  };

  getLeaderBoard = () => {
    axios
      .get("users/leaderboard")
      .then(response => {
        this.setState({
          leaderBoardData: response.data.data
        });
      })
      .catch(err => {
        console.log("error getting LeaderBoard:", err);
      });
  };

  componentDidMount() {
    const { user } = this.state;

    axios
      .get("/users/userinfo")
      .then(res => {
        this.setState({
          user: res.data.userInfo,
          loggedIn: true
        });
      })
      .catch(err => {
        console.log(`error getting user info`, err);
      })

    axios
      .get("/users/getcurrentscore")
      .then(res => {
        this.setState({
          score: res.data.data.points
        });
      }).then(
        this.getLeaderBoard()
      )
      .catch(err => {
        console.log("error getting score:", err);
      })
    
      axios
      .get("/users/all_blogs")
      .then(res => {
        this.setState({
          allBlogs: res.data.body
        });
      })
      .catch(err => {
        console.log("Error Getting Blogs:", err)
      })
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
      score,
      leaderBoardData,
      allBlogs
    } = this.state;
    const { classes } = this.props;
    const {
      handleInputChange,
      submitLoginForm,
      appLogIn,
      frontendRegister,
      getUserInfo,
      getUserScore,
      logOut,
      handleClick,
      getLeaderBoard,
      getAllBlogPosts
    } = this;
    let open = Boolean(anchorEl);

    console.log("all Blogs:::", allBlogs)
    return (
      <div className="entire-app">
        <NavBar
          loggedIn={loggedIn}
          handleClick={handleClick}
          currentUser={user}
          getUserInfo={getUserInfo}
          logOut={logOut}
          classes={classes}
          score={score}
          getUserScore={getUserScore}
        />

        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home user={user} message={message} loggedIn={loggedIn} />
            )}
          />

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
                score={score}
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
            render={props => (
              <Users
                {...props}
                score={score}
                getUserInfo={getUserInfo}
                currentUser={user}
                getUserScore={getUserScore}
                allBlogs={allBlogs}
                getAllBlogPosts={getAllBlogPosts}
              
              />
            )}
          />
          <Route
            path="/game"
            render={props => (
              <Game
                {...props}
                originalScore={score}
                loggedIn={loggedIn}
                currentUser={user}
                getUserScore={getUserScore}
              />
            )}
          />
          <Route
            path="/favorites"
            render={props => (
              <Favorites
                {...props}
                score={score}
                loggedIn={loggedIn}
                currentUser={user}
              />
            )}
          />
          <Route
            path="/leaderboard"
            render={props => (
              <LeaderBoard
                {...props}
                score={score}
                loggedIn={loggedIn}
                currentUser={user}
                data={leaderBoardData}
                getLeaderBoard={getLeaderBoard}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
