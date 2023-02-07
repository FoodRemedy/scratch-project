import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import DropDown from '../components/DropDown';

function FeatureContainer(props) {
  // const tableProperties = ['Insert', 'food', 'properties'];
  const [ailment, setAilment] = React.useState('headache');
  const navigate = useNavigate();

  const tableProperties = [
    'CA',
    'K',
    'FE',
    'ZN',
    'VITA_RAE',
    'VITC',
    'VITB12',
    'VITD',
    'TOCPHA',
    'NIA',
  ];
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

  const [foodEntries, setFoodEntries] = useState([]);

  const handleChange = (event) => {
    setAilment(event.target.value);
  };

  const handleLogout = () => {
    props.setGlobalUser('');
    navigate('/');
  }

  const handleClick = () => {
    console.log('ailment', ailment);
    fetch('http://localhost:3000/search', {
      method: 'POST',
      body: JSON.stringify({ ailment }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        // parse the data that has been sent back
        const parsedData = [];
        data.forEach((food) => {
          const foodRow = {
            name: food.ingredients[0].text,
            nutrients: [],
          };
          tableProperties.forEach((prop) => {
            foodRow.nutrients.push(food.totalNutrients[prop]);
          });
          parsedData.push(foodRow);
        });
        console.log('parsedData', parsedData);
        setFoodEntries(parsedData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <nav>
        <h1>Food Remedy</h1>
        <div className="logoutContainer">
          <p>{props.globalUser}</p>
          <button 
            onClick={handleLogout}
            className="logout">Logout</button>
        </div>
      </nav>

      <DropDown
        handleChange={handleChange}
        handleClick={handleClick}
        ailment={ailment}
      />
      <Table
        columns={tableHeaders}
        rows={foodEntries}
        dataProperties={tableProperties}
      />
    </>
  );
}

export default FeatureContainer;
