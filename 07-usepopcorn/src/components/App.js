import { useEffect, useState } from "react";

import NavBar from "./NavBar";
import Main from "./Main";
import Logo from "./Logo";
import Search from "./Search";
import NumResults from "./NumResults";
import Box from "./Box";
import MovieList from "./MovieList";
import WatchedSummary from "./WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";

const KEY = '3121ce55';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const [watched, setWatched] = useState(() => JSON.parse(localStorage.getItem('watched')));

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId(prevSelectedId => prevSelectedId !== id ? id : null);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched(prevWatched => [...prevWatched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched(prevWatched => prevWatched.filter(({ imdbID }) => imdbID !== id));
  }

  useEffect(function() {
    localStorage.setItem('watched', JSON.stringify(watched));
  }, [watched]);

  useEffect(function() {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, 
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error('Something went wrong with fetching movies');

        const data = await res.json();
        if (data.Error) throw new Error(data.Error);
        
        setMovies(data.Search);
        setError('');
      } catch (error) {
        console.error(error.message);
        error.name !== 'AbortError' && setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    handleCloseMovie();
    fetchMovies();

    return function() {
      controller.abort();
    }
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery}/>
        <NumResults movies={movies}/>
      </NavBar>
      
      <Main>
        <Box>
          {isLoading && <Loader/>}
          {
            !isLoading && !error && 
              <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>
          }
          {error && <ErrorMessage message={error}/>}
        </Box>

        <Box>
          {
            selectedId ? 
            <MovieDetails 
              watched={watched}
              selectedId={selectedId} 
              onCloseMovie={handleCloseMovie} 
              onAddWatched={handleAddWatched}
            /> : 
            <>
              <WatchedSummary watched={watched}/>
              <WatchedMoviesList 
                watched={watched} 
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          }
        </Box>
      </Main>
    </>
  );
}