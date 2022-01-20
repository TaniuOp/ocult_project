import React, { useState, useEffect } from "react";
import axios from "axios";
import './Dashboard.css';
import AuthService from "../../services/authservice";
import { NavLink } from 'react-router-dom';


const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    async function getUsers() {
      try {
      const res = await axios.get(`http://localhost:5000/api/dashboard`);
      const json = res.data.rows;
      console.log('esto son los JSON', json);
      const userData = json.map(element => {
        return {
          "name": element.name,
          "score": element.last_score
        }
      })
      setUsers(userData)
    } catch (e) {
      setUsers([])
    }
    }getUsers()
  }, [])


  const paintUsers = () => {
    return users.map(users =>
      <>
          <tr> 
            <td>{users.name}</td>
            <td>{users.score}</td>
          </tr>
      </>)
  }

  return <div className="userDashboardContainer">
    <aside className="asideNav">
      <ul className="aside">
        <li onClick={AuthService.logout}><img src="../assets/icons/aside/icon_cerrarses.png" alt="icon" /><NavLink to='/' className="aside">Cerrar Sesión</NavLink></li>
      </ul>
    </aside>

    <div className="dashboard">

      <div className="userAdminData">
        <img className="userImg" src={currentUser.userData.image} />
        <div className="userPersonalData">
          <h2>{currentUser.userData.name}</h2>
          <p>Rol: Administrador</p>
        </div>
      </div>

      <div className="userGet">
        <p>Asignar nuevos retos a empleados</p>
        <button className="btn_retos">Proximamente</button>
      </div>

      <h2>Puntuación de empleados</h2>
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Puntuación</th>
          </tr>
        </thead>
        <tbody>

            {paintUsers()}

        </tbody>
      </table>
    </div>

  </div>;
};


export default Dashboard;
