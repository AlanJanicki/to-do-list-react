import { useEffect } from 'react';

import { useApolloClient } from '@apollo/client';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css';

import Account from './pages/Account/Account';
import AutoLogoutHandler from './components/AutoLogoutHandler/AutoLogoutHandler';
import Home from './pages/Home/Home';

function App() {
  const user = useSelector((state) => state.auth.user);

  let isDarkModeActive = user ? user.enabledDarkMode : false;

  const client = useApolloClient();

  useEffect(() => {
    if (!user) {
      client.clearStore();
    }
  }, [client, user]);

  useEffect(() => {
    if (isDarkModeActive) {
      document.documentElement.style.backgroundColor = '#0e1217';
    } else {
      document.documentElement.style.backgroundColor = '';
    }
  }, [isDarkModeActive]);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Account />} />
        <Route path='/home' element={user ? <Home /> : <Account />} />
      </Routes>
      <AutoLogoutHandler />
    </div>
  );
}

export default App;
