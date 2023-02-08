/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

function Card(props) {
  const { columns, rows, dataProperties } = props;
  console.log('Test', columns, rows, dataProperties);
  const tableHeaders = [
    'Name',
    'Calcium',
    'Potassium',
    'Iron',
    'Zinc',
    'Vitamin A',
    'Vitamin C',
    'Vitamin B-12',
    'Vitamin D',
    'Vitamin E',
    'Niacin',
  ];

  

  return (
    <div className="cardContainer">
      <div className="card">
        <div className="name">
          <h1> {tableHeaders[0]}: </h1>
        </div>
        <ul className="detailsList"> 
          <h2>Nutrition Facts</h2>
          {tableHeaders.slice(1).map((header, index) => (
            <li key={index}>{header}:</li>
          ))}
        </ul>
      </div> 
    </div>
  );
}
export default Card;
