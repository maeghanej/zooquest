import { Link } from "react-router-dom";

export default function FinalScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-4 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Congratulations!</h2>
        <p className="text-gray-600 mb-8 text-lg">
          You've completed the Wild Canada Quest! You've learned about amazing Canadian wildlife and their habitats.
        </p>
        
        <div className="bg-yellow-50 p-4 rounded-lg mb-8">
          <h3 className="font-semibold text-yellow-800 mb-2">What you discovered:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Caribou antler matching</li>
            <li>• Polar bear behavior</li>
            <li>• River otter observations</li>
            <li>• Grizzly bear seasonal activities</li>
          </ul>
        </div>

        <div className="space-y-4">
          <Link 
            to="/" 
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200 w-full"
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