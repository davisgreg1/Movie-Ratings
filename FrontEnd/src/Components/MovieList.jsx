import React from "react";
import HomeScreenMovie from "./HomeScreenMovie";

import '../Views/App.css';

class MovieList extends React.Component {

  render() {
    const { data, loggedIn, currentUser } = this.props;
    return (
      <React.Fragment>
        {data ? (
          <div className="movie-list-container">
            {data.data.results.map((elem, idx) => {
             return <div className="single-movie" key={idx}><HomeScreenMovie data={elem} loggedIn={loggedIn} currentUser={currentUser}/></div>
            })}
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}
export default MovieList;