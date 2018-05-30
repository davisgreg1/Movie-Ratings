import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import axios from "axios";
import "../../Views/App.css";

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

class FavoriteMovieList extends React.Component {
  constructor(props) {
    super(props);
  }

  removeFromFavs = movie => {
    axios
      .delete("/users/removeFavorite", {
        data: { id: movie.id }
      })
      .then(response => {
        console.table("response:",response)
      })
      .catch(error => {
        console.log(error);
      });
      window.location.reload()
  };

  render() {
    const { classes, loggedIn, currentUser, movies } = this.props;
    const { removeFromFavs } = this;
    return (
      <div className="favs-list">
        {!currentUser ? (
          <div>You must be logged in. </div>
        ) : movies.map(movie => (
          <div clasName="all-cards-container">
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
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {movie.movie_title}
                </Typography>

              <CardActions value={movie.movie_imdb_id} name={movie.movie_title}>
                {loggedIn ? (
                  <Button
                  onClick={() => removeFromFavs(movie)}
                  value={movie.movie_imdb_id}
                  name={movie.movie_title}
                  >
                    Remove From Favorites
                  </Button>
                ) : (
                  <Button size="small" color="primary">
                    <a href={movie.movie_website} target="_blank">
                      Learn More
                    </a>
                  </Button>
                )}
              </CardActions>
                </CardContent>
            </Card>
          </div>
        )) &&
        currentUser &&
        movies.length > 0 ? (
          movies.map(movie => (
            <div clasName="all-cards-container">
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
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2">
                    {movie.movie_title}
                  </Typography>
                </CardContent>

                <CardActions
                  value={movie.movie_imdb_id}
                  name={movie.movie_title}
                >
                  {loggedIn ? (
                    <Button
                      onClick={() => removeFromFavs(movie)}
                      value={movie.movie_imdb_id}
                      name={movie.movie_title}
                    >
                      Remove From Favorites
                    </Button>
                  ) : (
                    <Button size="small" color="primary">
                      <a href={movie.movie_website} target="_blank">
                        Learn More
                      </a>
                    </Button>
                  )}
                </CardActions>
              </Card>
            </div>
          ))
        ) : (
          <div>{`${currentUser.firstname}, go search for movies to favorite.`}</div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(FavoriteMovieList);
