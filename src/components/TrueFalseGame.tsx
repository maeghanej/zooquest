import { useState } from "react";
import { useScoreStore } from "../store/scoreStore.ts";

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
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{gameContent.title}</h3>
        <p className="text-gray-600 text-lg">{currentQuestion.question}</p>
        <p className="text-sm text-gray-500 mt-2">
          {gameContent.description}
        </p>
        <div className="mt-4">
          <div className="text-sm text-gray-600 mb-2">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          {answers.length > 0 && (
            <div className="text-sm text-blue-600 font-semibold">
              {getProgressText()}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-center gap-4">
        <button
          className={`px-8 py-4 rounded-lg border-2 font-semibold text-lg transition-all duration-200 transform hover:scale-105 ${
            showResult && selected === true
              ? currentQuestion.correctAnswer
                ? "border-green-500 bg-green-50 text-green-800"
                : "border-red-500 bg-red-50 text-red-800"
              : "border-gray-300 hover:border-blue-400 bg-white"
          } ${showResult ? "cursor-default" : "cursor-pointer"}`}
          onClick={() => handleSelect(true)}
          disabled={showResult}
        >
          ✅ True
        </button>
        <button
          className={`px-8 py-4 rounded-lg border-2 font-semibold text-lg transition-all duration-200 transform hover:scale-105 ${
            showResult && selected === false
              ? !currentQuestion.correctAnswer
                ? "border-green-500 bg-green-50 text-green-800"
                : "border-red-500 bg-red-50 text-red-800"
              : "border-gray-300 hover:border-blue-400 bg-white"
          } ${showResult ? "cursor-default" : "cursor-pointer"}`}
          onClick={() => handleSelect(false)}
          disabled={showResult}
        >
          ❌ False
        </button>
      </div>
      
      {showResult && selected !== null && (
        <div className="text-center">
          <div className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold mb-4 ${
            selected === currentQuestion.correctAnswer 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          }`}>
            <span className="text-xl mr-2">
              {selected === currentQuestion.correctAnswer ? "✅" : "❌"}
            </span>
            {selected === currentQuestion.correctAnswer 
              ? "Correct! Great job!" 
              : "Not quite right!"
            }
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg max-w-md mx-auto mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">
              {gameContent.summaryTitle || "Why This Matters:"}
            </h4>
            <p className="text-sm text-blue-700">
              {currentQuestion.explanation}
            </p>
          </div>

          <button
            onClick={handleNextQuestion}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            {isLastQuestion ? "Continue to Next Animal" : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
} 