import React from "react";

class Input extends React.Component {
  render() {
    const { location, onChangeLocation } = this.props;

    return (
      <div>
        <input 
          type="text" 
          placeholder="Search for location" 
          value={location}
          onChange={onChangeLocation}
        />
      </div>
    );
  }
}

export default Input;