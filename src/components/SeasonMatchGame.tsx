import { useState } from "react";

interface BehaviorOption {
  label: string;
  correctSeason: string; // "spring", "summer", "fall", "winter"
  explanation: string;
}

interface SeasonMatchGameProps {
  question: string;
  behaviors: BehaviorOption[];
  onComplete: () => void;
}

const seasons = ["spring", "summer", "fall", "winter"];

export default function SeasonMatchGame({ question, behaviors, onComplete }: SeasonMatchGameProps) {
  const [selectedBehavior, setSelectedBehavior] = useState<number | null>(null);
  const [assignments, setAssignments] = useState<Record<string, string | null>>({
    spring: null,
    summer: null,
    fall: null,
    winter: null,
  });
  const [showResults, setShowResults] = useState(false);

  const handleAssign = (season: string) => {
    if (selectedBehavior === null) return;
    const newAssignments = { ...assignments };
    newAssignments[season] = behaviors[selectedBehavior].label;
    setAssignments(newAssignments);
    setSelectedBehavior(null);
  };

  const handleContinue = () => {
    onComplete();
  };

  const allAssigned = Object.values(assignments).every((v) => v !== null);
  const correctAssignments = Object.entries(assignments).filter(([season, assigned]) => {
    const correctLabel = behaviors.find((b) => b.correctSeason === season)?.label;
    return assigned === correctLabel;
  }).length;

  const getSeasonEmoji = (season: string) => {
    switch (season) {
      case "spring": return "🌸";
      case "summer": return "☀️";
      case "fall": return "🍂";
      case "winter": return "❄️";
      default: return "🌿";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Grizzly Bear Seasonal Challenge</h3>
        <p className="text-gray-600 text-lg">{question}</p>
        <p className="text-sm text-gray-500 mt-2">
          Learn about how grizzly bears adapt to each season!
        </p>
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-3 text-center">Select a Behavior:</h4>
        <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
          {behaviors.map((behavior, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedBehavior(idx)}
              className={`border-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                selectedBehavior === idx
                  ? "border-blue-500 bg-blue-50 text-blue-800"
                  : "border-gray-300 hover:border-blue-400"
              } cursor-pointer`}
            >
              {behavior.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-3 text-center">Assign to Seasons:</h4>
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {seasons.map((season) => {
            const assigned = assignments[season];
            const correctLabel = behaviors.find((b) => b.correctSeason === season)?.label;
            const isCorrect = assigned === correctLabel;
            
            return (
              <div
                key={season}
                className={`border-2 p-4 rounded-lg text-center transition-all duration-200 cursor-pointer ${
                  showResults
                    ? isCorrect
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
                onClick={() => handleAssign(season)}
              >
                <div className="text-3xl mb-2">{getSeasonEmoji(season)}</div>
                <div className="font-semibold text-gray-800 mb-2 capitalize">{season}</div>
                
                {!showResults ? (
                  <div className="text-sm text-gray-600">
                    {assigned || <span className="text-gray-400">[Click to assign]</span>}
                  </div>
                ) : (
                  <div className="text-sm space-y-1">
                    {isCorrect ? (
                      <div className="text-green-700 font-semibold">
                        ✅ {assigned}
                      </div>
                    ) : (
                      <>
                        <div className="text-red-700 font-semibold">
                          ❌ You chose: {assigned}
                        </div>
                        <div className="text-green-700 font-semibold">
                          ✅ Correct: {correctLabel}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {allAssigned && !showResults && (
        <div className="text-center">
          <button
            onClick={() => setShowResults(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            Submit Answers
          </button>
        </div>
      )}

      {showResults && (
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-800 mb-4">
            Final Score: {correctAssignments} out of {seasons.length} correct!
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg max-w-2xl mx-auto mb-6">
            <h4 className="font-semibold text-blue-800 mb-3 text-lg">
              How Grizzly Bears Adapt to Seasonal Food Changes:
            </h4>
            <div className="text-sm text-blue-700 space-y-3">
              <p>
                <strong>🌸 Spring:</strong> After hibernation, bears emerge hungry and immediately search for early spring vegetation, 
                winter-killed animals, and newborn ungulates to replenish their energy.
              </p>
              <p>
                <strong>☀️ Summer:</strong> This is peak feeding season! Bears focus on high-protein salmon during annual runs, 
                plus berries, roots, and other abundant summer foods to build strength.
              </p>
              <p>
                <strong>🍂 Fall:</strong> As food becomes scarcer, bears enter hyperphagia - eating almost constantly to gain 
                hundreds of pounds of fat needed to survive the winter hibernation.
              </p>
              <p>
                <strong>❄️ Winter:</strong> When food is scarce, bears hibernate to conserve energy. They can sleep for 5-7 months 
                without eating, drinking, or going to the bathroom, living off their fat reserves.
              </p>
            </div>
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