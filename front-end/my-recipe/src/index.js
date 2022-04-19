import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SignIn from './components/SignIn';
import Register from "./components/Register"
import Homepage from './components/Homepage';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="SignIn" element={<SignIn />} />
      <Route path="Register" element={<Register />} />
      <Route path="Homepage" element={<Homepage />} />
    </Routes>
  </BrowserRouter>,

  document.getElementById('root')
);