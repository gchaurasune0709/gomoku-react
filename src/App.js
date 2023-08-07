import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './pages/layout';
import Login from './pages/login';
import Game from './pages/game';
import Home from './pages/home';
import Games from './pages/games';
import History from './pages/history';
import './App.css';
import { useState } from 'react';


function App() {
  const [size, setSize] = useState(0);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='game' element={<Game />}></Route>
          <Route path='games' element={<Games />}></Route>
          <Route path='game-log/:id' element={<History />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
