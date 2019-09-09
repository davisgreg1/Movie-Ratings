import React, {Suspense, lazy} from "react";
import {Route, Switch} from "react-router-dom";
import {Router} from "react-router";
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";
import NavBar from "./Components/NavBar";
import RegisterUser from "./Components/login/RegisterUser";
import customHistory from './history';
import "./Views/App.css";
import {login, meFromTokenSuccess, meFromTokenFailure, resetUserToken} from './actions/SessionActions';
import {getUserBlogs} from './actions/PostsActions';

const Users = lazy(() => import ("./Components/users/Users"));
const Favorites = lazy(() => import ("./Components/Favorites/Favorites"));
const LeaderBoard = lazy(() => import ("./Components/Game/LeaderBoard"));
const Game = lazy(() => import ("./Components/Game/Game"));
const LoginUser = lazy(() => import ("./Components/login/LoginUser"));
const Home = lazy(() => import ("./Components/Home"));

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

  componentDidMount() {
    this
      .props
      .loadUserFromToken()
  }

  getUserInfo = () => {
    axios
      .get("/users/userinfo")
      .then(res => {
        let user = res.data.userInfo;
        if (!this.state.loggedIn) {
          this.setState({loggedIn: true, user: user});
        }
      })
      .catch(err => {
        this.setState({loggedIn: false});
      });
  };

  handleMenu = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  frontendRegister = user => {
    this.setState({
      user: {
        username: user.username
      }
    });
  };

  getLeaderBoard = () => {
    axios
      .get("users/leaderboard")
      .then(response => {
        this.setState({leaderBoardData: response.data.data});
      })
      .catch(err => {
        console.error("error getting LeaderBoard:", err);
      });
  };

  render() {
    const {leaderBoardData, allBlogs} = this.state;

    const {classes, authenticatedUser, isAuthenticated, allUserBlogs, logOutCurrentUser} = this.props;
    const {
      appLogIn,
      frontendRegister,
      getUserInfo,
      getUserScore,
      handleClick,
      getLeaderBoard
    } = this;

    return (
      <Router history={customHistory}>
        <div className="app">
          <NavBar
            loggedIn={isAuthenticated}
            handleClick={handleClick}
            currentUser={authenticatedUser}
            getUserInfo={getUserInfo}
            classes={classes}
            getUserScore={getUserScore}/>
          <Suspense
            fallback={< div className = "loadingCircle" > <CircularProgress/> < /div>}>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/login" component={LoginUser}/>
              <Route
                exact
                path="/register"
                render={() => {
                return (<RegisterUser frontendRegister={frontendRegister} appLogIn={appLogIn}/>);
              }}/>
              <Route
                path="/users"
                render={props => (<Users
                {...props}
                getUserScore={getUserScore}
                allBlogs={allUserBlogs}
                classes={classes}/>)}/>
              <Route path="/game" component={Game}/>
              <Route path="/favorites" component={Favorites}/>
              <Route
                path="/leaderboard"
                render={props => (<LeaderBoard
                {...props}
                loggedIn={isAuthenticated}
                currentUser={authenticatedUser}
                data={leaderBoardData}
                getLeaderBoard={getLeaderBoard}/>)}/>
            </Switch>
          </Suspense>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({authenticatedUser: state.sessionReducer.user, isAuthenticated: state.sessionReducer.userAuthenticated, allUserBlogs: state.postsReducer.posts})

const mapDispatchToProps = dispatch => ({
  loadUserFromToken: () => {
    let token = sessionStorage.getItem('jwtToken');
    if (!token || token === '') {
      return;
    }
    dispatch(meFromTokenSuccess(token))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
