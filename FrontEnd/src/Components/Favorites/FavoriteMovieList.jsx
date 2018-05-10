import React from 'react'
import { Link } from 'react-router-dom'

const FavoriteMovieList = ({ movies }) => (
  <div>
    {movies.map(movie => (
      <div className='movie-item'>
        <img src={movie.movie_imgurl} alt='movie poster' />
        <div className='movie-info'>
          <div className='movie-title'>{movie.movie_title}</div>
          <div className='movie-more-info'><a href = {`${movie.movie_website}`} target= "_blank">More info 
          </a></div>
        </div>
      </div>
    ))}
  </div>

)

export default FavoriteMovieList 