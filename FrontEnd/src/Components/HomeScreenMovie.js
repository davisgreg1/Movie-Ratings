import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import MovieList from "./MovieList";
import axios from "axios";
import { limitOverview } from "../utils/movieData";
import "../Views/App.css";
/**
|--------------------------------------------------
|     width: 298px;
    height: 278px;
    position: relative;
    box-sizing: border-box;
    padding: 10px 16px 16px 16px;
    overflow: hidden;
|--------------------------------------------------
*/

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit
  },
  card: {
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "spaceAround",
    // alignItems: "center",
    // padding: "10px",
    // maxWidth: 345,
    // maxHeight: 345
    width: "298px",
    height: "478px",
    position: "relative",
    boxSizing: "borderBox",
    padding: "10px 16px 16px 16px",
    overflow: "hidden"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
});

class HomeScreenMovie extends React.Component {
  constructor(props) {
    super(props);
  }

  addToFavs = data => {
    let baseURL = `http://image.tmdb.org/t/p/w185`;
    axios
      .post("/users/addFavorites", {
        movie_imdb_id: data.id,
        movie_title: data.original_title,
        movie_imgurl: `${baseURL}${data.poster_path}`,
        movie_website: `https://www.themoviedb.org/movie/${data.id}`,
        favorited_by: this.props.currentUser.id
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
    window.location.reload();
  };

  render() {
    const { classes, data, loggedIn, currentUser } = this.props;
    console.log("the movie PROPS IN HOMESCREEN:", this.props);
    let baseURL = `http://image.tmdb.org/t/p/w185`;
    return (
      <div clasName="all-cards-container">
        <Card
          className={classes.card}
          value={data.id}
          name={data.original_title}
        >
          <a
            href={`https://www.themoviedb.org/movie/${data.id}`}
            target="_blank"
          >
            <CardMedia
              className={classes.media}
              style={{ height: "50px", width: "100%" }}
              image={
                data.poster_path === null
                  ? "http://www.reelviews.net/resources/img/default_poster.jpg"
                  : `${baseURL}${data.poster_path}`
              }
              title={`${data.original_title}`}
            />
          </a>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {`${data.original_title}  (${data.release_date.split("-")[0]})`}
            </Typography>
            <Typography component="p">{`${limitOverview(
              data.overview
            )}`}</Typography>

            <CardActions value={data.id} name={data.original_title}>
              {loggedIn ? (
                <Chip
                  label="Add To Favorites"
                  className={classes.chip}
                    value={data.id}
                name={data.original_title}
                  avatar={<Avatar src={baseURL + data.poster_path} />}
                  onClick={() => this.addToFavs(data)}
                  clickable
                />
              ) : (
                <Button size="small" color="primary">
                  <a
                    href={`https://www.themoviedb.org/movie/${data.id}`}
                    target="_blank"
                  >
                    Learn More
                  </a>
                </Button>
              )}
            </CardActions>
          </CardContent>
        </Card>
      </div>
    );
  }
}

HomeScreenMovie.propTypes = {
  classes: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired
};
// export default HomeScreenMovie;
export default withStyles(styles)(HomeScreenMovie);
/**
|--------------------------------------------------
| add the add to favorites function here: grab:

1. movie_imdb_id, {data.id}
2. movie_title,  title={`${data.original_title}`
3. movie_imgurl, `${baseURL}${data.poster_path}`
4. movie_website,  href={`https://www.themoviedb.org/movie/${data.id}`}
5. favorited_by: this.props.currentUser.id
|--------------------------------------------------
*/
