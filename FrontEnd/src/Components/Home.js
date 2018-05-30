import React from "react";
import { Redirect } from "react-router";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Paper from 'material-ui/Paper';
import CircularProgress from "material-ui/Progress/CircularProgress";
import Switch from "material-ui/Switch";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Input from "material-ui/Input";
import currencyFormatter from "currency-formatter";
import { FormControlLabel, FormGroup } from "material-ui/Form";
import Menu, { MenuItem } from "material-ui/Menu";
import Button from "material-ui/Button";
import MovieList from "./MovieList";
import SingleHomeMovie from "./SingleHomeMovie";
import swal from "sweetalert2";
import "../Views/App.css";
import { log } from "util";

const API_KEY = "d3b24aad8f7a69f5d20f89822a6102f8";

//Global variables for winner and loser of the two movies in the getWinner function

let baseURL = `http://image.tmdb.org/t/p/w185`;

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
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
};

const myStyle = {
  display: "flex",
  alignItems: "flex-start",
  height: "100%",
  justifyContent: "center",
  alignContent: "center"
};

//An array of 47 IMDB ids to show 2 random movies on the home screen
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

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    user: null,
    searchText: "",
    data: null,
    auth: false,
    anchorEl: null,
    movie1: null,
    movie2: null,
    movie1Revenue: "",
    movie1Budget: "",
    movie1MoneyEarned: "",
    movie2Revenue: "",
    movie2Budget: "",
    movie2MoneyEarned: "",
    winner: null,
    loser: null
  };

  handleInput = e => {
    const { data } = this.state;
    this.setState({
      searchText: e.target.value
    });
    //Uncomment the following line to get live updates as user types `caution: rate limit`
    // this.getMovie();
    if (!this.state.searchText.length) {
      this.setState({
        data: null
      });
    }
  };

  //List of movies based on the user's search
  getMovie = () => {
    const { searchText } = this.state;
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchText}&page=1&include_adult=true`
      )
      .then(response => {
        this.setState({
          data: response
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  //So user can hit `Enter` to submit thei query
  _keyPress = e => {
    //   e.preventDefault();
    if (e.key === "Enter") {
      this.getMovie();
    }
  };

  //To clear the list of movies from the screen if there's no text in Search Bar
  clearData = () => {
    const { searchText } = this.state;
    if (!searchText) {
      this.setState({
        data: null
      });
    }
  };

  handleChange = (event, checked) => {
    // console.log("event in change:", event);
    this.setState({ auth: checked });
  };

  //Material UI Menu feature

  //The two movies the user see on the home page to choose from.
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
        console.error(error);
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
        });
    };
    secondFetch();
  };

  //When the user selects one of the movies on the home page
  getWinner = e => {
    e.preventDefault();
    e.stopPropagation();
    const {
      winner,
      loser,
      movie1,
      movie2,
      movie1MoneyEarned,
      movie2MoneyEarned
    } = this.state;
    let diff = movie1MoneyEarned - movie2MoneyEarned;

    if (e.target.title === winner.original_title) {
      swal({
        title: "Sweet!",
        text: `Congratulations, you win! ${
          e.target.title
        } grossed ${currencyFormatter.format(Math.abs(winner.revenue), {
          code: "USD"
        })} and it made a whopping ${currencyFormatter.format(Math.abs(diff), {
          code: "USD"
        })} more than ${
          loser.original_title
        }! Sign up to join the leaderboard!`,
        imageUrl: `${baseURL}${winner.backdrop_path}`,
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
        )}, but didn't earn more in profits than ${
          winner.original_title
        }. Avenge your dignity by signing up to play more!`,
        imageUrl: `${baseURL}${loser.backdrop_path}`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        animation: true
      });
    }
  };

  setAuth = () => {
    if (this.state.user) {
      this.setState({
        auth: !this.state.auth
      });
    }
  };

  setUser = () => {
    this.setState({
      user: this.props.user
    });
  };

  componentWillMount() {
    this.getTwoMovies();
    this.setUser();
  }

  render() {
    const { classes, user, loggedIn } = this.props;
    const {
      auth,
      anchorEl,
      data,
      searchText,
      movie1,
      movie2,
      winner,
      loser
    } = this.state;
    const { _keyPress, handleInput, getWinner } = this;
    const open = Boolean(anchorEl);
    console.log("HOME STATE:",this.state)
    return (
      <React.Fragment id="home-screen">
        <div className="searchy">
          <i className="material-icons md-dark seek">search</i>
          <Input
            onChange={handleInput}
            onKeyPress={_keyPress}
            placeholder="Search for movies..."
            fullWidth={true}
            inputProps={{
              "aria-label": "Description"
            }}
          />
        </div>
          <div className="home-movie-container">
            {searchText ? (
              <MovieList data={data} loggedIn={loggedIn} currentUser={user} />
            ) : (
              <div className="default-home-screen">
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
                  <Paper className={"classes.root flex" } elevation={5}>
                    <Card
                      className={classes.card}
                      id="movie_num_1"
                      name="movie_num_1"
                      onClick={getWinner}
                    >
                      <SingleHomeMovie
                        data={movie1}
                        loggedIn={loggedIn}
                        currentUser={user}
                      />
                    </Card>
                    <div className="versus-div">
                      <span id="versus-span">VS</span>
                    </div>
                    <Card
                      className={classes.card}
                      id="movie_num_2"
                      name="movie_num_2"
                      onClick={getWinner}
                    >
                      <SingleHomeMovie
                        data={movie2}
                        loggedIn={loggedIn}
                        currentUser={user}
                      />
                    </Card>
                    {/* Select The Movie You Think Made More In Profits!! */}
                    </Paper>
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

Home.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Home);
