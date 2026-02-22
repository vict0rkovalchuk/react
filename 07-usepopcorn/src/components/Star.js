import FullStar from "./FullStar";
import EmptyStar from "./EmptyStar";

export default function Star({ 
  onClick, 
  onMouseEnter, 
  onMouseLeave, 
  isFull, 
  color, 
  size 
}) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: 'block',
    cursor: 'pointer',
    color
  }

  return (
    <span
      style={starStyle}
      role="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isFull ? <FullStar /> : <EmptyStar />}
    </span>
  );
}
