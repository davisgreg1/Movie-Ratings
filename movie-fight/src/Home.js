import React from 'react';
import './index.css';
import { Link, Switch, Route } from 'react-router-dom';
import Game from './Game';

class Home extends React.Component {

  render() {
    let playSrc = "http://pluspng.com/img-png/play-button-png-play-video-button-png-321.png";
    return(
      <div id="container">
        <div id="headerDiv">
          <h1 id="headerTag">Welcome to the home of the <span id="fightSpan">MOVIE FIGHTS</span>!!</h1>
          <div id="howToPlayList">
          <h4>How To Play:</h4>
            <ol>
              <li>Enter Warrior 1's name and Warrior 2's name.</li>
              <li>Warriors will be shown two amazing movies!</li>
              <li>The Warrior to choose the movie that earned the higher rating wins the battle!</li>
              <li>But, the Warrior to get the highest score at the end WINS THE WAR!</li>
              <li>Press the {" "} <img id="listPlayImg" src={ playSrc } alt="play button"/> button {" "} below to begin a war.</li>
            </ol>
          </div>
          <div id="imgBtnDiv">
            <Link to="/play">
              <img id="playBtn" src={ playSrc } alt="play button"/>
            </Link>
              <Switch>
                <Route path="/play" component= { Game } />
              </Switch>
          </div>
        </div>
      </div>
    )
  }
}
export default Home
