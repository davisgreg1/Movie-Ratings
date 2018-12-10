import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from '@material-ui/core/GridListTileBar';
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import tmdbLogo from "../Assets/tmdbLogo.png";
import '../Views/topMovies.css';

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundColor: "#507dbc",
    height: "100%",
    padding:"15px"
  },
  gridList: {
    width: "auto",
    height: "auto",
  },
  subheader: {
    width: "100%"
  },
  icon: {
    color: 'white',
  },
  clickedIcon: {
    color: 'gold',
  },
});

class TopMovies extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      favClicked: false,
      resizing: false,
      width: null
    }
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    if (typeof window !== 'undefined')
      window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined')
      window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    const { resizing } = this.state;
    this.setState({
      width: document.documentElement.clientWidth,
      resizing: !resizing
    });
  };

  addToFavs = movie => {
    const { currentUser } = this.props;
    let baseURL = `http://image.tmdb.org/t/p/w185`;

    this.setState({
      favClicked: true
    })
    axios
      .post("/users/addFavorites", {
        movie_imdb_id: movie.id,
        movie_title: movie.original_title,
        movie_imgurl: `${baseURL}${movie.poster_path}`,
        movie_website: `https://www.themoviedb.org/movie/${movie.id}`,
        favorited_by: currentUser.id
      })
      .then(res => { })
      .catch(error => {
        console.error("addToFavs in TopMovies:", error)
      });
  };

  movieCols = () => {
    const { width } = this.state;
    let currentColSize = null;
    if (width >= 1024) { //large screens/ desktop
      currentColSize = 4
    } else if( width < 1024 && width >= 768){  //tablets
      currentColSize = 3
    } else if(width < 768 && width >= 480){ //mobile devices
      currentColSize = 2
    } else if(width < 480){ //really small mobile devices
      currentColSize = 1
    } else {
      currentColSize = 5
    }
    return currentColSize;
  }

  render() {
    const { classes, topMovies, message, loggedIn } = this.props;
    const { favClicked, resizing, width } = this.state;
    const { addToFavs, onResize, movieCols } = this;
    const mobileScreen = width;
    const baseURL = `http://image.tmdb.org/t/p/w185`;
    return (
      <div style={{ height: "100vh" }}>
        {!topMovies ?
          <CircularProgress
            className="loading-circ"
            size={50}
            left={70}
            top={0}
            loadingColor="#eee"
            status="loading"
          /> :
          <div className={classes.root}>
            <GridList cellHeight={560} className={classes.gridList} cols={ movieCols() }>
              {topMovies.map((movie, idx) => (
                <GridListTile key={idx} cols={1} style={{ height: "450px" }} className="top-movie-posters">
                  <img src={`${baseURL}${movie.poster_path}`} alt={movie.title} />
                  <GridListTileBar
                    title={movie.title}
                    subtitle={!loggedIn ? <span>Sign up to Play Movie Fights</span> : null}
                    actionIcon={loggedIn ?
                      <IconButton className={classes.icon}>
                        <StarBorderIcon onClick={() => addToFavs(movie)} />
                      </IconButton>
                      : null}
                  />
                </GridListTile>
              ))}
              <p style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center", height: "5px", fontSize: "12px" }} id="tmdb-line"><img id="tmdb-logo" src={tmdbLogo} width="25px" height="25px" alt="tmdb logo" />{message}</p>
            </GridList>
          </div>}
      </div>
    );
  }
}

TopMovies.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopMovies);
