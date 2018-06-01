import React from "react";
import { Link, Route } from "react-router-dom";
// eslint-disable-next-line
import SingleHomeMovie from "../SingleHomeMovie";
// eslint-disable-next-line
// import dotenv from 'dotenv';
import CurrentScore from "./CurrentScore";
import currencyFormatter from "currency-formatter";
import swal from "sweetalert2";
import axios from "axios";
import "../../Views/App.css";
import "../../Views/animate.css";

import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import CircularProgress from "material-ui/Progress/CircularProgress";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";

const KEY = process.env.REACT_APP_OMDB_KEY;
const API_KEY = "d3b24aad8f7a69f5d20f89822a6102f8";
let theCurrentWinner;
let theCurrentLoser;
let baseURL = `http://image.tmdb.org/t/p/w185`;

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
  "tt5519340",
  "tt4765284",
  "tt5052448",
  "tt1615160",
  "tt0451279",
  "tt4574334",
  "tt1396484",
  "tt0116126",
  "tt5463162",
  "tt4154756",
  "tt3778644",
  "tt1677720"
];

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1Score: "",
      player2Score: "",
      message: "",
      movie1: null,
      movie2: null,
      currentUser: "",
      winner: {},
      loser: {},
      movie1MoneyEarned: "",
      movie2MoneyEarned: "",
      score: ""
    };
  }

  getTwoMovies = () => {
    let randomMovieID1 = `${idArr[Math.floor(Math.random() * idArr.length)]}`;
    let randomMovieID2 = `${idArr[Math.floor(Math.random() * idArr.length)]}`;
    axios
      .get(
        `http://api.themoviedb.org/3/movie/${randomMovieID1}?api_key=${API_KEY}`
        // `https://api.themoviedb.org/3/movie/216015?api_key=${API_KEY}&language=en-US`
      )
      .then(response => {
        console.log("THis is response in Game.js:", response);
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
    // let title = e.target.title;
    
    // setTimeout(function(){
      debugger;

      if (
        e.target.title !== this.state.winner.original_title &&
        e.target.title !== this.state.loser.original_title
      ) {
        window.location.reload()
      }
      console.log("e:", e);
      e.preventDefault();
      const {
        winner,
        loser,
        movie1,
        movie2,
        movie1MoneyEarned,
        movie2MoneyEarned,
        score
      } = this.state;
      const { classes, currentUser, originalScore, getUserScore } = this.props;
      let diff = movie1MoneyEarned - movie2MoneyEarned;
      debugger;
      if (e.target.title === winner.original_title) {
        console.log("winner?:", winner);
        this.setState({
          score: (this.state.score += 10)
        });
        swal({
          title: "Sweet!",
          customClass: "animated rubberBand",
          html: `<span id="swal-message-right"><h6 className="swal-alert">Congratulations, you win! ${
            winner.original_title
          } grossed ${currencyFormatter.format(Math.abs(winner.revenue), {
            code: "USD"
          })} and it made a whopping ${currencyFormatter.format(
            Math.abs(diff),
            {
              code: "USD"
            }
          )} more than ${loser.original_title}</h6 className="swal-alert"></span>`,
          background: `#eee url(${baseURL}${winner.backdrop_path}) space`,
          backdrop: `
        rgba(0,255,0,0.5)`,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          animation: false
        });
      }
      /**
    |--------------------------------------------------
    |   url(${baseURL}${loser.backdrop_path})
    |   center left
    |--------------------------------------------------
    */
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
      }
      this.postScore();
    // }, 0);
  };

  postScore = () => {
    const { currentUser } = this.props;
    const { score } = this.state;

    axios
      .patch("users/score_update", {
        points: score,
        id: currentUser.id
      })
      .then(res => {
        console.log("Postedscore:", res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getTwoMovies();
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    return {
      score: nextProps.originalScore
    };
  };

  render() {
    const {
      // eslint-disable-next-line
      message,
      movie1,
      movie2,
      score,
      currentUser
    } = this.state;
    const { classes, user, originalScore, getUserScore } = this.props;
    console.log("the stATE in Game:", this.state);
    console.log("the score is:", score);
    return (
      <React.Fragment>
        <div id="movie-1-and-2-container">
          {!this.props.currentUser ? (
            <div>MUST BE LOGGED IN.</div>
          ) : (
            <div className="default-home-screen">
              <div>{this.props.currentUser.firstname} your turn to play</div>
              <div>
                Your score is: <CurrentScore score={score} />
              </div>
              {!movie1 || !movie2 ? (
                <CircularProgress
                  size={50}
                  left={70}
                  top={0}
                  loadingColor="#FF9800"
                  status="loading"
                  style={{
                    display: "inlineBlock",
                    position: "relative"
                  }}
                />
              ) : (
                <div className="single-movie-container">
                  <Card
                    className={classes.card}
                    id="movie_num_1"
                    name="movie_num_1"
                    onClick={this.getWinner}
                  >
                    <SingleHomeMovie data={movie1} />
                  </Card>
                  <div className="versus-div">
                    <Button onClick={this.getTwoMovies}>
                      {" "}
                      <span id="versus-span">MORE!</span>
                    </Button>
                  </div>
                  <Card
                    className={classes.card}
                    id="movie_num_2"
                    name="movie_num_2"
                    onClick={this.getWinner}
                  >
                    <SingleHomeMovie data={movie2} />
                  </Card>
                  Select The Movie You Think Made More In Profits!!
                </div>
              )}
            </div>
          )}
        </div>
            <div>
          <Link to="/leaderboard">View Leaderboard</Link>
        </div>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(Game);
