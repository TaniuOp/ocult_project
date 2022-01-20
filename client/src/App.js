import React, {useState, useEffect } from "react";
import { BrowserRouter } from 'react-router-dom';
import {questionContext} from './context/questionContext';
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import axios from 'axios';
import './App.css';

function App() {

  const[questions, setQuestions] = useState([]);
  const[currentPage, setCurrentPage] = useState(1);
  const[questionsPerPage] = useState(1);
  const[showScore, setShowScore] = useState(false);
  const[showButton, setShowButton] = useState(false);
  const[disabled, setDisabled] = useState(false);
  const[twoItemsList, setTwoItemsList] = useState([0, 1]);
  const[threeItemsList, setThreeItemsList] = useState([0, 1, 2]);
  const[positive, setPositive] = useState(false);

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const res = await axios.get('http://localhost:5000/api/questions');
        const json = res.data;
        const questionsArray = json.map(element => {
          if(element.answers.length === 3){
            return{
              'question_text': element.question,
              'answers': [
                element.answers[0],
                element.answers[1],
                element.answers[2],
              ],
              'affirmative_message': element.affirmative_message,
              'negative_message': element.negative_message
            }
          }else{
          return{
            'question_text': element.question,
            'answers': [
              element.answers[0],
              element.answers[1],
              ],
              'affirmative_message': element.affirmative_message,
              'negative_message': element.negative_message
            }
          };
        })
        setQuestions(questionsArray)
      } catch (error){
        console.log('error', error);
      }
    };
    fetchQuestion();
  }, []);

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  
  
  const handleNextQuestion = () => {
    if(currentPage !== Math.ceil(questions.length/questionsPerPage) && questions.length/questionsPerPage >= 1){
      setCurrentPage(currentPage + 1);
      setShowButton(false);
      setDisabled(false);
      setPositive(false);
      setTwoItemsList(twoItemsList.sort(function() {return Math.random() - 0.5}));
      setThreeItemsList(threeItemsList.sort(function() {return Math.random() - 0.5}));
    }else{
      setShowScore(true)
    }
  }

  const queObj = {
    questions,
    currentQuestions,
    showScore,
    showButton,
    handleNextQuestion,
    setShowButton,
    disabled,
    setDisabled,
    twoItemsList,
    threeItemsList,
    positive,
    setPositive
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <questionContext.Provider value={queObj}>
          <Main/>
        </questionContext.Provider>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
