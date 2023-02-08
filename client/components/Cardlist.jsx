import React from 'react';
import Card from './Card';

/* eslint-disable react/prop-types */

function Cardlist(props) {
  const { columns, rows, dataProperties } = props;
  console.log('Test', columns, rows, dataProperties);
  return (
    <Card
    />
  );
}

export default Cardlist;
