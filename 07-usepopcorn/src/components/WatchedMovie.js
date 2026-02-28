export default function WatchedMovie({ movie: { imdbID, Poster, Title, imdbRating, userRating, Runtime }, onDeleteWatched }) {
  return (
    <li>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{Runtime} min</span>
        </p>

        <button className="btn-delete" onClick={() => onDeleteWatched(imdbID)}>X</button>
      </div>
    </li>
  );
}