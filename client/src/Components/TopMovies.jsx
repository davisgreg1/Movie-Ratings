import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from '@material-ui/core/GridListTileBar';
import CircularProgress from "@material-ui/core/CircularProgress";

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
  }
});

function TopMovies(props) {
  const baseURL = `http://image.tmdb.org/t/p/w185`;
  const { classes, topMovies, message } = props;

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
        <GridList cellHeight={560} className={classes.gridList} cols={topMovies.length % 2 === 0 ? 4 : 3}>
          {topMovies.map((movie, idx) => (
            <GridListTile key={idx} cols={1} style={{height:"450px"}} className="top-movie-posters">
              <img src={`${baseURL}${movie.poster_path}`} alt={movie.title} />
              <GridListTileBar
              title={movie.title}
              subtitle={<span>Sign up to Play Movie Fights</span>}
            //   actionIcon={
            //     <IconButton className={classes.icon}>
            //       <InfoIcon />
            //     </IconButton>
            //   }
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
