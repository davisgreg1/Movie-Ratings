import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Game from "./Components/Game/Game";
import Favorites from "./Components/Favorites/Favorites";
import RegisterUser from "./Components/login/RegisterUser";
import Users from "./Components/users/Users";
import LoginUser from "./Components/login/LoginUser";
import LeaderBoard from "./Components/Game/LeaderBoard";
import axios from "axios";
import "./Views/App.css";

//very fragile - if Material UI changes the classNames, the app breaks.
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';

import dotenv from "dotenv";
dotenv.load();

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'c',
});

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
      allBlogs: null,
      movie1: null,
      movie2: null,
      currentUser: "",
      winner: null,
      loser: null,
      movie1MoneyEarned: "",
      movie2MoneyEarned: "",
      movie1Revenue: "",
      movie2Revenue: "",
      movie1Budget: "",
      movie2Budget: "",
      hasBeenClicked: false
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
        console.error("Logout",err);
      });
  };

  getUserInfo = () => {
    axios
      .get("/users/userinfo")
      .then(res => {
        let user = res.data.userInfo;
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
          allBlogs: res.data.body
        });
      })
      .catch(err => {
        console.error("Error Getting Blogs:", err);
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
    const { username, password } = this.state;

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
        console.error("error getting LeaderBoard:", err);
      });
  };

  componentDidMount() {
    axios
      .get("/users/userinfo")
      .then(res => {
        this.setState({
          user: res.data.userInfo,
          loggedIn: true
        });
      })
      .catch(err => {
        console.error("Error Getting User Info:", err);
      });
  }

  render() {
    const {
      user,
      loggedIn,
      username,
      password,
      message,
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

    return (
      <JssProvider generateClassName={generateClassName}>
      <div className="app">
        <NavBar
          loggedIn={loggedIn}
          handleClick={handleClick}
          currentUser={user}
          getUserInfo={getUserInfo}
          logOut={logOut}
          classes={classes}
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
                  // getLeaderBoard={getLeaderBoard}
                />
              );
            }}
          />
          <Route
            path="/users"
            render={props => (
              <Users
                {...props}
                getUserInfo={getUserInfo}
                currentUser={user}
                getUserScore={getUserScore}
                allBlogs={allBlogs}
                getAllBlogPosts={getAllBlogPosts}
                classes={classes}
                loggedIn={loggedIn}
              />
            )}
          />
          <Route
            path="/game"
            render={props => (
              <Game
                {...props}
                loggedIn={loggedIn}
                currentUser={user}
              />
            )}
          />
          <Route
            path="/favorites"
            render={props => (
              <Favorites
                {...props}
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
                loggedIn={loggedIn}
                currentUser={user}
                data={leaderBoardData}
                getLeaderBoard={getLeaderBoard}
              />
            )}
          />
        </Switch>
      </div>
      </JssProvider>
    );
  }
}
export default App;