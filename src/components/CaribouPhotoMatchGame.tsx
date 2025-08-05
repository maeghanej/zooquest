import { useState } from "react";

interface CaribouPhotoMatchGameProps {
  question: string;
  images: { src: string; alt: string; isCorrect: boolean; explanation: string }[];
  onComplete: () => void;
}

export default function CaribouPhotoMatchGame({ question, images, onComplete }: CaribouPhotoMatchGameProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [hasCorrectAnswer, setHasCorrectAnswer] = useState(false);

  const handleSelect = (index: number) => {
    setSelected(index);
    setShowResult(true);
    
    if (images[index].isCorrect) {
      setHasCorrectAnswer(true);
    }
  };

  const handleContinue = () => {
    onComplete();
  };

  const getAntlerEmoji = (alt: string) => {
    if (alt.includes("Caribou")) return "🦌";
    if (alt.includes("Moose")) return "🦌";
    if (alt.includes("Deer")) return "🦌";
    if (alt.includes("Elk")) return "🦌";
    return "🦌";
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
        {images.map((img, idx) => (
          <button
            key={idx}
            className={`border-2 p-2 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105 ${
              showResult && idx === selected
                ? img.isCorrect
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
                : "border-gray-300 hover:border-blue-400"
            } cursor-pointer`}
            onClick={() => handleSelect(idx)}
          >
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center mb-2">
              <span className="text-4xl">{getAntlerEmoji(img.alt)}</span>
            </div>
            <p className="text-sm font-medium text-gray-700 text-center">{img.alt}</p>
          </button>
        ))}
      </div>
      
      {showResult && selected !== null && (
        <div className="text-center">
          <div className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold mb-4 ${
            images[selected].isCorrect 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          }`}>
            <span className="text-xl mr-2">
              {images[selected].isCorrect ? "✅" : "❌"}
            </span>
            {images[selected].isCorrect 
              ? "Correct! These are caribou antlers!" 
              : "Not quite right!"
            }
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg max-w-md mx-auto mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">
              {images[selected].alt}
            </h4>
            <p className="text-sm text-blue-700">
              {images[selected].explanation}
            </p>
          </div>

          {hasCorrectAnswer && (
            <button
              onClick={handleContinue}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
            >
              Continue to Next Animal
            </button>
          )}
        </div>
      )}
    </div>
  );
} 