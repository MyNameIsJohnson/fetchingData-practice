import React, {useState, useEffect, useCallback } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // async await way of fetching data 
  const fetchFilms = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Stars Wars API
      // const response = await fetch('https://swapi.dev/api/films/'); 
      const response = await fetch('https://strwrs-project-7e574-default-rtdb.firebaseio.com/movies.json');
      if(!response.ok){
        throw new Error('Something went wrong')
      }
      
      const data = await response.json();

      const loadedMovies = [];

      for(const key in data){
        loadedMovies.push({
          id: key, 
          title: data[key].title, 
          openingText: data[key].openingText, 
          releaseDate: data[key].releaseDate,
        });
      }

      // You can transform your data from the API to match your props 
      // This is for Stars Wars API
      // const transformData = data.results.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     releaseDate: movieData.release_date,
      //     openingText: movieData.opening_crawl
      //   }
      // }); 
      
      // setMovies(transformData)
      setMovies(loadedMovies)
    } catch (error){
      setError(error.message)
    }
    setIsLoading(false)
  }, []);
    
  useEffect(() => {
    fetchFilms();
  }, [fetchFilms]);
  
  const addMovie = async (movie) => {
    const response = await fetch('https://strwrs-project-7e574-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data)
  }

  let content = <p>Found No Movies.</p>;

  if(movies.length > 0){
    content = <MoviesList movies={movies}/>
  };
  
  if(isLoading){
    content = <p>Loading ... </p>
  };

  if(error){
    content = <p>{error}</p>
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovie}/>
      </section>
      <section>
        <button onClick={fetchFilms}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
