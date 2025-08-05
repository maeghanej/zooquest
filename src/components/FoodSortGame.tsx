import { useState } from "react";

interface FoodOption {
  src: string;
  alt: string;
  isEdible: boolean;
  explanation: string;
}

interface FoodSortGameProps {
  question: string;
  options: FoodOption[];
  onComplete: () => void;
}

export default function FoodSortGame({ question, options, onComplete }: FoodSortGameProps) {
  const [choices, setChoices] = useState<("yes" | "no" | null)[]>(Array(options.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleChoice = (index: number, answer: "yes" | "no") => {
    const newChoices = [...choices];
    newChoices[index] = answer;
    setChoices(newChoices);
    setSelectedItem(index);
    setShowResult(true);
  };

  const handleContinue = () => {
    onComplete();
  };

  const getFoodEmoji = (alt: string) => {
    if (alt.includes("Fish")) return "🐟";
    if (alt.includes("Frog")) return "🐸";
    if (alt.includes("Rock")) return "🪨";
    if (alt.includes("Apple")) return "🍎";
    if (alt.includes("Crab")) return "🦀";
    if (alt.includes("Mussel")) return "🦪";
    return "🍽️";
  };

  const allAnswered = choices.every((c) => c !== null);
  const correctAnswers = choices.filter((choice, index) => 
    choice === (options[index].isEdible ? "yes" : "no")
  ).length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">River Otter Food Challenge</h3>
        <p className="text-gray-600 text-lg">{question}</p>
        <p className="text-sm text-gray-500 mt-2">
          Learn about what river otters eat in their natural habitat!
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
        {options.map((item, idx) => (
          <div 
            key={idx} 
            className={`border-2 p-4 rounded-lg text-center transition-all duration-200 ${
              showResult && idx === selectedItem
                ? choices[idx] === (item.isEdible ? "yes" : "no")
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
                : "border-gray-300 hover:border-blue-400"
            }`}
          >
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center mb-3">
              <span className="text-4xl">{getFoodEmoji(item.alt)}</span>
            </div>
            
            {choices[idx] === null ? (
              // Show food name and buttons
              <>
                <p className="text-sm font-medium text-gray-700 mb-3">{item.alt}</p>
                
                <div className="flex justify-center gap-2">
                  <button
                    className="px-3 py-2 rounded-lg border-2 font-semibold text-sm transition-all duration-200 border-gray-300 hover:border-green-400 cursor-pointer"
                    onClick={() => handleChoice(idx, "yes")}
                  >
                    ✅ Eat
                  </button>
                  <button
                    className="px-3 py-2 rounded-lg border-2 font-semibold text-sm transition-all duration-200 border-gray-300 hover:border-red-400 cursor-pointer"
                    onClick={() => handleChoice(idx, "no")}
                  >
                    ❌ Don't Eat
                  </button>
                </div>
              </>
            ) : (
              // Show fact and result
              <>
                <div className={`inline-flex items-center px-3 py-1 rounded-lg font-semibold mb-3 text-sm ${
                  choices[idx] === (item.isEdible ? "yes" : "no")
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  <span className="text-lg mr-1">
                    {choices[idx] === (item.isEdible ? "yes" : "no") ? "✅" : "❌"}
                  </span>
                  {choices[idx] === (item.isEdible ? "yes" : "no")
                    ? "Correct!" 
                    : "Not quite!"
                  }
                </div>
                
                <div className="text-left">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                    {item.alt}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.explanation}
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {allAnswered && (
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-800 mb-4">
            Final Score: {correctAnswers} out of {options.length} correct!
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