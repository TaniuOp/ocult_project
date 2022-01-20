import React, { useContext } from "react";
import {questionContext} from '../../context/questionContext';
import Card from '../Card';
import './Quiz.css'

const Quiz = () => {

  const {currentQuestions} = useContext(questionContext);

  const paintCards = () => {
    return currentQuestions.map((item, i) => <Card question={item} key={i}/> )
  }
  return <div className="totalQuiz">{paintCards()}</div>;
};

export default Quiz;
