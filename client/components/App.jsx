import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeatureContainer from '../containers/FeaturePageContainer';
import Login from './Login';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/feature" exact element={<FeatureContainer />} />
      </Routes>
    </Router>

  );
}

export default App;
