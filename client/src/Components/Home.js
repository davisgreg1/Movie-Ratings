import React from "react";
import axios from "axios";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import Input from "material-ui/Input";
import MovieList from "./MovieList";
import TopMovies from "./TopMovies";
import "../Views/App.css";
import dotenv from "dotenv";
dotenv.load();

const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY;

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
  "tt1615160",
  "tt0451279",
  "tt4574334",
  "tt5580390",
  "tt3501632",
  "tt0109830",
  "tt0080684",
  "tt1375666",
  "tt0167261",
  "tt0073486",
  "tt0099685",
  "tt0133093"
];
const idArr1 = [
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
  "tt1675434",
  "tt0120815",
  "tt0361748",
  "tt0180093",
  "tt0054215",
  "tt1485796",
  "tt2283362",
  "tt1259528",
  "tt2527336",
  "tt2380307",
  "tt4765284",
  "tt5052448",
  "tt1396484",
  "tt5463162",
  "tt4154756",
  "tt3778644",
  "tt1677720"
];

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
      loser: null,
      topMovies: null
    };
  }

  handleInput = e => {
    this.setState({searchText: e.target.value});
    // Uncomment the following line to get live updates as user types `caution: rate
    // limit`
    this.getMovie();
    if (!this.state.searchText.length) {
      this.setState({data: null});
    }
  };

  setTheState = (str, response) => this.setState({[str]: response})

  //List of movies based on the user's search
  getMovie = async() => {
    const {searchText} = this.state;
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&language=en-US&query=${searchText}&page=1&include_adult=true`);

console.log('THe response:::', response.data.results);
    this.setState({data: response})
  };

  //So user can hit `Enter` to submit their query
  _keyPress = e => {
    if (e.key === "Enter") {
      this.getMovie();
    }
  };

  //To clear the list of movies from the screen if there's no text in Search Bar
  clearData = () => {
    const {searchText} = this.state;
    if (!searchText) {
      this.setState({data: null});
    }
  };

  handleChange = (event, checked) => {
    this.setState({auth: checked});
  };

  getTopMovies = async() => {
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
    this.setState({topMovies: response.data.results});
  };

  componentWillMount() {
    this.getTopMovies();
  }

  render() {
    const {authenticatedUser, isAuthenticated} = this.props;
    const {data, searchText, topMovies} = this.state;
    const {_keyPress, handleInput} = this;

    return (
      <div className="choices-container">
        <div className="searchy">
          <i className="material-icons md-dark seek">search</i>
          <Input
            onChange={handleInput}
            onKeyUp={_keyPress}
            placeholder="Search for movies..."
            fullWidth={true}
            inputProps={{
            "aria-label": "Description"
          }}/>
        </div>
        <div className="home-movie-container">
          <div style={{
            fontSize: "30px"
          }}>TOP MOVIES</div>
          {searchText
            ? (<MovieList
              data={data}
              loggedIn={isAuthenticated}
              currentUser={authenticatedUser}/>)
            : (<TopMovies
              loggedIn={isAuthenticated}
              currentUser={authenticatedUser}
              message={`This product uses the TMDb API but is not endorsed or certified by TMDb.`}
              topMovies={topMovies}/>)}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({authenticatedUser: state.sessionReducer.user, isAuthenticated: state.sessionReducer.userAuthenticated})

export default connect(mapStateToProps, null)(withStyles(styles)(Home));
