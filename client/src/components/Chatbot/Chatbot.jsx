import React, { Component } from "react";
import ChatBot from 'react-simple-chatbot';
import { NavLink } from 'react-router-dom';
import './Chatbot.css';
import AuthService from "../../services/authservice";



const Chatbot = () => {
  const theme = {
    background: '#0070AD',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#0070AD',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#0070AD',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };
  const steps = [
    {
      id: '1',
      message: 'Mi nombre es Oculty ¿En qué puedo ayudarte?',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'Voy a buscar toda la información necesaria para poder ayudarte. ¡Dame un segundo!',
      end: false,
      trigger: '4',
    },
    {
      id: '4',
      message: 'El Phishing es un ciberataque en el que se recibe un correo, mensaje u otra notificación con un enlace malicioso en el que se piden credenciales de acceso y al introducirlas son robadas.',
      end: false,
      trigger: '5',
    },
    {
      id: '5',
      message: 'Sabes cuales son los pasos esenciales para mantener la seguridad del sistema?',
      trigger: '6',
    },
    {
      id: '6',
      options: [
        { value: 1, label: 'Sí', trigger: '8' },
        { value: 2, label: 'No', trigger: '7' },
       ,
      ],
    },
    {
      id: '7',
      message: '¡No hay problema! Te los digo yo: - Comprobar la url de redirección, - Comprobar el email emisor y - Asegurarse de que viene del dominio correcto.',
      end: false,
      trigger: '8',

    },
    {
      id: '8',
      message: '¿Hay algo mas en lo que pueda ayudarte?',
      end: false,
      trigger: '9',
    },
    {
      id: '9',
      options: [
        { value: 1, label: 'Sí', trigger: '10' },
        { value: 2, label: 'No', trigger: '10' },
       ,
      ],
    },
    {
      id: '10',
      message: 'Recuerda que Oculty está aqui para lo que necesites',
      end: true,
    },
    
  ];

    return <div className="chatbotContainer">
      <aside className="asideNav">
      <ul className="aside">
      <li><img src="../assets/icons/aside/icon_home.png" alt="icon" /><NavLink to='/profile' className="aside">Inicio</NavLink></li>
      <li><img src="../assets/icons/aside/icon_recursos.png" alt="icon" /><NavLink to='/placeholder' className="aside">Recursos</NavLink></li>
        <li><img src="../assets/icons/aside/icon_configuracion.png" alt="icon" /><NavLink to='/placeholder' className="aside">Configuración</NavLink></li>
        <li><img src="../assets/icons/aside/icon_ayuda.png" alt="icon" /><NavLink to='/placeholder' className="aside">Ayuda</NavLink></li>
        <li onClick={AuthService.logout}><img src="../assets/icons/aside/icon_cerrarses.png" alt="icon"/><NavLink to='/' className="aside">Cerrar Sesión</NavLink></li>
      </ul>
    </aside>
    <div className="chatbotDiv">
    <div className="div_chatbot">
      <ChatBot steps={steps} theme={theme}/>
      </div>
      </div>
    </div>
}


export default Chatbot;
