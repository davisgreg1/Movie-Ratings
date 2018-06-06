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

import currencyFormatter from "currency-formatter";
import swal from "sweetalert2";
import axios from "axios";

import "./Views/App.css";

const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY;
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
  "tt1615160",
  "tt0451279",
  "tt4574334",
  "tt5580390",
  "tt3501632",
  "tt0109830",
  "tt0080684",
  "tt1375666",
  "tt0167261",
  "tt0073486",
  "tt0099685",
  "tt0133093"
];
const idArr1 = [
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
  "tt1675434",
  "tt0120815",
  "tt0361748",
  "tt0180093",
  "tt0054215",
  "tt1485796",
  "tt2283362",
  "tt1259528",
  "tt2527336",
  "tt2380307",
  "tt4765284",
  "tt5052448",
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
        console.log(err);
      });
  };

  getUserInfo = () => {
    axios
      .get("/users/userinfo")
      .then(res => {
        // Current
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

    let randomMovieID2 = `${idArr1[Math.floor(Math.random() * idArr1.length)]}`;
    axios
      .get(
        `http://api.themoviedb.org/3/movie/${randomMovieID1}?api_key=${TMDB_KEY}`
      )
      .then(response => {
        console.log("THis is response in Game's APP.js:", response);
        this.setState({
          movie1: response,
          movie1Revenue: response.data.revenue,
          movie1Budget: response.data.budget,
          // eslint-disable-next-line
          movie1MoneyEarned: eval(response.data.revenue - response.data.budget)
        });
      })
      .then(
        axios
          .get(
            `http://api.themoviedb.org/3/movie/${randomMovieID2}?api_key=${TMDB_KEY}`
          )
          .then(response => {
            this.setState({
              movie2: response,
              movie2Revenue: response.data.revenue,
              movie2Budget: response.data.budget,
              // eslint-disable-next-line
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
    if (!this.state.winner && !this.state.loser) {
      window.location.reload();
    }
    e.preventDefault();
    const {
      winner,
      loser,
      user,
      movie1MoneyEarned,
      movie2MoneyEarned,
      hasBeenClicked
    } = this.state;

    let diff = movie1MoneyEarned - movie2MoneyEarned;
    let currentTargetJoined = e.currentTarget.innerText.split(" ").join("").trim();
    let winnerJoined = winner.original_title.split(" ").join("").trim();
    let loserJoined = loser.original_title.split(" ").join("").trim();
    debugger;
    if (currentTargetJoined === winnerJoined && !hasBeenClicked) {
      this.setState({
        // eslint-disable-next-line
        score: (this.state.score += 10),
        hasBeenClicked: true
      });
      if (hasBeenClicked) {
        this.setState({
          // eslint-disable-next-line
          score: (this.state.score += 0)
        });
      }
      swal({
        customClass: "animated rubberBand",
        html: `<div id="win-win"><span id="swal-message-right"><h6 className="swal-alert">Yes, ${
          user.firstname
        }! ${winner.original_title} made approximately <h2> ${currencyFormatter.format(Math.abs(diff), {
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
        animation: false,
        confirmButtonColor: "#02182b",
        showLoaderOnConfirm: true
      }).then(this.getTwoMovies())
    }
    if (currentTargetJoined === loserJoined) {
      this.setState({
        hasBeenClicked: true
      });
      swal({
        customClass: "animated shake",
        html: `<div id="win-win"><span id="swal-message"><h6>Sorry, ${
          user.firstname
        }... ${
          e.target.title
        }  made approximately <h2>${currencyFormatter.format(Math.abs(diff), {
          code: "USD"
        })}</h2> less than ${
          winner.original_title
        }.</h6></span></div>`,
        // background: `#eee url(${baseURL}${loser.backdrop_path}) space`,
        backdrop: `
        rgba(255,0,0,0.5)`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        animation: false,
        confirmButtonColor: "#02182b",
        showLoaderOnConfirm: true
      }).then(this.getTwoMovies())
    }
    if (!hasBeenClicked) {
      this.postScore();
    }
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
      loggedIn,
      username,
      password,
      message,
      score,
      leaderBoardData,
      allBlogs,
      movie1,
      movie2,
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
                loggedIn={loggedIn}
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

/**
|--------------------------------------------------
| Line 101:  Duplicate key 'score'                               no-dupe-keys
  Line 125:  'currentUser' is assigned a value but never used    no-unused-vars
  Line 188:  'loggedIn' is assigned a value but never used       no-unused-vars
  Line 264:  eval can be harmful                                 no-eval
  Line 277:  eval can be harmful                                 no-eval
  Line 313:  'movie1' is assigned a value but never used         no-unused-vars
  Line 314:  'movie2' is assigned a value but never used         no-unused-vars
  Line 317:  'score' is assigned a value but never used          no-unused-vars
  Line 320:  'originalScore' is assigned a value but never used  no-unused-vars
  Line 320:  'getUserScore' is assigned a value but never used   no-unused-vars
  Line 326:  Do not mutate state directly. Use setState()
  Line 331:  Do not mutate state directly. Use setState()        react/no-direct-mutation-state
  Line 389:  'user' is assigned a value but never used           no-unused-vars
  Line 419:  'visitor' is assigned a value but never used        no-unused-vars
  Line 425:  'fireRedirect' is assigned a value but never used   no-unused-vars
  Line 452:  'open' is assigned a value but never used           no-unused-vars
|--------------------------------------------------
*/
