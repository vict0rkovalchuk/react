import { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import { useLocaleStorageState } from "../hooks/useLocaleStorageState";

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

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocaleStorageState([], 'watched');

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