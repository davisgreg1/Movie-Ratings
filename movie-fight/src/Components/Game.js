import React from 'react';
import '../Views/index.css';
// eslint-disable-next-line
import OneMovie from './OneMovie';
// eslint-disable-next-line
import dotenv from 'dotenv';
import swal from 'sweetalert2';

const KEY = process.env.REACT_APP_OMDB_KEY;

const idArr = [
  'tt0111161',
  'tt0068646',
  'tt0071562',
  'tt0468569',
  'tt0050083',
  'tt0108052',
  'tt0110912',
  'tt0167260',
  'tt0060196',
  'tt0137523',
  'tt0120737',
  'tt0109830',
  'tt0080684',
  'tt1375666',
  'tt0167261',
  'tt0073486',
  'tt0099685',
  'tt0133093',
  'tt0047478',
  'tt0076759',
  'tt0120382',
  'tt0107290',
  'tt0477348',
  'tt0395169',
  'tt1201607',
  'tt0264464',
  'tt1856101',
  'tt0435761',
  'tt0361748',
  'tt0180093',
  'tt0054215',
  'tt1675434',
  'tt0120815',
  'tt5580390',
  'tt3501632',
  'tt1485796',
  'tt2283362',
  'tt1259528',
  'tt2527336',
  'tt2380307',
  'tt5519340',
  'tt4765284',
  'tt5052448',
  'tt1615160',
  'tt0451279',
  'tt4574334',
  'tt1396484',
  'tt0116126'
];

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      player1Name: '',
      player2Name: '',
      player1Score: '',
      player2Score: '',
      message: '',
      movie1: [],
      movie2: [],
      player1RatingChoice: '',
      movie1Rating: '',
      movie2Rating: ''
    }
  }

  handleInput = e => {
// eslint-disable-next-line
    const {player1Name, player2Name} = this.state
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();

    let randomMovieID = `${idArr[Math.floor(Math.random() * idArr.length)]}`;
// eslint-disable-next-line
    const {player1Name, player2Name, message, movie1, movie2} = this.state;

    fetch(`http://www.omdbapi.com/?i=${randomMovieID}&apikey=${KEY}`).then(response => {
      console.log("the first json response", response);
      return response.json();
    }).then(data => {
      console.log("the first fetch data", data);
      return this.setState({movie1: data});
    })
    const secondFetch = () => {
      fetch(`http://www.omdbapi.com/?i=${idArr[Math.floor(Math.random() * idArr.length)]}&apikey=${KEY}`).then(response => {
        console.log("the json response", response);
        return response.json();
      }).then(data => {
        console.log("the second fetched data", data);

        return this.setState({movie2: data, message: `${this.state.player1Name} your movie is: ${this.state.movie2.Title}`})
      })
    }
    secondFetch();
  }

  setRatings = () => {
// eslint-disable-next-line  
  const {movie1Rating, movie2Rating} = this.state
    this.setState({movie1Rating: this.state.movie1.imdbRating, movie2Rating: this.state.movie2.imdbRating})
    alert(this.state)
  }
  // renderMovie = () => {   const {movies} = this.state;   return (<OneMovie
  // movie={movies.title}/>) }

  render() {

    console.log("movie1 RATING?", this.state.movie1.imdbRating)
    console.log("movie1 data", this.state.movie1)
    console.log("movie2 RATING?", this.state.movie2.imdbRating)
    console.log("movie2 data", this.state.movie2)
    console.log('THE OVERALL STATE', this.state)
    const {
      player1Name,
// eslint-disable-next-line
      message,
      movie1,
      movie2,
// eslint-disable-next-line
      movie1Rating,
// eslint-disable-next-line
      movie2Rating
    } = this.state;
    let whatName1 = "What's your name player 1?"
    return (
      <div>
        <div id="formDiv">
          <form id="playerNameForm">
            <label className="label">{whatName1}</label>
            <input
              type="text"
              name="player1Name"
              value={player1Name}
              onChange={this.handleInput}/> {" "}
            <button disabled={!player1Name} onClick={this.handleSubmit}>Play!</button>
          </form>
        </div>
        <div>
          {movie1 && movie2
            ? <div id="movie-title-div">
                <div className="movie-title" id="movie1-title ">{movie1.Title}</div>
                <div className="movie-title"  id="movie2-title">{movie2.Title}</div>
              </div>
            : <div className="hidden"></div>
}
        </div>
        <div id="movie-div">
          <div className="box" id="movie-1-poster">
            <img
              className=
              // "player1Name"
              // ? 
              "imageDivShown"
              // : "imageDivNotShown"}
              name={movie1.Title}
              src={movie1.Poster}
              alt={movie1.Poster}
              onClick={() => swal(`${this.state.player1Name} '${this.state.movie1.Title}' was rated ${this.state.movie1.imdbRating}% at IMDB and '${this.state.movie2.Title}' was rated ${this.state.movie2.imdbRating}%!`)}/>
          </div>
          <div>
          <button className={player1Name ? "more-btn" : "hidden" } disabled={!player1Name} onClick={this.handleSubmit}>
            Get More!
          </button>
        </div>
          <div className="box" id="movie-2-poster">
            <img
              className=
              // {player1Name
              // ? 
              "imageDivShown"
              // : "imageDivNotShown"}
              name={movie2.Title}
              src={movie2.Poster}
              alt={movie2.Poster}
              onClick={() => swal(`${this.state.player1Name} '${this.state.movie2.Title}' was rated ${this.state.movie2.imdbRating}% at IMDB and '${this.state.movie1.Title}' was rated ${this.state.movie1.imdbRating}%!`)}/>
          </div>
        </div>
      </div>
    )
  }
}
export default Game;
