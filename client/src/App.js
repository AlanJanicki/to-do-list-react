import { Route, Routes } from 'react-router-dom';

import { useSelector } from 'react-redux';

import './App.css';

import Account from './pages/Account/Account';
import AutoLogoutHandler from './components/AutoLogoutHandler/AutoLogoutHandler';
import Home from './pages/Home/Home';

function App() {
  const user = useSelector((state) => state.auth.user);

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
