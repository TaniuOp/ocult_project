import React, { useState, useEffect } from "react";
import './Profile.css'
import { NavLink } from 'react-router-dom';
import AuthService from "../../services/authservice";
import axios from "axios";


const Profile = () => {

  const [userScore, setUserScore] = useState();
  const [userQuestions, setUserQuestions] = useState();

  const currentUser = AuthService.getCurrentUser();
  const email = currentUser.userData.email

  useEffect(() => {
    async function fetchUserScore() {
      try {
        const res = await axios.get(`http://localhost:5000/api/score?email=${email}`)
        const lastScore = res.data[0].last_score
        const lastQuestions = res.data[0].last_quiz_questions
        setUserScore(lastScore)
        setUserQuestions(lastQuestions)
      } catch (e) {
        setUserScore("")
        setUserQuestions("")
      }
    } fetchUserScore()
  }, [])

  const paintScore = () => {
    if (userScore == null) {
      return <div className="userScoreToDo">
        <img src="../assets/icons/user_recomendation.png" className="recomendation" alt="recomendation" />
        <p>Tu administrador te recomienda la realización de un test</p>
        <NavLink to="/prequiz">Haz click aquí para comenzar</NavLink>
      </div>
    } else {
      if (userScore >= userQuestions/2) {
        return <div className="userScoreGood">
          <img src="../assets/icons/user_recomendation.png" className="recomendation" alt="recomendation" />
          <p>Puntuación en último quiz: {userScore}</p>
          <p>Pronto recibirás tu certificado por email</p>
        </div>
      } else {
        return <div className="userScoreBad">
          <img src="../assets/icons/user_recomendation.png" className="recomendation" alt="recomendation" />
          <p>Puntuación en último quiz: {userScore}</p>
        </div>
      }
    }
  }

  return <div className="userDashboardContainer">
    <aside className="asideNav">
      <ul className="aside">
        <li><img src="../assets/icons/aside/icon_recursos.png" alt="icon" /><NavLink to='/placeholder' className="aside">Recursos</NavLink></li>
        <li><img src="../assets/icons/aside/icon_chatbot.png" alt="icon" /><NavLink to='/chatbot' className="aside">Chatbot</NavLink></li>
        <li><img src="../assets/icons/aside/icon_configuracion.png" alt="icon" /><NavLink to='/placeholder' className="aside">Configuración</NavLink></li>
        <li><img src="../assets/icons/aside/icon_ayuda.png" alt="icon" /><NavLink to='/placeholder' className="aside">Ayuda</NavLink></li>
        <li onClick={AuthService.logout}><img src="../assets/icons/aside/icon_cerrarses.png" alt="icon" /><NavLink to='/' className="aside">Cerrar Sesión</NavLink></li>
      </ul>
    </aside>
    {/* Contenedor principal de las cajas del perfil */}
    <div className="userDashboardData">

      {/* 1 */}
      <div className="rowOne">
        {/* Contenedor datos de perfil */}
        <div className="userData">
          <img className="userImg" src={currentUser.userData.image} />
          <div className="userPersonalData">
            <h2>{currentUser.userData.name}</h2>
            <p>{currentUser.userData.email}</p>
            <p>Empresa: The Bridge</p>
            <p>PRINCIPIANTE</p>
            <img className="progress" src="../assets/icons/progressbar.png" alt="userLevel" />
          </div>
        </div>
        {/* Contenedor recomendación del quiz */}
        <div className="userRecomendation">
          <>
            {paintScore()}
          </>
        </div>
      </div>

      {/* 2*/}
      <div className="rowTwo">
        {/* Contenedor de la gráfica */}
        <div className="userGraph">
          <p>Tu nivel de conocimiento por áreas</p>
          <img src="../assets/icons/graf_1.png" className="userGraph" alt="userGraph" />
          <img src="../assets/icons/graf_2.png" className="userGraph" alt="userGraph" />
          <img src="../assets/icons/graf_3.png" className="userGraph" alt="userGraph" />
          <img src="../assets/icons/graf_4.png" className="userGraph" alt="userGraph" />
          <img src="../assets/icons/graf_5.png" className="userGraph" alt="userGraph" />
        </div>
      </div>

      {/* 3 */}
      <div className="rowThree">

        {/* Contenedor chatBot*/}
        <div className="userBot">
          <p>¿Puedes comprobarme una URL? ¿Qué contraseña es más segura?</p>
          <p>Pregunta todas tus dudas a nuestro Chatbot</p>
          <img src="../assets/icons/bot_robot.png" className="robot" alt="ChatBot" />
          <button><NavLink to="/chatbot">ACCEDE AQUI</NavLink></button>

        </div>
        {/* Contenedor listado Quizes*/}
        <div className="userQuizes">
          <p>Tus Quiz</p>
          <div className="quizes">
            <div className="imgatkcontainer">
              <div className="imgatck">
                <img src="https://images.unsplash.com/photo-1592772874383-d08932d29db7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2440&q=80" className="quiz" alt="quiz" />
                <p>Ciberataques</p>
              </div>
              <div className="imgatck">
                <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" className="quiz" alt="quiz" />
                <p>Pagos en Internet</p>
              </div>
            </div>
            <div className="imgatkcontainer">
              <div className="imgatck">
                <img src="https://images.unsplash.com/photo-1617854818583-09e7f077a156?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" className="quiz" alt="quiz" />
                <p>Urls</p>
              </div>
              <div className="imgatck">
                <img src="https://images.unsplash.com/photo-1634224143538-ce0221abf732?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80" className="quiz" alt="quiz" />
                <p>Contraseña</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Profile;
