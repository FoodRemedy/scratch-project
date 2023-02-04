import React, { useState } from 'react';
import Table from '../components/Table';
import DropDown from '../components/DropDown';

function FeatureContainer() {
  const tableHeaders = ['Insert', 'food', 'headers'];
  const tableProperties = ['Insert', 'food', 'properties'];
  const [ailment, setAilment] = React.useState('headache');

  const [foodEntries, setFoodEntries] = useState([]);

  const handleChange = (event) => {
    setAilment(event.target.value);
  };

  const handleClick = () => {
    fetch('http://localhost:3000/search', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        setFoodEntries(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Placeholder</h1>
      <DropDown handleChange={handleChange} handleClick={handleClick} ailment={ailment} />
      <Table columns={tableHeaders} rows={foodEntries} dataProperties={tableProperties} />
    </>
  );
}

export default FeatureContainer;
