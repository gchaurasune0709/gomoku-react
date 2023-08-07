import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './pages/layout';
import Login from './pages/login';
import Home from './pages/home';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='login' element={<Login />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
