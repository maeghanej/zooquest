import { useState } from "react";
import { useScoreStore } from "../store/scoreStore.ts";
import { buttonStyles, cardStyles, textStyles, gameStyles } from "../utils/styles.ts";

interface BehaviorOption {
  label: string;
  correctSeason: string; // "spring", "summer", "fall", "winter"
  explanation: string;
}

interface SeasonMatchGameProps {
  question: string;
  behaviors: BehaviorOption[];
  gameContent: {
    title: string;
    description: string;
    summaryTitle?: string;
  };
  onComplete: () => void;
}

const seasons = ["spring", "summer", "fall", "winter"];

export default function SeasonMatchGame({ question, behaviors, gameContent, onComplete }: SeasonMatchGameProps) {
  const [selectedBehavior, setSelectedBehavior] = useState<number | null>(null);
  const [assignments, setAssignments] = useState<Record<string, string | null>>({
    spring: null,
    summer: null,
    fall: null,
    winter: null,
  });
  const [showResults, setShowResults] = useState(false);
  const { recordScore } = useScoreStore();

  const handleAssign = (season: string) => {
    if (selectedBehavior === null) return;
    const newAssignments = { ...assignments };
    newAssignments[season] = behaviors[selectedBehavior].label;
    setAssignments(newAssignments);
    setSelectedBehavior(null);
  };

  const handleContinue = () => {
    // Calculate final score
    const correctAssignments = Object.entries(assignments).filter(([season, assigned]) => {
      const correctLabel = behaviors.find((b) => b.correctSeason === season)?.label;
      return assigned === correctLabel;
    }).length;
    
    // Record score: 1 point per correct assignment, max points = number of seasons
    recordScore(correctAssignments, seasons.length);
    
    onComplete();
  };

  const allAssigned = Object.values(assignments).every((v) => v !== null);
  const correctAssignments = Object.entries(assignments).filter(([season, assigned]) => {
    const correctLabel = behaviors.find((b) => b.correctSeason === season)?.label;
    return assigned === correctLabel;
  }).length;

  const getSeasonEmoji = (season: string) => {
    return season === 'spring' ? '🌸' : 
           season === 'summer' ? '☀️' : 
           season === 'fall' ? '🍂' : '❄️';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className={`${textStyles.h3} mb-2`}>{gameContent.title}</h3>
        <p className={`${gameStyles.question} mb-2`}>{question}</p>
        <p className={`${gameStyles.instruction}`}>
          {gameContent.description}
        </p>
      </div>
      
      <div className="mb-6">
        <h4 className={`${textStyles.h4} mb-3 text-center`}>Select a Behavior:</h4>
        <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
          {behaviors.map((behavior, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedBehavior(idx)}
              className={`border-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                selectedBehavior === idx
                  ? gameStyles.choiceSelected
                  : gameStyles.choiceDefault
              } cursor-pointer`}
            >
              {behavior.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className={`${textStyles.h4} mb-3 text-center`}>Assign to Seasons:</h4>
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
                      ? gameStyles.choiceCorrect
                      : gameStyles.choiceIncorrect
                    : gameStyles.choiceDefault
                }`}
                onClick={() => handleAssign(season)}
              >
                <div className="aspect-square bg-gray-100 rounded flex items-center justify-center mb-2 overflow-hidden">
                  <div className="text-6xl">
                    {getSeasonEmoji(season)}
                  </div>
                </div>
                <div className={`${textStyles.bodySmall} font-semibold text-primary mb-2 capitalize`}>{season}</div>
                
                {!showResults ? (
                  <div className={`${textStyles.bodySmall} text-primary`}>
                    {assigned || <span className={textStyles.muted}>[Click to assign]</span>}
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
            className={buttonStyles.primary}
          >
            Submit Answers
          </button>
        </div>
      )}

      {showResults && (
        <div className="text-center">
          <div className={`${textStyles.bodyLarge} font-semibold text-primary mb-4`}>
            Final Score: {correctAssignments} out of {seasons.length} correct!
          </div>
          
          <div className={`${cardStyles.fact} max-w-2xl mx-auto mb-6`}>
            <h4 className={`${textStyles.accent} font-semibold mb-3 text-lg`}>
              {gameContent.summaryTitle || "How This Animal Adapts:"}
            </h4>
            <div className={`${textStyles.bodySmall} text-primary space-y-3`}>
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
            className={buttonStyles.success}
          >
            Continue to Next Animal
          </button>
        </div>
      )}
    </div>
  );
} 