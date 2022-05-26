import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  // async await way of fetching data 
  
  
  const fetchFilms = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = await fetch(`https://swapi.dev/api/film/`);
      if(!endpoint.ok){
        throw new Error('Something went wrong')
      }
      const data = await endpoint.json();
  
      // You can transform your data from the API to match your props 
      const transformData = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl
        }
      }); 
      setMovies(transformData)
    } catch (error){
      setError(error.message)
    }
    setIsLoading(false)
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchFilms}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && 
        <p>Loading .... </p>
        }        
        {!isLoading && movies.length > 0 &&
        <MoviesList movies={movies} />
        }
        {!isLoading && movies.length === 0 && !error &&
        <p>Found No Movies</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
