/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';

function Card(props) {
  const { columns, rows, dataProperties } = props;
  const [foodData, setFoodData] = useState([]);
  
  //fetch the data from the database store itinto a state
 const getData = () => {

    fetch(`/api`)
      .then((res) => res.json())
      .then((food) => {
        const foodCard = { name: food.ingredients[0].text };
        console.log(foodCard)
// setFoodData()
      })
      .catch((err) =>
        console.log(`Error in retrieving foods from database. ${err}`)
      );
  };

  //25 want to use the state to render the food 
  //line 32 want to use another state to render the nutrition. fackts 
  return (
    <div className="card">
      <div className="name">
        <h1> Food:  </h1>
      </div>
      <ul className="detailsList">
        <h2>Nutrition Facts</h2>
        {columns.slice(1).map((header, property) => (
          <li key={property}>{header}: NUTRITION FACTS  </li>
        ))}
      </ul>
    </div>
  );
}
export default Card;
