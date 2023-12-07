import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Frontpage from './Frontpage/Frontpage'
import Profilepage from './Profilepage/Profilepage';
import GroupPage from './GroupPage/GroupPage';
import Moviepage from './Moviepage/Moviepage';
import Register from './components/Register';
import Browser from './Browserpage/Browser';
import { BrowserRouter, Route, Routes } from "react-router-dom" 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Frontpage />} />
        <Route path="/Profile/:userId" element={<Profilepage />} />
        <Route path="/Groups" element={<GroupPage />} />
        <Route path="/Movie" element={<Moviepage />} />
        <Route path="/Group" element={<GroupPage />} />
        <Route path="/movie/:movieId" element={<Moviepage />} />
        <Route path="/tv/:movieId" element={<Moviepage />} />
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Browse" element={<Browser/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
