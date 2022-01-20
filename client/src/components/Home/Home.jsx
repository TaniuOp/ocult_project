import React from "react";
import './Home.css'
import {Link} from 'react-router-dom';


const Home = () => {
  return <div>
    <h1 className="title">¿Estás seguro de que esta página es segura? </h1>
    <h3 className="title">Se nos ha olvidado preguntarte, ¿quién eres?</h3>
    <Link to="/login" className="primary">Soy Empleado</Link>
    <Link to="/loginadmin" className="secondary">Soy responsable</Link>
  </div>;
};

export default Home;
