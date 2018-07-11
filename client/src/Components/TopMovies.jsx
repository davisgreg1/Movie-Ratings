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

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundColor: "#507dbc",
    height:"100%",
  },
  gridList: {
    width: "100%",
    height: 550
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

function TopMovies(props) {
  const mobileScreen = window.innerWidth <= 768;
  const baseURL = `http://image.tmdb.org/t/p/w185`;
  const { classes, topMovies, message, loggedIn } = props;

  const addToFavs = movie => {
    const {currentUser} = props;
    let baseURL = `http://image.tmdb.org/t/p/w185`;
    axios
      .post("/users/addFavorites", {
        movie_imdb_id: movie.id,
        movie_title: movie.original_title,
        movie_imgurl: `${baseURL}${movie.poster_path}`,
        movie_website: `https://www.themoviedb.org/movie/${movie.id}`,
        favorited_by: currentUser.id
      })
      .then(res => {})
      .catch(error => {
        console.error("addToFavs in TopMovies:",error)
      });
    // window.location.reload();
  };

  return (
    <React.Fragment>
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
        <GridList cellHeight={560} className={classes.gridList} cols={mobileScreen ? 2 : topMovies.length % 2 === 0 ? 4 : 3}>
          {topMovies.map((movie, idx) => (
            <GridListTile key={idx} cols={1} style={{height:"450px"}} className="top-movie-posters">
              <img src={`${baseURL}${movie.poster_path}`} alt={movie.title} />
              <GridListTileBar
              title={movie.title}
              subtitle={!loggedIn ?<span>Sign up to Play Movie Fights</span>:null}
              actionIcon= {loggedIn ? 
                <IconButton className={classes.icon}>
                  <StarBorderIcon onClick={()=>addToFavs(movie)}/>
                </IconButton>
              :null}
            />
            </GridListTile>
          ))}
        </GridList>
      <p id="tmdb-line"><img id="tmdb-logo" width="36px" height="36px" src="https://www.themoviedb.org/static_cache/v4/logos/208x226-stacked-green-9484383bd9853615c113f020def5cbe27f6d08a84ff834f41371f223ebad4a3c.png" alt="tmdb logo"/>{message}</p>
      </div>}
    </React.Fragment>
  );
}

TopMovies.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopMovies);
