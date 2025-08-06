import { Link } from "react-router-dom";
import { useScoreStore } from "../store/scoreStore.ts";
import { getBadgeTier } from "../utils/badgeUtils.ts";
import { buttonStyles, cardStyles, textStyles, layoutStyles } from "../utils/styles.ts";

export default function FinalScreen() {
  const { totalScore, maxScore, resetScore } = useScoreStore();
  const badge = getBadgeTier(totalScore, maxScore);

  const handlePlayAgain = () => {
    resetScore();
  };

  return (
    <div className={`${layoutStyles.screenContainer} ${layoutStyles.finalBackground}`}>
      <div className={cardStyles.screen}>
        <div className="text-6xl mb-6">{badge.emoji}</div>
        <h2 className={`${textStyles.h2} mb-4`}>Congratulations!</h2>
        <p className={`${textStyles.bodyLarge} mb-8`}>
          You've completed the Wild Canada Quest!
        </p>
        
        <div className={`bg-gradient-to-r ${badge.color} p-6 rounded-lg mb-8 text-white`}>
          <h3 className="text-2xl font-bold mb-2">{badge.name}</h3>
          <p className="text-lg opacity-90">{badge.description}</p>
        </div>
        
        <div className={`${cardStyles.fact} mb-8`}>
          <h3 className={`${textStyles.accent} font-semibold mb-2`}>Your Score:</h3>
          <p className="text-2xl font-bold text-secondary">
            {totalScore} / {maxScore}
          </p>
          <p className={`${textStyles.bodySmall} text-primary mt-1`}>
            {maxScore > 0 ? `${Math.round((totalScore / maxScore) * 100)}%` : "0%"}
          </p>
        </div>

        <div className={`${cardStyles.fact} mb-8`}>
          <h3 className={`${textStyles.accent} font-semibold mb-2`}>What you discovered:</h3>
          <ul className={`${textStyles.bodySmall} text-primary space-y-1`}>
            <li>• Bighorn sheep mountain skills</li>
            <li>• Caribou antler matching</li>
            <li>• Polar bear behavior</li>
            <li>• River otter diet</li>
            <li>• Wolf behaviour</li>
            <li>• Grizzly bear seasonal activities</li>
          </ul>
        </div>

        <div className={layoutStyles.itemSpacing}>
          <Link 
            to="/" 
            className={`inline-block ${buttonStyles.large} w-full`}
            onClick={handlePlayAgain}
          >
            Play Again
          </Link>
          <p className={`${textStyles.bodySmall} ${textStyles.muted}`}>
            Thanks for exploring Canada's wildlife!
          </p>
        </div>
      </div>
    </div>
  );
} 