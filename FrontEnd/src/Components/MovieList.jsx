import React from "react";
import HomeScreenMovie from "./HomeScreenMovie";
import Divider from 'material-ui/Divider';
import '../Views/App.css';

class MovieList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, loggedIn } = this.props;
    return (
      <React.Fragment>
        {data ? (
          <div className="movie-list-container">
            {data.data.results.map((elem, idx) => {
             return <div className="single-movie" key={idx}><HomeScreenMovie data={elem} loggedIn={loggedIn}/></div>
            })}
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}
export default MovieList;