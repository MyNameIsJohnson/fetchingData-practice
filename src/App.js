import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([])
  // const fetchFilms = () => {
  //   const endpoint = `https://swapi.dev/api/films/`;
  //   fetch(endpoint)
  //     .then((response) => {
  //       return response.json()
  //     })
  //     .then((data) => {
  //       // You can transform your data from the API to match your props 
  //       const transformData = data.results.map(movieData => {
  //         return {
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           releaseDate: movieData.release_date,
  //           openingText: movieData.opening_crawl
  //         }
  //       }) 
  //       setMovies(transformData)
  //     })
  // };

  // async await way of fetching data 
  const fetchFilms = async () => {
    const endpoint = `https://swapi.dev/api/films/`;
    const data = await (await fetch(endpoint)).json()

   
        // You can transform your data from the API to match your props 
        const transformData = data.results.map(movieData => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            releaseDate: movieData.release_date,
            openingText: movieData.opening_crawl
          }
        }) 
        setMovies(transformData)
      
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchFilms}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
