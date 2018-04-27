import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import "../Views/App.css";

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    maxWidth: 345,
    height: "400px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
};

class SingleHomeMovie extends React.Component {
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
      <React.Fragment>
        <div className="all-cards-container" value={data.data.original_title}>
          <Card className={classes.card}>
            {/* <a
            href={`https://www.themoviedb.org/movie/${data.data.id}`}
            target="_blank"
          > */}
            <CardMedia
              className={classes.media}
              style={{ height: "285px", width: "285px" }}
              image={
                data.data.poster_path === null
                  ? "http://www.reelviews.net/resources/img/default_poster.jpg"
                  : `${baseURL}${data.data.poster_path}`
              }
              title={`${data.data.original_title}`}
            />
            {/* </a> */}
            <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                {`${data.data.original_title}`}
              </Typography>
              {/* <Typography component="p">{`${data.data.overview}`}</Typography> */}
            </CardContent>

            {/* <CardActions>
              <Button size="small" color="primary">
              <div>
                <a
                  href={`https://www.themoviedb.org/movie/${data.data.id}`}
                  target="_blank"
                >
                  Learn More
                </a>
                </div>
              </Button>
             
            </CardActions> */}
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

SingleHomeMovie.propTypes = {
  classes: PropTypes.object.isRequired
};
// export default HomeScreenMovie;
export default withStyles(styles)(SingleHomeMovie);
