import { useState } from "react";
import { useScoreStore } from "../store/scoreStore.ts";
import { buttonStyles, cardStyles, textStyles, gameStyles } from "../utils/styles.ts";

interface SortOption {
  src: string;
  alt: string;
  isCorrect: boolean;
  explanation: string;
}

interface PhotoSortGameProps {
  question: string;
  options: SortOption[];
  sortCategories: {
    positive: string;
    negative: string;
    title: string;
    description: string;
  };
  onComplete: () => void;
}

export default function PhotoSortGame({ question, options, sortCategories, onComplete }: PhotoSortGameProps) {
  const [choices, setChoices] = useState<("yes" | "no" | null)[]>(Array(options.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const { recordScore } = useScoreStore();

  const handleChoice = (index: number, answer: "yes" | "no") => {
    const newChoices = [...choices];
    newChoices[index] = answer;
    setChoices(newChoices);
    setSelectedItem(index);
    setShowResult(true);
  };

  const handleContinue = () => {
    // Calculate final score
    const correctAnswers = choices.filter((choice, index) => 
      choice === (options[index].isCorrect ? "yes" : "no")
    ).length;
    
    // Record score: 1 point per correct answer, max points = number of options
    recordScore(correctAnswers, options.length);
    
    onComplete();
  };

  const allAnswered = choices.every((c) => c !== null);
  const correctAnswers = choices.filter((choice, index) => 
    choice === (options[index].isCorrect ? "yes" : "no")
  ).length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className={`${textStyles.h3} mb-2`}>{sortCategories.title}</h3>
        <p className={`${gameStyles.question} mb-2`}>{question}</p>
        <p className={`${gameStyles.instruction}`}>
          {sortCategories.description}
        </p>
      </div>
      
      <div className={gameStyles.optionsGrid}>
        {options.map((item, idx) => (
          <div 
            key={idx} 
            className={`border-2 p-4 rounded-lg text-center transition-all duration-200 ${
              showResult && idx === selectedItem
                ? choices[idx] === (item.isCorrect ? "yes" : "no")
                  ? gameStyles.choiceCorrect
                  : gameStyles.choiceIncorrect
                : gameStyles.choiceDefault
            }`}
          >
            <div className="aspect-square bg-gray-100 rounded flex items-center justify-center mb-3 overflow-hidden">
              <img 
                src={item.src} 
                alt={item.alt} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to specific emoji if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallbackEmoji = item.alt.toLowerCase().includes('fish') ? '🐟' :
                                       item.alt.toLowerCase().includes('rock') ? '🪨' :
                                       item.alt.toLowerCase().includes('frog') ? '🐸' :
                                       item.alt.toLowerCase().includes('apple') ? '🍎' : '🍽️';
                  target.parentElement!.innerHTML = fallbackEmoji;
                }}
              />
            </div>
            
            {choices[idx] === null ? (
              // Show food name and buttons
              <>
                <p className={`${textStyles.bodySmall} font-medium text-primary mb-3`}>{item.alt}</p>
                
                <div className="flex justify-center gap-2">
                  <button
                    className={`px-3 py-2 rounded-lg border-2 font-semibold text-sm transition-all duration-200 ${gameStyles.choiceDefault} hover:border-green-400`}
                    onClick={() => handleChoice(idx, "yes")}
                  >
                    ✅ {sortCategories.positive}
                  </button>
                  <button
                    className={`px-3 py-2 rounded-lg border-2 font-semibold text-sm transition-all duration-200 ${gameStyles.choiceDefault} hover:border-red-400`}
                    onClick={() => handleChoice(idx, "no")}
                  >
                    ❌ {sortCategories.negative}
                  </button>
                </div>
              </>
            ) : (
              // Show fact and result
              <>
                <div className={`inline-flex items-center px-3 py-1 rounded-lg font-semibold mb-3 text-sm ${
                  choices[idx] === (item.isCorrect ? "yes" : "no")
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  <span className="text-lg mr-1">
                    {choices[idx] === (item.isCorrect ? "yes" : "no") ? "✅" : "❌"}
                  </span>
                  {choices[idx] === (item.isCorrect ? "yes" : "no")
                    ? "Correct!" 
                    : "Not quite!"
                  }
                </div>
                
                <div className={`${cardStyles.fact} text-left`}>
                  <h4 className={`${textStyles.accent} font-semibold mb-2 text-sm`}>
                    {item.alt}
                  </h4>
                  <p className={`${textStyles.bodySmall} text-primary leading-relaxed`}>
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
          <div className={`${textStyles.bodyLarge} font-semibold text-primary mb-4`}>
            Final Score: {correctAnswers} out of {options.length} correct!
          </div>
          <button
            onClick={handleContinue}
            className={buttonStyles.success}
          >
            Continue to Next Animal
          </button>
        </div>
      )}
    </div>
  );
} 