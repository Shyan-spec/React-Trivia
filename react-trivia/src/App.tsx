import Axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import Questionaire from "./Component/Questionaire";
import Header from "./Component/Header";
const API_URL =
  "https://opentdb.com/api.php?amount=30&category=15&difficulty=easy&type=multiple";

  interface Question {
    type: string,
      difficulty: string,
      category: string,
      question: string,
      correct_answer: string,
      incorrect_answers: [],
      answers: string[]
  }

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [fetchNewSetOfQuestions, setfetchNewSetOfQuestions ] =  useState<boolean>(false)

  useEffect(() => {
    Axios.get(API_URL)
      .then((res) => res.data)
      .then((data) => {
        const questions = data.results.map((question: Question) => ({
          ...question,
          answers: [
            question.correct_answer,
            ...question.incorrect_answers,
          ].sort(() => Math.random() - 0.5),
        }));
        setQuestions(questions);
      });
  }, [fetchNewSetOfQuestions]);

  const handleAnswer = (answer: string) => {
    if (!showAnswers) {
      if (answer === questions[currentIndex].correct_answer) {
        setScore(score + 1);
      }
    }

    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
    setShowAnswers(false);
  };

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    setShowAnswers(false);
  };
  const restartGame = () => {
    setScore(0);
    setCurrentIndex(0);
    setfetchNewSetOfQuestions((prev) => !prev)
  };
  return questions.length > 0 ? (
    <div className="container">
      <Header />
      <h2>Score: {score}</h2>
      <h2>
        {currentIndex + 1} out of {questions.length} Questions
      </h2>
      <button onClick={restartGame} className="next-question">
        Restart Game
      </button>
      {currentIndex >= questions.length ? (
        <h1>Game Ended, Your Score is {(score / questions.length) * 100}%</h1>
      ) : (
        <Questionaire
          handleAnswer={handleAnswer}
          showAnswers={showAnswers}
          handleNextQuestion={handleNextQuestion}
          handlePreviousQuestion={handlePreviousQuestion}
          data={questions[currentIndex]}
        />
      )}
    </div>
  ) : (
    <div className="container">..Loading</div>
  );
}

export default App;
