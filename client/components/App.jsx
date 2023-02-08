import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import FeatureContainer from '../containers/FeaturePageContainer';
import Login from './Login';
import Profile from './Profile';

function App() {
  const [globalUser, setGlobalUser] = useState('');
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          exact
          element={
            <Login setGlobalUser={setGlobalUser} globalUser={globalUser} />
          }
        />
        <Route
          path='/feature'
          exact
          element={
            globalUser ? (
              <FeatureContainer
                globalUser={globalUser}
                setGlobalUser={setGlobalUser}
              />
            ) : null
          }
        />
        <Route
          path='/profile/:username'
          exact
          element={
            globalUser ? (
              <Profile setGlobalUser={setGlobalUser} globalUser={globalUser} />
            ) : null
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
