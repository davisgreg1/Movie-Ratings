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
        console.log("Favs:",response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getAllFavs();
    this.setState({ user: this.props.currentUser });
  }

  render() {
    const { favorites } = this.state;
    const { currentUser, loggedIn } = this.props;
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
