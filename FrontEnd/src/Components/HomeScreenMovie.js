import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import MovieList from './MovieList';
import "../Views/App.css";

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
};

class HomeScreenMovie extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //   classes was a prop as well
    const { classes, data } = this.props;
    console.log("the movie data:", data);
    // console.log("the movie PROPS IN HOMESCREEN:", this.props);
    let baseURL = `http://image.tmdb.org/t/p/w185`;
    return (
      <div clasName="all-cards-container">
        <Card className={classes.card}>
          <a
            href={`https://www.themoviedb.org/movie/${data.id}`}
            target="_blank"
          >
            <CardMedia
              className={classes.media}
              style={{height:"285px", width: "285px"}}
              image={ data.poster_path === null ? "http://www.reelviews.net/resources/img/default_poster.jpg" : `${baseURL}${data.poster_path}`}
              title={`${data.original_title}`}
            />
          </a>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {`${data.original_title}`}
            </Typography>
            <Typography component="p">{`${data.overview}`}</Typography>
          </CardContent>

          <CardActions>
            <Button size="small" color="primary">
              <a
                href={`https://www.themoviedb.org/movie/${data.id}`}
                target="_blank"
              >
                Learn More
              </a>
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

HomeScreenMovie.propTypes = {
  classes: PropTypes.object.isRequired
};
// export default HomeScreenMovie;
export default withStyles(styles)(HomeScreenMovie);
