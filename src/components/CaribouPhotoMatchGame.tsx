import { useState } from "react";
import { useScoreStore } from "../store/scoreStore.ts";

interface CaribouPhotoMatchGameProps {
  question: string;
  images: { src: string; alt: string; isCorrect: boolean; explanation: string }[];
  onComplete: () => void;
}

export default function CaribouPhotoMatchGame({ question, images, onComplete }: CaribouPhotoMatchGameProps) {
  const [clickedImages, setClickedImages] = useState<Set<number>>(new Set());
  const [hasCorrectAnswer, setHasCorrectAnswer] = useState(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [scoreRecorded, setScoreRecorded] = useState<boolean>(false);
  const { recordScore } = useScoreStore();

  const handleSelect = (index: number) => {
    // Add to clicked images set
    setClickedImages(prev => new Set([...prev, index]));
    setAttempts(attempts + 1);
    
    if (images[index].isCorrect && !scoreRecorded) {
      setHasCorrectAnswer(true);
      setScoreRecorded(true);
      
      // Calculate score based on number of attempts
      let score = 0;
      if (attempts === 0) {
        score = 3; // First try
      } else if (attempts === 1) {
        score = 2; // Second try
      } else if (attempts === 2) {
        score = 1; // Third try
      } else {
        score = 0; // Fourth or more tries
      }
      
      // Record score: calculated score, max 3 points for this game
      recordScore(score, 3);
    }
  };

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Caribou Antler Challenge</h3>
        <p className="text-gray-600 text-lg">{question}</p>
        <p className="text-sm text-gray-500 mt-2">
          Caribou have unique antlers that help them survive in the Arctic!
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
        {images.map((img, idx) => {
          const isClicked = clickedImages.has(idx);
          const isCorrect = img.isCorrect;
          const shouldShowFact = isClicked || (hasCorrectAnswer && !isClicked);
          
          return (
            <div key={idx} className="space-y-2">
              <button
                className={`border-2 p-2 rounded-lg transition-all duration-200 ${
                  isClicked
                    ? isCorrect
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : hasCorrectAnswer && isCorrect
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300"
                } ${
                  hasCorrectAnswer 
                    ? "cursor-default" 
                    : "cursor-pointer hover:shadow-lg transform hover:scale-105"
                }`}
                onClick={() => !hasCorrectAnswer && handleSelect(idx)}
                disabled={hasCorrectAnswer}
              >
                <div className="aspect-square bg-gray-100 rounded flex items-center justify-center mb-2 overflow-hidden">
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to emoji if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = '🦌';
                    }}
                  />
                </div>
              </button>
              
              {shouldShowFact && (
                <div className="text-center space-y-2">
                  {isClicked && (
                    <div className={`inline-flex items-center px-3 py-1 rounded-lg font-semibold text-sm ${
                      isCorrect 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      <span className="text-lg mr-1">
                        {isCorrect ? "✅" : "❌"}
                      </span>
                      {isCorrect 
                        ? `Correct! (${attempts === 1 ? '3 points' : attempts === 2 ? '2 points' : attempts === 3 ? '1 point' : '0 points'})`
                        : "Not quite right!"
                      }
                    </div>
                  )}
                  
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-1 text-sm">
                      {img.alt}
                    </h4>
                    <p className="text-xs text-blue-700">
                      {img.explanation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {hasCorrectAnswer && (
        <div className="text-center">
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