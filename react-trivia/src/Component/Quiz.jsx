import React from 'react'
import {useState}  from 'react'
const Quiz = ({questions}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const {question, choices, correctAnswer} = questions[currentQuestion];
  return (
    <div>
      {currentQuestion + 1}/{questions.length}
    </div>
  )
}

export default Quiz
