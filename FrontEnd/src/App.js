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

import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Game from "./Components/Game/Game";
import Favorites from "./Components/Favorites/Favorites";
import RegisterUser from "./Components/login/RegisterUser";
import Users from "./Components/users/Users";
import LoginUser from "./Components/login/LoginUser";
import LeaderBoard from "./Components/Game/LeaderBoard";

import currencyFormatter from "currency-formatter";
import swal from "sweetalert2";
import axios from "axios";

import "./Views/App.css";

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
const API_KEY = "d3b24aad8f7a69f5d20f89822a6102f8";
const baseURL = `http://image.tmdb.org/t/p/w185`;
const idArr = [
  "tt0111161",
  "tt0068646",
  "tt0071562",
  "tt0468569",
  "tt0050083",
  "tt0108052",
  "tt0110912",
  "tt0167260",
  "tt0060196",
  "tt0137523",
  "tt0120737",
  "tt0109830",
  "tt0080684",
  "tt1375666",
  "tt0167261",
  "tt0073486",
  "tt0099685",
  "tt0133093",
  "tt0047478",
  "tt0076759",
  "tt0120382",
  "tt0107290",
  "tt0477348",
  "tt0395169",
  "tt1201607",
  "tt0264464",
  "tt1856101",
  "tt0435761",
  "tt0361748",
  "tt0180093",
  "tt0054215",
  "tt1675434",
  "tt0120815",
  "tt5580390",
  "tt3501632",
  "tt1485796",
  "tt2283362",
  "tt1259528",
  "tt2527336",
  "tt2380307",
  "tt4765284",
  "tt5052448",
  "tt1615160",
  "tt0451279",
  "tt4574334",
  "tt1396484",
  "tt5463162",
  "tt4154756",
  "tt3778644",
  "tt1677720"
];
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
      // gameMessage: "",
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
      score: "",
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
          allBlogs: res.data.body
        });
      })
      .catch(err => {
        console.log("Error Getting Blogs:", err);
      });
  };

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

  postScore = () => {
    const { user } = this.state;
    const { score } = this.state;

    axios
      .patch("users/score_update", {
        points: score,
        id: user.id
      })
      .then(res => {
        console.log("Postedscore:", res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getTwoMovies = () => {
    this.setState({
      hasBeenClicked: false
    });

    let randomMovieID1 = `${idArr[Math.floor(Math.random() * idArr.length)]}`;
    let randomMovieID2 = `${idArr[Math.floor(Math.random() * idArr.length)]}`;
    axios
      .get(
        `http://api.themoviedb.org/3/movie/${randomMovieID1}?api_key=${API_KEY}`
      )
      .then(response => {
        console.log("THis is response in Game's APP.js:", response);
        this.setState({
          movie1: response,
          movie1Revenue: response.data.revenue,
          movie1Budget: response.data.budget,
          movie1MoneyEarned: eval(response.data.revenue - response.data.budget)
        });
      })
      .then(
        axios
          .get(
            `http://api.themoviedb.org/3/movie/${randomMovieID2}?api_key=${API_KEY}`
          )
          .then(response => {
            this.setState({
              movie2: response,
              movie2Revenue: response.data.revenue,
              movie2Budget: response.data.budget,
              movie2MoneyEarned: eval(
                response.data.revenue - response.data.budget
              )
            });
          })
          .then(() => {
            this.setState({
              winner:
                this.state.movie1MoneyEarned >= this.state.movie2MoneyEarned
                  ? this.state.movie1.data
                  : this.state.movie2.data,
              loser:
                this.state.movie1MoneyEarned <= this.state.movie2MoneyEarned
                  ? this.state.movie1.data
                  : this.state.movie2.data
            });
          })
          .catch(error => {
            console.error(error);
          })
      )
      .catch(error => {
        console.log(error);
      });
  };

  getWinner = e => {
    if (
      e.target.title !== this.state.winner.original_title &&
      e.target.title !== this.state.loser.original_title
    ) 
    {
      window.location.reload();
    }
    console.log("e:", e);
    e.preventDefault();
    const {
      winner,
      loser,
      user,
      movie1,
      movie2,
      movie1MoneyEarned,
      movie2MoneyEarned,
      score,
      hasBeenClicked
    } = this.state;
    const { currentUser, originalScore, getUserScore } = this.state;
    let diff = movie1MoneyEarned - movie2MoneyEarned;

    if (e.target.title === winner.original_title && !hasBeenClicked) {
      console.log("winner?:", winner);
      this.setState({
        score: (this.state.score += 10),
        hasBeenClicked: true
      });
      swal({
        title: "Sweet!",
        customClass: "animated rubberBand",
        html: `<div id="win-win"><span id="swal-message-right"><h6 className="swal-alert">Yes, ${
          user.firstname
        }! ${winner.original_title} grossed ${currencyFormatter.format(
          Math.abs(winner.revenue),
          {
            code: "USD"
          }
        )} and it made <h2> ${currencyFormatter.format(Math.abs(diff), {
          code: "USD"
        })}</h2> more than ${
          loser.original_title
        }</h6 className="swal-alert"></span></div>`,
        background: `#eee url(${baseURL}${winner.backdrop_path}) space`,
        backdrop: `
        rgba(0,255,0,0.5)`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        animation: false
      });
    }
    if (e.target.title === loser.original_title) {
      swal({
        title: "Sorry!",
        customClass: "animated shake",
        html: `<span id="swal-message"><h6>${
          e.target.title
        } grossed ${currencyFormatter.format(Math.abs(loser.revenue), {
          code: "USD"
        })}, but didn't earn more in profits than ${
          winner.original_title
        }.</h6></span>`,
        background: `#eee url(${baseURL}${loser.backdrop_path}) space`,
        backdrop: `
        rgba(255,0,0,0.5)`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        animation: false
      });
      if (hasBeenClicked) {
        this.setState({
          score: (this.state.score += 0)
        });
      }
    }
    this.postScore();
    // }, 0);
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
        console.log("Error Getting User Info:", err);
      });

    axios
      .get("/users/getcurrentscore")
      .then(res => {
        this.setState({
          score: res.data.data.points
        });
      })
      .then(this.getLeaderBoard())
      .catch(err => {
        console.log("Error Getting Score:", err);
      });
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
      allBlogs,
      gameMessage,
      movie1,
      movie2,
      currentUser,
      winner,
      loser,
      movie1MoneyEarned,
      movie2MoneyEarned,
      hasBeenClicked
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
      getAllBlogPosts,
      getTwoMovies,
      getWinner
    } = this;
    let open = Boolean(anchorEl);

    return (
      <div className="app">
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
                classes={classes}
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
                getLeaderBoard={getLeaderBoard}
                gameMessage={gameMessage}
                movie1={movie1}
                movie2={movie2}
                winner={winner}
                loser={loser}
                movie1MoneyEarned={movie1MoneyEarned}
                movie2MoneyEarned={movie2MoneyEarned}
                score={score}
                hasBeenClicked={hasBeenClicked}
                getTwoMovies={getTwoMovies}
                getWinner={getWinner}
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