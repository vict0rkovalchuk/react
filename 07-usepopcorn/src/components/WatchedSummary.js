const formatAverage = num => Math.round(num * 100) / 100;

const average = arr =>
  formatAverage(arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0));

export default function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map(({ imdbRating }) => imdbRating));
  const avgUserRating = average(watched.map(({ userRating }) => userRating));
  const avgRuntime = average(watched.map(({ Runtime }) => Runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}