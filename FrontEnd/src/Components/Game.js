import React from "react";
import "../Views/index.css";
// eslint-disable-next-line
import OneMovie from "./OneMovie";
import SingleHomeMovie from "./SingleHomeMovie";
// eslint-disable-next-line
// import dotenv from 'dotenv';
import currencyFormatter from "currency-formatter";
import swal from "sweetalert2";
import axios from "axios";

import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import CircularProgress from "material-ui/Progress/CircularProgress";
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
  "tt0116126"
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
      score: this.props.originalScore,
      currentUser: "",
      winner: null,
      loser: null,
      movie1MoneyEarned: "",
      movie2MoneyEarned: ""
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
        this.setState({
          movie1: response,
          movie1Revenue: response.data.revenue,
          movie1Budget: response.data.budget,
          movie1MoneyEarned: eval(response.data.revenue - response.data.budget)
        });
      })
      .catch(error => {
        console.log(error);
      });

    const secondFetch = () => {
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
              this.state.movie1MoneyEarned > this.state.movie2MoneyEarned
                ? this.state.movie1.data.original_title
                : this.state.movie2.data.original_title
          });
        })
        .then(() => {
          this.setState({
            winner:
              this.state.movie1MoneyEarned > this.state.movie2MoneyEarned
                ? this.state.movie1.data
                : this.state.movie2.data,
            loser:
              this.state.movie1MoneyEarned < this.state.movie2MoneyEarned
                ? this.state.movie1.data
                : this.state.movie2.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    };
    secondFetch();
  };

  getWinner = e => {
    e.preventDefault();
    e.stopPropagation();
    const {
      winner,
      loser,
      movie1,
      movie2,
      movie1MoneyEarned,
      movie2MoneyEarned,
      score
    } = this.state;
    const { classes, user, originalScore, getUserScore } = this.props;
    let diff = movie1MoneyEarned - movie2MoneyEarned;

    // console.log("the WINNER:", winner.original_title)
    // console.log("the WINNER REV:", winner.revenue)
    // console.log("the LOSER:", loser.original_title)
    // console.log("the LOSER REV:", loser.revenue)

    if (e.target.title === winner.original_title) {
      let num = originalScore;
      this.setState({
        score: (this.state.score += 10)
      });
      swal({
        title: "Sweet!",
        text: `Congratulations, you win! ${
          e.target.title
        } grossed ${currencyFormatter.format(Math.abs(winner.revenue), {
          code: "USD"
        })} and it made a whopping ${currencyFormatter.format(Math.abs(diff), {
          code: "USD"
        })} more than ${loser.original_title}`,
        imageUrl: `${baseURL}${winner.poster_path}`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        animation: true
      });
    }
    if (e.target.title === loser.original_title) {
      swal({
        title: "Sorry!",
        text: `${e.target.title} grossed ${currencyFormatter.format(
          Math.abs(loser.revenue),
          { code: "USD" }
        )}, but didn't earn more than ${winner.original_title}.`,
        imageUrl: `${baseURL}${loser.poster_path}`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        animation: true
      });
    }
    this.postScore();
    setTimeout(() => {
      this.getTwoMovies();
    }, 5000);
  };

  postScore = () => {
    axios
      .patch("users/score_update", {
        points: this.state.score,
        id: this.props.currentUser.id
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleSubmit = e => {
    e.preventDefault();

    let randomMovieID = `${idArr[Math.floor(Math.random() * idArr.length)]}`;
    // eslint-disable-next-line
    const { player1Name, player2Name, message, movie1, movie2 } = this.state;

    fetch(`http://www.omdbapi.com/?i=${randomMovieID}&apikey=${KEY}`)
      .then(response => {
        // console.log("the first json response", response);
        return response.json();
      })
      .then(data => {
        // console.log("the first fetch data", data);
        return this.setState({ movie1: data });
      });
    const secondFetch = () => {
      fetch(
        `http://www.omdbapi.com/?i=${
          idArr[Math.floor(Math.random() * idArr.length)]
        }&apikey=${KEY}`
      )
        .then(response => {
          // console.log("the json response", response);
          return response.json();
        })
        .then(data => {
          // console.log("the second fetched data", data);

          return this.setState({
            movie2: data,
            message: `${this.state.player1Name} your movie is: ${
              this.state.movie2.Title
            }`
          });
        });
    };
    secondFetch();
  };

  setRatings = () => {
    // eslint-disable-next-line
    const { movie1Rating, movie2Rating } = this.state;
    this.setState({
      movie1Rating: this.state.movie1.imdbRating,
      movie2Rating: this.state.movie2.imdbRating
    });
    alert(this.state);
  };
  // renderMovie = () => {   const {movies} = this.state;   return (<OneMovie
  // movie={movies.title}/>) }

  componentWillMount() {
    this.getTwoMovies();
  }

  render() {
    const {
      player1Name,
      // eslint-disable-next-line
      message,
      movie1,
      movie2,
      // eslint-disable-next-line
      movie1Rating,
      // eslint-disable-next-line
      movie2Rating,
      score,
      currentUser
    } = this.state;
    const { classes, user, originalScore, getUserScore } = this.props;
    console.log("the props in Game:", this.props);
    console.log("the stATE in Game:", this.state);
    return (
      <React.Fragment>
        <div id="movie-1-and-2-container">
          {!this.props.currentUser ? (
            <div>MUST BE LOGGED IN.</div>
          ) : (
            <div className="default-home-screen">
              <div>{this.props.currentUser.firstname} your turn to play</div>
              <div>Your score is: {score}</div>
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
                    <span id="versus-span">VS</span>
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
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(Game);
