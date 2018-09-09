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
    width: "auto%",
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
       favClicked: false
    }
  }
   addToFavs = movie => {
     const {currentUser} = this.props;
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
      .then(res => {})
      .catch(error => {
        console.error("addToFavs in TopMovies:",error)
      });
    // window.location.reload();
  };

  render(){
    const { classes, topMovies, message, loggedIn } = this.props;
    const {favClicked}=this.state;
    const {addToFavs}=this;   
    const mobileScreen = window.innerWidth <= 768;
    const baseURL = `http://image.tmdb.org/t/p/w185`;
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
            <GridListTile key={idx} cols={1} style={{height:"450px"}}        className="top-movie-posters">
              <img src={`${baseURL}${movie.poster_path}`} alt={movie.title} />
              <GridListTileBar
              title={movie.title}
              subtitle={!loggedIn ? <span>Sign up to Play Movie Fights</span> : null}
              actionIcon = {loggedIn ? 
                <IconButton className={classes.icon} onClick={(movie)=>console.log(movie.title)}>
                  <StarBorderIcon onClick={() => addToFavs(movie)}/>
                </IconButton>
              : null}
            />
            </GridListTile>
          ))}
      <p id="tmdb-line"><img id="tmdb-logo" src={tmdbLogo} alt="tmdb logo"/>{message}</p>
        </GridList>
      </div>}
    </React.Fragment>
  );
}
}

TopMovies.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopMovies);
