import { useEffect, useState } from "react";

import StarRating from './StarRating';
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const KEY = '3121ce55';

export default function MovieDetails({ watched, selectedId, onCloseMovie, onAddWatched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userRating, setUserRating] = useState('');

  const { Title, Year, Poster, Runtime, imdbRating, Plot, Released, Actors, Director, Genre } = movie;

  const isWatched = watched.find(({ imdbID }) => imdbID === selectedId);
  const watchedUserRating = watched.find(({ imdbID }) => imdbID === selectedId)?.userRating;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      Title,
      Year,
      Poster,
      userRating,
      imdbRating: +imdbRating,
      Runtime: +Runtime.split(' ').at(0)
    };
      
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(function() {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
        if (!res.ok) throw new Error('Something went wrong with fetching movie details');

        const data = await res.json();
        if (data.Error) throw new Error(data.Error);
  
        setMovie(data);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getMovieDetails();
  }, [selectedId]);

  useEffect(function() {
    if (!Title) return;
    
    document.title = `Movie | ${Title}`;

    return function() {
      document.title = 'usePopcorn';
    }
  }, [Title]);

  useEffect(function() {
    const callback = (e) => e.code === 'Escape' && onCloseMovie();

    document.addEventListener('keydown', callback);

    return function() {
      document.removeEventListener('keydown', callback);
    }
  }, [onCloseMovie]);

  return (
    <div className="details">
      {isLoading && <Loader/>}
      {
        !isLoading && !error && 
          <>
            <header>
              <button className="btn-back" onClick={onCloseMovie}>
                &larr;
              </button>

              <img src={Poster} alt={`Poster of ${Title} movie`}/>
              <div className="details-overview">
                <h2>{Title}</h2>
                <p>{Released} &bull; {Runtime}</p>
                <p>{Genre}</p>
                <p><span>⭐️</span>{imdbRating} IMDb rating</p>
              </div>
            </header>

            <section>
              <div className="rating">
                {
                  !isWatched ? 
                  <>
                    <StarRating 
                      maxRating={10} 
                      size={24} 
                      onSetRating={setUserRating}
                    />
                    {userRating > 0 && <button className="btn-add" onClick={handleAdd}>+ Add to list</button>}
                  </> :
                  <p>You rated this movie {watchedUserRating} <span>⭐️</span></p>
                }
              </div>
              <p><em>{Plot}</em></p>
              <p>Starring: {Actors}</p>
              <p>Directed by {Director}</p>
            </section>
          </>
      }
      {error && <ErrorMessage message={error}/>}
    </div>
  );
}
