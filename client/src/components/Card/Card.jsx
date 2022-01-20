import React, { useContext, useState } from "react";
import {questionContext} from '../../context/questionContext';
import { useNavigate } from "react-router-dom";
import AuthService from '../../services/authservice';
import './Card.css';

const Card = ({question}) => {

  const {handleNextQuestion, showScore, questions, setShowButton, showButton, disabled, setDisabled, twoItemsList, threeItemsList, positive, setPositive} = useContext(questionContext)
  const {question_text, answers, affirmative_message, negative_message} = question;
  const[score, setScore] = useState(0);

  const questionLength = questions.length
  const currentUser = AuthService.getCurrentUser();
  const userEmail = currentUser.userData.email;
  console.log('Esto es userEmail', userEmail);

  let navigate = useNavigate();

  const selectAnswer = (iscorrect) => {
    if(!disabled){
      setDisabled(true)
      if(iscorrect === true){
        setScore(score + 1);
        setPositive(true)
      }
    }
    setShowButton(true)
  }



  const sendScore = async (score, userEmail, questionLength) => {
    try {
      let req = {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          score,
          userEmail,
          questionLength
        })
      }
      await fetch ('http://localhost:5000/api/score', req);
      navigate('/profile');
    } catch (error) {
      console.log('error', error);
    } 
  }

  console.log('Esto', userEmail, score)

  const renderNextButton = () => {
    if(showButton){
      if(positive){
        return <div className="feedbackText">
                <div className="answerResult">
                <p>Respuesta correcta:</p>
                </div>
                <div className="mesgTxt">
                <p className="msgp">{affirmative_message}</p>
                <button className="btnQuiz nxt" onClick={handleNextQuestion}>Siguiente</button>
                </div>
              </div>
      }else{
        return <div className="feedbackText">
                <div className="answerResult">
                <p>Respuesta incorrecta:</p>
                </div>
                <div className="mesgTxt">
                <p className="msgp">{negative_message}</p>
                <button className="btnQuiz nxt" onClick={handleNextQuestion}>Siguiente</button>
                </div>
              </div>
      }
    }
  }

  if(showScore){
    if(score < questions.length/2){
      return <div className="finalDiv">
              <h3 className="resultHeader">Test terminado.</h3>
              <div className="qresults">
              <div>
                <p className="greyText">Resultado</p>
                <p className="greyText blueback">No apto</p>
              </div>
              <div>
                <p className="greyText">Puntuación</p>
                <p className="greyText blueback">{score}/{questions.length}</p>
              </div>
              </div>
              <div className="toKnowMore">
                <h5 className="interest">Enlaces de interés:</h5>
                <a className="knowledge" href="https://ciberprotector.com/comprobador-de-contrase%C3%B1as/" target="_blank">Ciberprotector - Comprobador de contraseñas</a>
                <a className="knowledge" href="https://www.virustotal.com/gui/home/upload" target="_blank">Virus total - Analizador de archivos</a>
                <a className="knowledge" href="https://transparencyreport.google.com/safe-browsing/search?hl=es" target="_blank">Google - Estado del sitio según Navegación segura</a>
              </div>
              <div>
                <button className="btnQuiz"  onClick={()=>sendScore(score, userEmail, questionLength)}>Enviar puntuación</button>
              </div>
            </div>
      }else{
        return <div className="finalDiv">
              <h3 className="resultHeader">Test terminado.</h3>
              <div className="qresults">
              <div>
                <p className="greyText">Resultado</p>
                <p className="greyText blueback">Apto</p>
              </div>
              <div>
                <p className="greyText">Puntuación</p>
                <p className="greyText blueback">{score}/{questions.length}</p>
              </div>
              </div>
              <div className="toKnowMore">
                <h5 className="interest">Enlaces de interés:</h5>
                <a className="knowledge" href="https://ciberprotector.com/comprobador-de-contrase%C3%B1as/" target="_blank">Ciberprotector - Comprobador de contraseñas</a>
                <a className="knowledge" href="https://www.virustotal.com/gui/home/upload" target="_blank">Virus total - Analizador de archivos</a>
                <a className="knowledge" href="https://transparencyreport.google.com/safe-browsing/search?hl=es" target="_blank">Google - Estado del sitio según Navegación segura</a>
              </div>
              <div>
                <button className="btnQuiz"  onClick={()=> sendScore(score, userEmail, questionLength)}>Enviar puntuación</button>
              </div>
            </div>
      }
    }
  if(answers.length === 3){
    return <div className="question">
          <div classname="qContainer">
          <p className="questionText">{question_text}</p>
          <div className="btnContaier">
          <button className="btnQuiz" onClick={() => selectAnswer(answers[threeItemsList[0]].iscorrect)}>{answers[threeItemsList[0]].answer_text}</button>
          <button className="btnQuiz" onClick={() => selectAnswer(answers[threeItemsList[1]].iscorrect)}>{answers[threeItemsList[1]].answer_text}</button>
          <button className="btnQuiz" onClick={() => selectAnswer(answers[threeItemsList[2]].iscorrect)}>{answers[threeItemsList[2]].answer_text}</button>
          </div>
          </div>
          <div className="aContainer">
          {renderNextButton()}
          </div>
          </div>
  }else{
    return <div className="question">
          <div classname="qContainer">
          <p className="questionText">{question_text}</p>
          <div className="btnContaier">
          <button className="btnQuiz" onClick={() => selectAnswer(answers[twoItemsList[0]].iscorrect)}>{answers[twoItemsList[0]].answer_text}</button>
          <button className="btnQuiz" onClick={() => selectAnswer(answers[twoItemsList[1]].iscorrect)}>{answers[twoItemsList[1]].answer_text}</button>
          </div>
          </div>
          <div className="aContainer">
          {renderNextButton()}
          </div>
          </div>
  };
};

export default Card;