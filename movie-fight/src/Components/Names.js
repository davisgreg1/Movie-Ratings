import React from 'react';
import '../Views/index.css';
import dotenv from 'dotenv';
import {Link, Route, Switch} from 'react-router-dom';
import {Redirect} from 'react-router'
import OneMovie from './OneMovie';
import Game from './Game';

class Names extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player1Name: '',
      player2Name: '',
      message: ''
    }
  }

  // have a form here to grab the player1 name. If they dont want to enter their
  // name, its ok, just make sure e.target.value === '' and continue on to player2.
  // after p1 presses Submit, render the SAME form to player2 do a fetch here in a
  // componentDidMount then render something like <SBSMovies movies = {
  // this.state.movies } />

  // handleInput = e => {
  //   const {player1Name, player2Name} = this.state
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }

  render() {
    console.log("this.state:", this.state)
    let whatName1 = "What's your name Warrior 1?"
    let whatName2 = "And yours Warrior 2?"
    const {player1Name, player2Name, message} = this.state;
    return (
      <div> future implementation.
        {/* <div id="formDiv">
          <form id="playerNameForm">
            <label>{whatName1}</label>
            <input
              type="text"
              name="player1Name"
              value={player1Name}
              onChange={this.handleInput}/> {" "}
            <label>{whatName2}</label>
            <input
              type="text"
              name="player2Name"
              value={player2Name}
              onChange={this.handleInput}/>
            <Link to="/game">
              <button disabled={!player1Name || !player2Name} onClick={this.handleInput}>GO TO GAME</button>
            </Link>
          </form>
        </div> */}
      </div>
    )
  }
}

export default Names