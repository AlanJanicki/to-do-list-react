import { Route, Routes } from 'react-router-dom';

import './App.css';

import Account from './pages/Account/Account';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Account />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
