import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeatureContainer from '../containers/FeaturePageContainer';
import Login from './Login';

function App(props) {
  const [globalUser, setGlobalUser] = useState('');
  const [appPage, setAppPage] = useState('/');

  return (
    <Router>
      <Routes>
        <Route
          path='/feature'
          exact
          element={
            <FeatureContainer
              globalUser={globalUser}
              setGlobalUser={setGlobalUser}
              appPage={appPage}
              setAppPage={setAppPage}
            />
          }
        />
        <Route
          path='/'
          exact
          element={
            <Login
              setGlobalUser={setGlobalUser}
              globalUser={globalUser}
              appPage={appPage}
              setAppPage={setAppPage}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
