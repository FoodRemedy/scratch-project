import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import FeatureContainer from '../containers/FeaturePageContainer';
import Login from './Login';


function App() {
  const [globalUser, setGlobalUser] = useState('');
  return (
    
    <Router>
      <Routes>
        <Route path="/" exact element={<Login setGlobalUser={setGlobalUser} globalUser={globalUser}/>} />
        <Route path="/feature" exact element={ globalUser ? <FeatureContainer globalUser={globalUser} setGlobalUser={setGlobalUser}/> : null} />
      </Routes>
    </Router>

  );
}

export default App;
