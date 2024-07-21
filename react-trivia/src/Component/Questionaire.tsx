
interface QuestionData {
  question: string;
  correct_answer: string;
  answers: string[];
}

interface QuestionaireProps {
  handleAnswer: (answer: string) => void;
  showAnswers: boolean;
  handleNextQuestion: () => void;
  handlePreviousQuestion: () => void;
  data: QuestionData;
}

function Questionaire({
  handleAnswer,
  showAnswers,
  handleNextQuestion,
  handlePreviousQuestion,
  data: { question, correct_answer, answers },
} : QuestionaireProps) {
  return (
    <>
      <div className="questionClass">
        <h1 dangerouslySetInnerHTML={{ __html: question }} />
      </div>
      <div className="button-overall">
        {answers.map((answer: string) => {
          const specialClassName = showAnswers
            ? answer === correct_answer
              ? "green-button"
              : "red-button"
            : "";
          return (
            <button
              className={`normal-button ${specialClassName}`}
              onClick={() => handleAnswer(answer)}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          );
        })}
      </div>
      {showAnswers && (
        <>
          <button onClick={handleNextQuestion} className="next-question">
            Next Question
          </button>
          <br></br>
          <button onClick={handlePreviousQuestion} className="next-question">
            Previous Question
          </button>
        </>
      )}
    </>
  );
}

export default Questionaire;
