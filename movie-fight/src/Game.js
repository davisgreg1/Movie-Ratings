import React from 'react';
import './index.css';
import dotenv from 'dotenv';
import { Link, Route, Switch } from 'react-router-dom';
import OneMovie from './OneMovie';
import './index.css';
const KEY = process.env.REACT_APP_OMDB_KEY;
const idArr = ['tt0111161','tt0068646','tt0071562','tt0468569','tt0050083','tt0108052','tt0110912','tt0167260','tt0060196','tt0137523','tt0120737','tt0109830','tt0080684','tt1375666','tt0167261','tt0073486','tt0099685','tt0133093','tt0047478','tt0076759','tt0120382','tt0107290','tt0477348','tt0395169','tt1201607','tt0264464','tt1856101','tt0435761','tt0361748','tt0180093','tt0054215','tt1675434','tt0120815','tt5580390','tt3501632','tt1485796','tt2283362','tt1259528','tt4154756','tt2527336','tt1825683','tt2380307','tt5519340','tt4765284','tt5052448','tt1615160','tt0451279','tt4574334','tt1396484','tt0116126'];

class Game extends React.Component {
  constructor(){
    super();

    this.state = {
      player1Name: '',
      player2Name: '',
      player1Score: '',
      player2Score: '',
      message: '',
      movie1: [],
      movie2: [],
    }

    console.log("the state after Mount:", this.state)

    // have a form here to grab the player1 name. If they dont want to enter their name, its ok, just make sure e.target.value === '' and continue on to player2. after p1 presses Submit, render the SAME form to player2


    //do a fetch here in a componentDidMount

    //then render something like <SBSMovies movies = { this.state.movies } />

  }


renderMovie = () => {
  const { movies }=this.state;
  return (
    <OneMovie movie={ movies.title } />
  )
}

handleSubmit = e => {
  e.preventDefault();
  let randomMovieID = `${idArr[Math.floor(Math.random() * idArr.length )]}`;
  console.log("randomMovieId from array:", randomMovieID)
  console.log("idArr in handleSubmmit is:", idArr)
  const { player1Name, player2Name, message, movie1, movie2 } = this.state;
  fetch(`http://www.omdbapi.com/?i=${randomMovieID}&apikey=${KEY}`)
    .then(response => {
      console.log("the json response", response);
      return response.json();
    })
    .then(data => {
      console.log("the data", data);
      return this.setState({
        movie1: data
      });
    });

  const secondFetch = () => {
      fetch(`http://www.omdbapi.com/?i=${idArr[Math.floor(Math.random() * idArr.length)]}&apikey=${KEY}`)
        .then(response => {
          console.log("the json response", response);
          return response.json();
        })
        .then(data => {
          console.log("the data", data);
          return this.setState({
            movie2: data,
            message: `${this.state.player2Name} your movie is: ${this.state.movie2.Title} ${this.state.player1Name} your movie is: ${this.state.movie1.Title}`
          });
        });
    }
    setTimeout(secondFetch(), 5000)
}

  handleInput = e => {
    const { player1Name, player2Name } = this.state
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
    console.log("The title is:",this.state.movie1)
    console.log("The title is:",this.state.movie2)
    console.log("data?",this.state)
    let whatName1 = "What's your name Warrior 1?"
    let whatName2 = "And yours Warrior 2?"
    const { player1Name, player2Name, message, movie1, movie2 } = this.state;
    return (
<div>
  <div id="formDiv">
    <form id="playerNameForm">
    <label>{ whatName1 }</label>
      <input type="text" name="player1Name" value={ player1Name } onChange={ this.handleInput }/> {" "}
    <label>{ whatName2 }</label>
      <input type="text" name="player2Name" value={ player2Name } onChange={ this.handleInput }/>
    <input type="submit" value="Submit names"  disabled={ !player1Name || !player2Name } onClick={ this.handleSubmit }/>
    </form>
  </div>
  <p>
    { message }
  </p>
  <div>
      <img className={player1Name && player2Name ? "imageDivShown" : "imageDivNotShown"} src={ movie1.Poster } />
  </div>
  <div>
      <img className={player1Name && player2Name ? "imageDivShown" : "imageDivNotShown"} src={ movie2.Poster } />
  </div>
</div>
    )
  }
}

export default Game



