import { Link } from "react-router-dom";
import { useScoreStore } from "../store/scoreStore.ts";
import { getBadgeTier } from "../utils/badgeUtils.ts";

export default function FinalScreen() {
  const { totalScore, maxScore, resetScore } = useScoreStore();
  const badge = getBadgeTier(totalScore, maxScore);

  const handlePlayAgain = () => {
    resetScore();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-4 text-center">
        <div className="text-6xl mb-6">{badge.emoji}</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Congratulations!</h2>
        <p className="text-gray-600 mb-8 text-lg">
          You've completed the Wild Canada Quest!
        </p>
        
        <div className={`bg-gradient-to-r ${badge.color} p-6 rounded-lg mb-8 text-white`}>
          <h3 className="text-2xl font-bold mb-2">{badge.name}</h3>
          <p className="text-lg opacity-90">{badge.description}</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-8">
          <h3 className="font-semibold text-blue-800 mb-2">Your Score:</h3>
          <p className="text-2xl font-bold text-blue-600">
            {totalScore} / {maxScore}
          </p>
          <p className="text-sm text-blue-700 mt-1">
            {maxScore > 0 ? `${Math.round((totalScore / maxScore) * 100)}%` : "0%"}
          </p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg mb-8">
          <h3 className="font-semibold text-yellow-800 mb-2">What you discovered:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Bighorn sheep mountain skills</li>
            <li>• Caribou antler matching</li>
            <li>• Polar bear behavior</li>
            <li>• River otter diet</li>
            <li>• Wolf behaviour</li>
            <li>• Grizzly bear seasonal activities</li>
          </ul>
        </div>

        <div className="space-y-4">
          <Link 
            to="/" 
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200 w-full"
            onClick={handlePlayAgain}
          >
            Play Again
          </Link>
          <p className="text-sm text-gray-500">
            Thanks for exploring Canada's wildlife!
          </p>
        </div>
      </div>
    </div>
  );
} 