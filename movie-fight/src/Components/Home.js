import React from 'react';
import '../Views/index.css';
import {Link, Switch, Route} from 'react-router-dom';
import Game from './Game';

class Home extends React.Component {

  render() {
    let playSrc = "http://pluspng.com/img-png/play-button-png-play-video-button-png-321.png";
    return (
      <div id="container">
        <div id="headerDiv">
          <div id="welcome-div">
            <h1 id="headerTag">Welcome to
              <span id="fightSpan">CinemaRates</span>
            </h1>
          </div>
          <div id="howToPlayList">
            <h4>How To Play:</h4>
            <ol>
              <li>You'll be shown two movie posters.</li>
              <li>Click which one you think was rated higher at IMDB!</li>
              <li>Press the {" "}
                <img id="listPlayImg" src={playSrc} alt="play button"/>
                 button {" "} below to begin a game.</li>
            </ol>
          </div>
          <div id="imgBtnDiv">
            <Link to="/game">
              <img id="playBtn" src={playSrc} alt="play button"/>
            </Link>
            <Switch>
              <Route path="/game" component={Game}/>
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}
export default Home
