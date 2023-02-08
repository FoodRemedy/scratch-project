/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';

function Card(props) {
  const { columns, rows, dataProperties } = props;
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('../server/populateDb.js');
      const foodData = await response.json();
      setFoodData(foodData);
    }
    fetchData();
  }, []);

  return (
    <div className="card">
      <div className="name">
        <h1> Food: </h1>
      </div>
      <ul className="detailsList">
        <h2>Nutrition Facts</h2>
        {columns.slice(1).map((header, property) => (
          <li key={property}>{header}: {`${property.quantity}`} </li>
        ))}
      </ul>
    </div>
  );
}
export default Card;
