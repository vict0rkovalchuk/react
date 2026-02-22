import { useState } from "react";
import PropTypes from 'prop-types';

import Star from "./Star";

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px'
}

const starContainerStyle = {
  display: 'flex',
}

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  messages: PropTypes.array,
  defaultRating: PropTypes.number,
  onSetRating: PropTypes.func
};

export default function StarRating({ 
  maxRating = 5, 
  color = '#fcc419', 
  size = 48,
  className = '',
  messages = [],
  defaultRating = 0,
  onSetRating
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const textStyle = {
    lineHeight: '1',
    margin: '0',
    color,
    fontSize: `${size / 1.5}px`
  }

  function handleRating(rating) {
    setRating(rating);
    onSetRating && onSetRating(rating);
  }

  function handleMouseEnter(rating) {
    setTempRating(rating);
  }

  function handleMouseLeave(rating) {
    setTempRating(rating);
  }

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star 
            key={i} 
            onClick={() => handleRating(i + 1)}
            onMouseEnter={() => handleMouseEnter(i + 1)}
            onMouseLeave={() => handleMouseLeave(0)}
            isFull={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {
          messages.length === maxRating ? 
          messages[
            tempRating ? tempRating - 1 : rating - 1
          ] : 
          tempRating || rating || ''
        }
      </p>
    </div>
  );
}
