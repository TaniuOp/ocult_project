import React from 'react';
import './Prequiz.css';
import { Link } from 'react-router-dom';
import AuthService from "../../services/authservice";


const Prequiz = () =>{

  const currentUser = AuthService.getCurrentUser();
  const name = currentUser.userData.name;
  console.log(currentUser)


  return <div className='div_container_prequiz'>
    <div className='div_welcome_prequiz'>
      <p className='p_intro' style={{fontWeight: 'bold'}}>Hola {name},</p> 
      <p className='p_intro'>vas a comenzar un test.</p>
      <p className='p_intro'>Antes de empezar, recuerda:</p>
    </div>
    
    <div className='div_text_prequiz_container'>
      <div className='div_text_prequiz'>
        <img className='img_prequiz' src='../assets/icons/Question.png' />
        <p>¡No olvides responder a todas las preguntas! </p>
      </div>
      <div className='div_text_prequiz'>
        <img className='img_prequiz' src='../assets/icons/oneway.png' />
        <p>Lamentablemente, no podrás vover a atrás.</p>
      </div>
      <div className='div_text_prequiz'>
        <img className='img_prequiz' src='../assets/icons/thumbs.png' />
        <p>En cada pregunta, echa un buen ojo al feedback.</p>
      </div>
    </div>
    

    {/* <div className='div_imag_prequiz'>
      <img src='../assets/icons/candadobackground.png'/>
    </div> */}
    <div className='div_btn' >
      <button className='btn_prequiz'> <Link to="/quiz">Acceder</Link> </button>
      <button className='btn_prequiz'><Link to="/profile">Postponer</Link></button>
    </div>
  </div>

};

export default Prequiz;
