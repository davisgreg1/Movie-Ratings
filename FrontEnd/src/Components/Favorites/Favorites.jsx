import React, { Component } from "react";
import axios from "axios";

export default class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      favorites: []
    };
  }

  async getAllFavs() {
      console.log("got here bro")
    const { movies, user} = this.state;
    try {
        const response = await axios.get('/users/favorites', { user_id: this.props.currentUser.id});
        console.log("responze:", response);
    } catch (err) {
        console.log("Error:", err)
    }
}

 componentDidMount() {
 this.getAllFavs();
}

  render() {
      console.log("props in favs:",this.props)
    return <div>LIST OF FAVORITE MOVIES HERE</div>;
  }
}
