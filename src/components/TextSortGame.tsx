import { useState } from "react";
import { useScoreStore } from "../store/scoreStore.ts";

interface SortItem {
  label: string;
  correctGroup: string;
  explanation: string;
}

interface TextSortGameProps {
  question: string;
  items: SortItem[];
  gameContent: {
    title: string;
    description: string;
    categories?: {
      option1: { label: string; emoji: string };
      option2: { label: string; emoji: string };
    };
  };
  onComplete: () => void;
}

export default function TextSortGame({ question, items, gameContent, onComplete }: TextSortGameProps) {
  const [assignments, setAssignments] = useState<(string | null)[]>(Array(items.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const { recordScore } = useScoreStore();

  // Fallback categories if not provided
  const categories = gameContent.categories || {
    option1: { label: "Option 1", emoji: "🔵" },
    option2: { label: "Option 2", emoji: "🔴" }
  };
  const categoryKeys = Object.keys(categories);

  const handleAssign = (index: number, group: string) => {
    const newAssignments = [...assignments];
    newAssignments[index] = group;
    setAssignments(newAssignments);
  };

  const allAssigned = assignments.every((a) => a !== null);

  const handleSubmit = () => {
    setShowResult(true);
    const score = items.reduce((acc, item, idx) => {
      return acc + (assignments[idx] === item.correctGroup ? 1 : 0);
    }, 0);
    
    // Record score: correct answers out of total items
    recordScore(score, items.length);
  };

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{gameContent.title}</h3>
        <p className="text-gray-600 text-lg">{question}</p>
        <p className="text-sm text-gray-500 mt-2">
          {gameContent.description}
        </p>
      </div>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {items.map((item, idx) => (
          <div 
            key={idx} 
            className={`border-2 p-4 rounded-lg transition-all duration-200 ${
              showResult && assignments[idx] === item.correctGroup
                ? "border-green-500 bg-green-50"
                : showResult && assignments[idx] !== item.correctGroup
                ? "border-red-500 bg-red-50"
                : "border-gray-300"
            }`}
          >
            <p className="mb-3 font-medium text-gray-800">{item.label}</p>
            
            {!showResult ? (
              <div className="flex gap-2 justify-center">
                <button
                  className={`px-4 py-2 rounded-lg border-2 font-semibold text-sm transition-all duration-200 ${
                    assignments[idx] === categoryKeys[0]
                      ? "bg-purple-200 border-purple-400" 
                      : "border-gray-300 hover:border-purple-400"
                  }`}
                  onClick={() => handleAssign(idx, categoryKeys[0])}
                >
                  {categories.option1.emoji} {categories.option1.label}
                </button>
                <button
                  className={`px-4 py-2 rounded-lg border-2 font-semibold text-sm transition-all duration-200 ${
                    assignments[idx] === categoryKeys[1]
                      ? "bg-yellow-200 border-yellow-400" 
                      : "border-gray-300 hover:border-yellow-400"
                  }`}
                  onClick={() => handleAssign(idx, categoryKeys[1])}
                >
                  {categories.option2.emoji} {categories.option2.label}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className={`inline-flex items-center px-3 py-1 rounded-lg font-semibold text-sm ${
                  assignments[idx] === item.correctGroup
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  <span className="text-lg mr-1">
                    {assignments[idx] === item.correctGroup ? "✅" : "❌"}
                  </span>
                  {assignments[idx] === item.correctGroup
                    ? "Correct!" 
                    : "Not quite!"
                  }
                  <span className="ml-2 text-xs">
                    (Answer: {item.correctGroup === categoryKeys[0] ? `${categories.option1.emoji} ${categories.option1.label}` : `${categories.option2.emoji} ${categories.option2.label}`})
                  </span>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-700">
                    {item.explanation}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {allAssigned && !showResult && (
        <div className="text-center">
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200" 
            onClick={handleSubmit}
          >
            Submit Answers
          </button>
        </div>
      )}

      {showResult && (
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-800 mb-4">
            Final Score: {items.reduce((acc, item, idx) => acc + (assignments[idx] === item.correctGroup ? 1 : 0), 0)} out of {items.length} correct!
          </div>
          <button
            onClick={handleContinue}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            Continue to Next Animal
          </button>
        </div>
      )}
    </div>
  );
}