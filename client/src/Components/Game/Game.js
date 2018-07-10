import React from "react";
import axios from "axios";
import swal from "sweetalert2";
import currencyFormatter from "currency-formatter";
// eslint-disable-next-line
import SingleHomeMovie from "../SingleHomeMovie";
// eslint-disable-next-line import dotenv from 'dotenv';
import CurrentScore from "./CurrentScore";
import "../../Views/App.css";
import "../../Views/animate.css";
import Card from "material-ui/Card";
import CircularProgress from "material-ui/Progress/CircularProgress";
import {withStyles} from "material-ui/styles";

import dotenv from "dotenv";
dotenv.load();

const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY;
const baseURL = `http://image.tmdb.org/t/p/w185`;

const idArr = [
  "278",
  "238",
  "424",
  "497",
  "680",
  "550",
  "155",
  "539",
  "769",
  "13",
  "1891",
  "73",
  "122",
  "27205",
  "274",
  "11",
  "157336",
  "8587",
  "111",
  "98",
  "603",
  "16869",
  "348"
];
const idArr1 = [
  "857",
  "489",
  "641",
  "150540",
  "37165",
  "68718",
  "106646",
  "76203",
  "313369",
  "118340",
  "354912",
  "24",
  "640",
  "1402",
  "11036",
  "142",
  "286217",
  "100402",
  "383498",
  "8358",
  "650",
  "1372",
  "419430",
  "9516",
  "101299",
  "601",
  "64956"
];

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
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
};

class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      winner: null,
      loser: null,
      newScore: "",
      movie1: null,
      movie2: null,
      movie1MoneyEarned: "",
      movie2MoneyEarned: "",
      movie1Revenue: "",
      movie2Revenue: "",
      movie1Budget: "",
      movie2Budget: "",
      hasBeenClicked: false
    }
  }

  postScore = () => {
    const {newScore} = this.state;
    const {currentUser} = this.props;

    axios
      .patch("users/score_update", {
      points: newScore,
      id: currentUser.id
    })
      .then(res => {})
      .catch(error => {
        console.error(error);
      });
  };
/**
|--------------------------------------------------
| https://api.themoviedb.org/3/movie/354912?api_key=d3b24aad8f7a69f5d20f89822a6102f8&language=en-US
|--------------------------------------------------
*/
  getTwoMovies = () => {
    this.setState({hasBeenClicked: false});
    let randomMovieID1 = `${idArr[Math.floor(Math.random() * idArr.length)]}`;
    let randomMovieID2 = `${idArr1[Math.floor(Math.random() * idArr1.length)]}`;

    axios
      .get(`https://api.themoviedb.org/3/movie/${randomMovieID1}?api_key=${TMDB_KEY}&language=en-US`)
      .then(response => {
        this.setState({
          movie1: response, movie1Revenue: response.data.revenue, movie1Budget: response.data.budget,
          // eslint-disable-next-line
          movie1MoneyEarned: (parseInt(response.data.revenue) - parseInt(response.data.budget))
        });
      })
      .then(axios.get(`https://api.themoviedb.org/3/movie/${randomMovieID2}?api_key=${TMDB_KEY}&language=en-US`)
        .then(response => {
        this.setState({
          movie2: response, movie2Revenue: response.data.revenue, movie2Budget: response.data.budget,
          // eslint-disable-next-line
          movie2MoneyEarned: (parseInt(response.data.revenue) - parseInt(response.data.budget))
        });
      }).then(() => {
        this.setState({
          winner: this.state.movie1MoneyEarned >= this.state.movie2MoneyEarned
            ? this.state.movie1.data
            : this.state.movie2.data,
          loser: this.state.movie1MoneyEarned <= this.state.movie2MoneyEarned
            ? this.state.movie1.data
            : this.state.movie2.data
        });
      }).catch(error => {
        console.error(error);
      }))
      .catch(error => {
        console.error(error);
      });
  };

  getWinner = e => {
    const {currentUser} = this.props;
    if (!this.state.winner && !this.state.loser) {
      window
        .location
        .reload();
    }
    e.preventDefault();
    const {winner, loser, movie1MoneyEarned, movie2MoneyEarned, hasBeenClicked} = this.state;

    let diff = movie1MoneyEarned - movie2MoneyEarned;
    let currentTargetJoined = e
      .currentTarget
      .innerText
      .split(" ")
      .join("")
      .trim();
    let winnerJoined = winner
      .original_title
      .split(" ")
      .join("")
      .trim();

    let loserJoined = loser
      .original_title
      .split(" ")
      .join("")
      .trim();

    if (currentTargetJoined === winnerJoined && !hasBeenClicked) {
      this.setState({
        // eslint-disable-next-line
        newScore: (this.state.newScore += 10),
        hasBeenClicked: true
      });
      if (hasBeenClicked) {
        this.setState({
          // eslint-disable-next-line
          newScore: this.state.newScore
        });
      }
      swal({
        customClass: "animated rubberBand",
        html: `<div id="win-win"><span id="swal-message-right"><h6 className="swal-alert">Yes, ${currentUser
          .firstname}! ${winner
          .original_title} made approximately <h2> ${currencyFormatter
          .format(Math.abs(diff), {
            code: "USD"})}</h2> more than ${loser.original_title}</h6 className="swal-alert"></span></div>`,
            background: `#eee url(${baseURL}${winner.backdrop_path}) space`,
            backdrop: `
      rgba(0,255,0,0.5)`,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            animation: false,
            confirmButtonColor: "#02182b",
            showLoaderOnConfirm: true
          })
          .then(this.getTwoMovies())
      } else if (currentTargetJoined === loserJoined) {
        this.setState({hasBeenClicked: true});
        swal({
          customClass: "animated headShake",
          html: `<div id="win-win"><span id="swal-message"><h6>Sorry, ${currentUser
            .firstname}... ${e
            .target
            .title}  made approximately <h2>${currencyFormatter
            .format(Math.abs(diff), {
              code: "USD"})}</h2> less than ${winner.original_title}.</h6></span></div>`,
              // background: `#eee url(${baseURL}${loser.backdrop_path}) space`,
              backdrop: `
      rgba(255,0,0,0.5)`,
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: "Custom image",
              animation: false,
              confirmButtonColor: "#02182b",
              showLoaderOnConfirm: true
            })
            .then(this.getTwoMovies())
        }
        if (!hasBeenClicked) {
          this.postScore();
        }
      };

      getScore = () => {
        axios
          .get("/users/getcurrentscore")
          .then(res => {
            this.setState({newScore: res.data.data.points});
          })
          .catch(err => {
            console.error("Error getting user score:", err);
          });
      }

      componentDidMount = () => {
        this.getScore();
        this.getTwoMovies();
      }

      render() {
        const {movie1, movie2, newScore} = this.state;
        const {classes} = this.props
        const {getWinner} = this
        return (
          <React.Fragment>
            <div id="movie-1-and-2-container">
              {!this.props.currentUser
                ? (
                  <div>MUST BE LOGGED IN.</div>
                )
                : (
                  <div className="default-home-screen">
                    <div>
                      Your score is:
                      <CurrentScore score={newScore}/>
                    </div>
                    {!movie1 || !movie2
                      ? (
                        <span className="circle">
                          <CircularProgress
                            size={50}
                            left={50}
                            top={50}
                            loadingColor="#FF9800"
                            status="loading"
                            style={{
                            display: "inlineBlock",
                            position: "relative"
                          }}/>
                        </span>
                      )
                      : (
                        <div className="single-movie-container">
                          <Card
                            className={classes.card}
                            id="movie_num_1"
                            name="movie_num_1"
                            onClick={getWinner}>
                            <SingleHomeMovie className="single-data" data={movie1}/>
                          </Card>
                          <Card
                            className={classes.card}
                            id="movie_num_2"
                            name="movie_num_2"
                            onClick={getWinner}>
                            <SingleHomeMovie className="single-data" data={movie2}/>
                          </Card>
                        </div>
                      )
                    }
                  </div>
                )}
            </div>
          </React.Fragment>
        );
      }
    }
    export default withStyles(styles)(Game);
