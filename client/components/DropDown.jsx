/* eslint-disable react/prop-types */
import React from 'react';

function DropDown(props) {
  const { ailment, handleChange, handleClick } = props;

  return (
    <div className="dropdown-container">
    <div className="dropdown">
      <label htmlFor="ailment">
        What is your ailment?
        <select name="ailments" id="ailments" value={ailment} onChange={handleChange}>
          <option value="headache">Headache</option>
          <option value="fever">Fever</option>
          <option value="cough">Cough</option>
          <option value="fatigue">Fatigue</option>
          <option value="aches">Aches</option>
          <option value="congestion">Congestion</option>
        </select>
        <button type="button" onClick={handleClick}>Submit</button>
      </label>
    </div>
    </div>
  );
}

export default DropDown;
