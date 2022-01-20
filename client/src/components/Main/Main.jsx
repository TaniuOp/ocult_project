import React from "react";
import {Routes, Route} from 'react-router-dom';
import Home from '../Home';
import Quiz from '../Quiz';
import Login from '../Login';
import Loginadmin from '../Loginadmin';
import Profile from '../Profile';
import Placeholder from '../Placeholder';
import Register from '../Register';
import Chatbot from '../Chatbot';
import Dashboard from "../Dashboard/Dashboard";
import Prequiz from "../Prequiz/Prequiz";


const Main = () => {
  return <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/quiz' element={<Quiz/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/placeholder' element={<Placeholder/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/loginadmin' element={<Loginadmin/>}/>
    <Route path='/chatbot' element={<Chatbot/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/prequiz' element={<Prequiz/>}/>
  </Routes>;
};

export default Main;
