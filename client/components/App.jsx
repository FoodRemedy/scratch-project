import React from 'react';
import FeatureContainer from '../containers/FeaturePageContainer';
import Login from './Login';
import Profile from './Profile';
import Signup from './Signup';
import { useSelector, useDispatch } from 'react-redux';
import { setAppPage } from '../slices';

function App(props) {
  const appPage = useSelector((state) => state.control.appPage);
  const dispatch = useDispatch();
  const header = (
    <section className='header'>
      <img
        onClick={() => {
          dispatch(setAppPage('/'));
        }}
        className='logo'
        src={require('../images/logo.png')}
      />
    </section>
  );

  const getCurrentPage = () => {
    switch (appPage) {
      case '/signup':
        return <Signup appPage={appPage} />;
      case '/profile':
        return <Profile appPage={appPage} />;
      case '/feature':
        return <FeatureContainer appPage={appPage} />;
      default: //'/':
        return <Login appPage={appPage} />;
    }
  };

  return (
    <div>
      {header}
      {getCurrentPage()}
    </div>
  );
}

export default App;
