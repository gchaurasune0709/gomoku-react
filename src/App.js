import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './pages/layout';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Home from './pages/home';
import Games from './pages/games';
import GameBoard from './components/gameBoard';
import History from './pages/history';
import './App.css';
import { useState } from 'react';
import Cookies from 'js-cookie';


function App() {
   // Check if the user is authenticated by checking the presence of the 'token' cookie
   const isAuthenticated = !!Cookies.get('token');

   const PrivateRoute = () => {
    // determine if authorized, from context or however you're doing it
  
      // If authorized, return an outlet that will render child elements
      // If not, return element that will navigate to login page
      return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
    }

  const [size, setSize] = useState(0);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<Home/>}></Route>
            <Route exact path="/game" element={<GameBoard />}></Route>
          </Route>
          <Route path='games' element={<Games />}></Route>
          <Route path='game-log/:id' element={<History />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='login' element={<Login />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
