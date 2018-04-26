import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import axios from "axios";
import Input from "material-ui/Input";
import HomeScreenMovie from "./HomeScreenMovie";
import MovieList from "./MovieList";
import "../Views/App.css";

const styles = theme => ({
  container: {
    display: "flex",
    alignItems: "flex-start",
    height: "100%",
    justifyContent: "center"
  },
  input: {
    margin: theme.spacing.unit,
    display: "flex"
  }
});

const API_KEY = "d3b24aad8f7a69f5d20f89822a6102f8";

class SearchMovieInput extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    searchText: "",
    data: null
  };

  handleInput = e => {
    //   e.preventDefault();
    const { data } = this.state;
    this.setState({
      searchText: e.target.value
    })
    // this.getMovie();
    if (!this.state.searchText.length) {
      this.setState({
        data: null
      });
    }
  };
  /**
|--------------------------------------------------
| https://api.themoviedb.org/3/search/movie?api_key=d3b24aad8f7a69f5d20f89822a6102f8&language=en-US&query=annie&page=1&include_adult=false
|--------------------------------------------------
*/
  getMovie = () => {
    const { searchText } = this.state;
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchText}&page=1&include_adult=false`
      )
      .then(response => {
        console.log("The movie response:", response);
        this.setState({
          data: response.data.results
        })
      })
      .catch(error => {
        console.log(error);
      });
  };

  _keyPress = e => {
    //   e.preventDefault();
    if (e.key === "Enter") {
        this.getMovie();
    }
  };

  clearData = () => {
    const { searchText } = this.state;
    if (!searchText) {
      this.setState({
        data: null
      });
    }
  };

  render() {
    console.log("State in Search", this.state);
    const { _keyPress, handleInput } = this;
    const { classes } = this.props;
    const { data, searchText } = this.state;

    return (
      <React.Fragment>
        <div className={classes.container}>
          <Input
            onChange={handleInput}
            onKeyPress={_keyPress}
            placeholder="Search Movies..."
            className={classes.input}
            inputProps={{
              "aria-label": "Description"
            }}
          />
        </div>
        <div className="home-movie-container">
          {searchText ? <MovieList data={data} /> : null}
        </div>
      </React.Fragment>
    );
  }
}

SearchMovieInput.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SearchMovieInput);
