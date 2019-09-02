import React from "react";
import { bindActionCreators } from "redux"
import { Route, Switch } from "react-router-dom";
import {Router} from "react-router";
import {connect} from 'react-redux';
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Game from "./Components/Game/Game";
import Favorites from "./Components/Favorites/Favorites";
import RegisterUser from "./Components/login/RegisterUser";
import Users from "./Components/users/Users";
import LoginUser from "./Components/login/LoginUser";
import LeaderBoard from "./Components/Game/LeaderBoard";
import PrivateRoute from "./Components/PrivateRoute";
import axios from "axios";
import customHistory from './history';
import "./Views/App.css";
import {login, meFromTokenSuccess, meFromTokenFailure, resetUserToken} from './actions/SessionActions';

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

  // componentWillUnmount() {
  //   this.props.loadUserFromToken()
  // }

  componentDidMount() {
    this.props.loadUserFromToken()
    // this.props.loadUserFromToken();
    // axios
    //   .get("/users/userinfo")
    //   .then(res => {
    //     this.setState({
    //       user: res.data.userInfo,
    //       loggedIn: true
    //     });
    //   })
    //   .catch(err => {
    //     console.error("Error Getting User Info:", err);
    //   });
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

  render() {
    const {
      leaderBoardData,
      allBlogs
    } = this.state;

    const { classes,authenticatedUser, isAuthenticated } = this.props;
    const {
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
      <Router history={customHistory}>
      <JssProvider generateClassName={generateClassName}>
      <div className="app">
        <NavBar
          loggedIn={isAuthenticated}
          handleClick={handleClick}
          currentUser={authenticatedUser}
          getUserInfo={getUserInfo}
          logOut={logOut}
          classes={classes}
          getUserScore={getUserScore}
        />
        <Switch>
        <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginUser} />
          <Route
            exact path="/register"
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
          {/* <PrivateRoute path='/users' render={props => (
              <Users
                {...props}
                getUserInfo={getUserInfo}
                currentUser={authenticatedUser}
                getUserScore={getUserScore}
                allBlogs={allBlogs}
                getAllBlogPosts={getAllBlogPosts}
                classes={classes}
                loggedIn={isAuthenticated}
              />
            )} /> */}
          <Route
            path="/users"
            render={props => (
              <Users
                {...props}
                getUserInfo={getUserInfo}
                // currentUser={authenticatedUser}
                // loggedIn={isAuthenticated}
                getUserScore={getUserScore}
                allBlogs={allBlogs}
                getAllBlogPosts={getAllBlogPosts}
                classes={classes}
              />
            )}
          />
          <Route
            path="/game"
            component={Game}
          />
          {/* <Route
            path="/game"
            render={props => (
              <Game
                {...props}
                loggedIn={isAuthenticated}
                currentUser={authenticatedUser}
              />
            )}
          /> */}
          <Route
            path="/favorites"
            component={Favorites}/>
          {/* <Route
            path="/favorites"
            render={props => (
              <Favorites
                {...props}
                loggedIn={isAuthenticated}
                currentUser={authenticatedUser}
              />
            )}
          /> */}
          <Route
            path="/leaderboard"
            render={props => (
              <LeaderBoard
                {...props}
                loggedIn={isAuthenticated}
                currentUser={authenticatedUser}
                data={leaderBoardData}
                getLeaderBoard={getLeaderBoard}
              />
            )}
          />
        </Switch>
      </div>
      </JssProvider>
        </Router>
    );
  }
}

const mapStateToProps = state => ({
  authenticatedUser: state.sessionReducer.user,
  isAuthenticated: state.sessionReducer.userAuthenticated
})

const mapDispatchToProps = dispatch => ({
   loadUserFromToken: () => {
    let token = sessionStorage.getItem('jwtToken');
    if(!token || token === '') {//if there is no token, dont bother
      return;
    }

  //fetch user from token (if server deems it's valid token)
   dispatch(meFromTokenSuccess(token))
    //  .then((response) => {
    //    if (!response.error) {
    //      //reset token (possibly new token that was regenerated by the server)
    //      sessionStorage.setItem('jwtToken', response.payload.data.token);
    //      dispatch(meFromTokenSuccess(response.payload))
    //    } else {
    //      sessionStorage.removeItem('jwtToken');//remove token from storage
    //      dispatch(meFromTokenFailure(response.payload));
    //    }
    //  });
}
 })
export default connect(mapStateToProps, mapDispatchToProps)(App);
