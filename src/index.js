import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import HeaderE from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Frontpage from './Frontpage/Frontpage'
import Profilepage from './Profilepage/Profilepage';
import GroupPage from './GroupPage/GroupPage';
import Moviepage from './Moviepage/Moviepage';
import Register from './components/Register';
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
        <Route path="/Group" element={<GroupPage />} />
        <Route path="/Movie" element={<Moviepage />} />
        <Route path="/Register" element={<Register/>}/>
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
