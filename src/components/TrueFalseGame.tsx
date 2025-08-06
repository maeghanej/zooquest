import { useState } from "react";
import { useScoreStore } from "../store/scoreStore.ts";
import { buttonStyles, cardStyles, textStyles, gameStyles, layoutStyles, cn } from "../utils/styles.ts";

interface TrueFalseQuestion {
  question: string;
  correctAnswer: boolean;
  explanation: string;
}

interface TrueFalseGameProps {
  questions: TrueFalseQuestion[];
  gameContent: {
    title: string;
    description: string;
    summaryTitle?: string;
  };
  onComplete: () => void;
}

export default function TrueFalseGame({ questions, gameContent, onComplete }: TrueFalseGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const { recordScore } = useScoreStore();

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleSelect = (answer: boolean) => {
    setSelected(answer);
    setShowResult(true);
    
    // Store the answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Calculate final score
      const correctCount = answers.filter((answer, index) => 
        answer === questions[index].correctAnswer
      ).length;
      
      // Record score: 1 point per correct answer, max points = number of questions
      recordScore(correctCount, questions.length);
      
      onComplete();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const getProgressText = () => {
    const correctCount = answers.filter((answer, index) => 
      answer === questions[index].correctAnswer
    ).length;
    return `${correctCount} out of ${answers.length} correct`;
  };

  return (
    <div className={layoutStyles.sectionSpacing}>
      <div className="text-center">
        <h3 className={`${textStyles.h3} mb-2`}>{gameContent.title}</h3>
        <p className={`${gameStyles.question} mb-2`}>{currentQuestion.question}</p>
        <p className={`${gameStyles.instruction}`}>
          {gameContent.description}
        </p>
        <div className="mt-4">
          <div className={`${gameStyles.progress} mb-2`}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          {answers.length > 0 && (
            <div className={`${textStyles.accent} text-sm font-semibold`}>
              {getProgressText()}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-center gap-4">
        <button
          className={cn(
            buttonStyles.choice,
            showResult && selected === true
              ? currentQuestion.correctAnswer
                ? gameStyles.choiceCorrect
                : gameStyles.choiceIncorrect
              : gameStyles.choiceDefault,
            showResult ? "cursor-default" : "cursor-pointer"
          )}
          onClick={() => handleSelect(true)}
          disabled={showResult}
        >
          ✅ True
        </button>
        <button
          className={cn(
            buttonStyles.choice,
            showResult && selected === false
              ? !currentQuestion.correctAnswer
                ? gameStyles.choiceCorrect
                : gameStyles.choiceIncorrect
              : gameStyles.choiceDefault,
            showResult ? "cursor-default" : "cursor-pointer"
          )}
          onClick={() => handleSelect(false)}
          disabled={showResult}
        >
          ❌ False
        </button>
      </div>
      
      {showResult && selected !== null && (
        <div className="text-center">
          <div className={cn(
            "inline-flex items-center px-4 py-2 rounded-lg font-semibold mb-4",
            selected === currentQuestion.correctAnswer 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          )}>
            <span className="text-xl mr-2">
              {selected === currentQuestion.correctAnswer ? "✅" : "❌"}
            </span>
            {selected === currentQuestion.correctAnswer 
              ? "Correct! Great job!" 
              : "Not quite right!"
            }
          </div>
          
          <div className={`${cardStyles.fact} max-w-md mx-auto mb-6`}>
            <h4 className={`${textStyles.accent} font-semibold mb-2`}>
              {gameContent.summaryTitle || "Why This Matters:"}
            </h4>
            <p className={`${textStyles.bodySmall}`}>
              {currentQuestion.explanation}
            </p>
          </div>

          <button
            onClick={handleNextQuestion}
            className={buttonStyles.success}
          >
            {isLastQuestion ? "Continue to Next Animal" : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
} 