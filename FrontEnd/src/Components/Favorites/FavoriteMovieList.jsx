import React from "react";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import axios from "axios";
import "../../Views/App.css";

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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 275
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
});

class FavoriteMovieList extends React.Component {

  removeFromFavs = movie => {
    axios
      .delete("/users/removeFavorite", {
        data: { id: movie.id }
      })
      .then(response => {
        console.log("Remove from Favs successfull");
      })
      .catch(error => {
        console.log("Error in Remove Fav:", error);
      });
    window.location.reload();
  };

  render() {
    const { classes, loggedIn, currentUser, movies } = this.props;
    const { removeFromFavs } = this;
    return (
      <div className="favs-list">
        {!currentUser ? (
          <div>You must be logged in. </div>
        ) : movies.length > 0 ? (
          movies.map(movie => (
            <div clasName="all-cards-container" style={{ height: "50%" }}>
              <Card
                className={classes.card}
                value={movie.movie_imdb_id}
                name={movie.movie_title}
              >
                <a href={`${movie.movie_website}`} target="_blank">
                  <CardMedia
                    className={classes.media}
                    style={{ height: "285px", width: "285px" }}
                    image={movie.movie_imgurl}
                    title={movie.movie_title}
                  />
                </a>
                <Chip
                  label="Remove"
                  className={classes.chip}
                  avatar={<Avatar src={movie.movie_imgurl} />}
                  onClick={() => removeFromFavs(movie)}
                  clickable
                />
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2">
                    {movie.movie_title}
                  </Typography>
                </CardContent>

                <CardActions
                  value={movie.movie_imdb_id}
                  name={movie.movie_title}
                >
                  {!loggedIn ? (
                    <Button size="small" color="primary">
                      <a href={movie.movie_website} target="_blank">
                        Learn More
                      </a>
                    </Button>
                  ) : null}
                </CardActions>
              </Card>
            </div>
          ))
        ) : (
          <div>{`${
            currentUser.firstname
          }, go search for movies to favorite.`}</div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(FavoriteMovieList);
