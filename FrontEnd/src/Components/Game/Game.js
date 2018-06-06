import React from "react";
// eslint-disable-next-line
import SingleHomeMovie from "../SingleHomeMovie";
// eslint-disable-next-line
// import dotenv from 'dotenv';
import CurrentScore from "./CurrentScore";
import "../../Views/App.css";
import "../../Views/animate.css";
import Card from "material-ui/Card";
import CircularProgress from "material-ui/Progress/CircularProgress";
import { withStyles } from "material-ui/styles";

const styles = {
  root: {
    height: "100%",
    flexGrow: 1
  },
  flex: {
    flex: 1,
    color: "white",
    paddingLeft: "0px"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
};

class Game extends React.Component {

  componentDidMount() {
    this.props.getTwoMovies();
  }

  render() {
    const {
      classes,
      movie1,
      movie2,
      score,
      getWinner
    } = this.props;

    return (
      <React.Fragment>
        <div id="movie-1-and-2-container">
          {!this.props.currentUser ? (
            <div>MUST BE LOGGED IN.</div>
          ) : (
            <div className="default-home-screen">
              <div>
                Your score is: <CurrentScore score={score} />
              </div>
              {!movie1 || !movie2 ? (
                <span className="circle">
                  <CircularProgress
                    size={50}
                    left={50}
                    top={50}
                    loadingColor="#FF9800"
                    status="loading"
                    style={{
                      display: "inlineBlock",
                      position: "relative"
                    }}
                  />
                </span>
              ) : (
                <div className="single-movie-container">
                  <Card
                    className={classes.card}
                    id="movie_num_1"
                    name="movie_num_1"
                    onClick={getWinner}
                  >
                    <SingleHomeMovie className="single-data" data={movie1} />
                  </Card>
                  <Card
                    className={classes.card}
                    id="movie_num_2"
                    name="movie_num_2"
                    onClick={getWinner}
                  >
                    <SingleHomeMovie className="single-data" data={movie2} />
                  </Card>
                </div>
              )}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(Game);
