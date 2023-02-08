/* eslint-disable react/prop-types */
import React from 'react';
import camelCase from 'camelcase';
const AILMENTS = require('../../constants');

function DropDown(props) {
  const { ailment, handleChange, handleClick } = props;
  const options = AILMENTS.map((elem, i) => (
    <option key={i} value={elem}>
      {camelCase(elem)}
    </option>
  ));
  return (
    <div className='dropdown-container'>
      <div className='dropdown'>
        <label htmlFor='ailment'>
          What is your ailment?
          <select
            name='ailments'
            id='ailments'
            value={ailment}
            onChange={handleChange}
          >
            {options}
          </select>
          <button type='button' onClick={handleClick}>
            Submit
          </button>
        </label>
      </div>
    </div>
  );
}

export default DropDown;
