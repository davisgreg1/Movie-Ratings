import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

import axios from "axios";
import { limitOverview } from "../utils/movieData";
import "../Views/App.css";

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

      })
      .catch(error => {
        console.error("addToFavs",error);
      });
    window.location.reload();
  };

  render() {
    const { classes, data, loggedIn } = this.props;
 
    let baseURL = `http://image.tmdb.org/t/p/w185`;
    return (

      
      <div className="all-cards-container" style={{ display: "flex", justifyContent:"center", alignItems:"center", minWidth: "278px", maxWidth: "600px", height: "50%" }}>
        <Card
          style={{display: "flex"}}
          value={data.id}
          name={data.original_title}
        >
          <a href={`https://www.themoviedb.org/movie/${data.id}`} target="_blank">
            <CardMedia
              className={classes.media}
              style={{ height: "285px", width: "285px" }}
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
              {`${data.original_title}  (${data.release_date})`}
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
export default withStyles(styles)(HomeScreenMovie);
