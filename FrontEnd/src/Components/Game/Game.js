import React from "react";
import { Link, Route } from "react-router-dom";
// eslint-disable-next-line
import SingleHomeMovie from "../SingleHomeMovie";
import LeaderBoard from "./LeaderBoard";
// eslint-disable-next-line
// import dotenv from 'dotenv';
import CurrentScore from "./CurrentScore";
import currencyFormatter from "currency-formatter";
import swal from "sweetalert2";
import axios from "axios";
import "../../Views/App.css";
import "../../Views/animate.css";

import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import CircularProgress from "material-ui/Progress/CircularProgress";
import Button from "material-ui/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "material-ui/styles";

const KEY = process.env.REACT_APP_OMDB_KEY;

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
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTwoMovies();
  }

  render() {
    const {
      classes,
      user,
      originalScore,
      movie1,
      movie2,
      score,
      currentUser,
      getWinner,
      getTwoMovies
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
                  <div className="versus-div">
                    <Tooltip
                      id="tooltip-top-start"
                      title="Click for 2 More!"
                      placement="top-start"
                    >
                      <Button onClick={getTwoMovies}>
                        {" "}
                        <span id="versus-span">MORE!</span>
                      </Button>
                    </Tooltip>
                  </div>
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
