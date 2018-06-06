import React, { Component } from "react";
import axios from "axios";
import FavoriteMovieList from "./FavoriteMovieList";
import MovieList from "../MovieList";
import Input from "material-ui/Input";

const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY

const searchBarStyles =  {

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  alignContent: "center",
  backgroundColor: "whitesmoke",
  width: "100vw",
  paddingTop: "7px"
}
class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      movieData: null,
      favorites: [],
      searchText: "",
      data: null,
      doneEditing: false
    };
  }

  getAllFavs = () => {
    axios
      .get("/users/favorites")
      .then(response => {
        this.setState({
          movieData: response,
          favorites: response.data.data
        });
        console.log("Favs:", response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleInput = e => {

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

  getMovie = () => {
    const { searchText } = this.state;
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&language=en-US&query=${searchText}&page=1&include_adult=true`
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
    this.getMovie()
    //   e.preventDefault();
    if (e.key === "Enter") {
     this.getMovie()
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

  fireRedirect = () => {

    this.setState({
      doneEditing: true
    });
  };

  componentDidMount() {
    this.getAllFavs();
    this.setState({ user: this.props.currentUser });
  }

  render() {
    const { favorites, searchText, data } = this.state;
    const { currentUser, loggedIn } = this.props;
    const { _keyPress, handleInput } = this;

    return (
      <React.Fragment>
        <div className="searchy pad">
          <i className="material-icons md-dark seek">search</i>
          <Input
            style={searchBarStyles}
            onChange={handleInput}
            onKeyPress={_keyPress}
            placeholder="Search for movies..."
            fullWidth={true}
            inputProps={{
              "aria-label": "Description"
            }}
          />
        </div>
          {searchText ? (
            <MovieList data={data} loggedIn={loggedIn} currentUser={currentUser} />
          ) : (
            <FavoriteMovieList
              currentUser={currentUser}
              loggedIn={loggedIn}
              movies={favorites}
            />
          )}
      </React.Fragment>
    );
  }
}
export default Favorites;
