import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import HeaderE from './Header';
import Footer from './Footer';
import Login from './components/Login';
import Frontpage from './Frontpage'
import Profilepage from './Profilepage';
import { BrowserRouter,Route, Routes } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HeaderE />
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Frontpage />} />
        <Route path="/Profile" element={<Profilepage />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  </React.StrictMode>
  /* Remember to change Profilepage path back to #Profile */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
