import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardContent, CardMedia } from "material-ui/Card";

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

  render() {
    const { classes, data } = this.props;
    let baseURL = `http://image.tmdb.org/t/p/w185`;
    return (
      <React.Fragment>
          <Card className={classes.card}>
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
            <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                {`${data.original_title}`}
              </Typography>
            </CardContent>
          </Card>
      </React.Fragment>
    );
  }
}

SingleHomeMovie.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SingleHomeMovie);
