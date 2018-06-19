import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from '@material-ui/core/GridListTileBar';

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: "100%",
    height: 450
  },
  subheader: {
    width: "100%"
  }
});

function TopMovies(props) {
  const baseURL = `http://image.tmdb.org/t/p/w185`;
  const { classes, topMovies, message } = props;
  console.log(topMovies)

  return (
    <React.Fragment>
        <div style={{fontSize:"30px"}}>TOP MOVIES</div>
        {!topMovies ? "Loading..." : 
      <div className={classes.root}>
        <GridList cellHeight={260} className={classes.gridList} cols={topMovies.length % 2 === 0 ? 4 : 3}>
          {topMovies.map((movie, idx) => (
            <GridListTile key={idx} cols={1}>
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
      </div>}
      <p>{message}</p>
    </React.Fragment>
  );
}

TopMovies.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopMovies);
