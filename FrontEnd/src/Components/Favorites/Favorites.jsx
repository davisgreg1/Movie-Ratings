import React, { Component } from "react";
import axios from "axios";
import FavoriteMovieList from "./FavoriteMovieList";

export default class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      movieData: null,
      favorites: []
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
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // getAllFavs() {
  //   console.log("here in getallfavs")
  //   const { movies, user } = this.state;
  //   const { currentUser } = this.props;
  //   async function getAllMovies() {
  //     try {
  //       const response = await axios.get("/users/favorites");
  //       await console.log("response:",response)

  //     } catch (error) {
  //       console.error("error:", error);
  //     }
  //   }
  // }

  componentDidMount() {
    this.getAllFavs();
    this.setState({ user: this.props.currentUser });
  }

  render() {
    const { favorites } = this.state;
    const { currentUser, loggedIn } = this.props;
    console.log("props in favs:", this.props);
    console.log("state in favs:", this.state);
    return (
      <React.Fragment>
        <FavoriteMovieList
          currentUser={currentUser}
          loggedIn={loggedIn}
          movies={favorites}
        />
      </React.Fragment>
    );
  }
}
