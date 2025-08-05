import { Link } from "react-router-dom";
import { useScoreStore } from "../store/scoreStore.ts";

export default function Home() {
  const { resetScore } = useScoreStore();

  const handleBeginAdventure = () => {
    resetScore();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-4 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Wild Canada Quest</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Adventure through the seven biomes of Canada and learn about the amazing ways animals adapt to their environments.
        </p>
        <Link 
          to="/intro" 
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200"
          onClick={handleBeginAdventure}
        >
          Begin Adventure
        </Link>
      </div>
    </div>
  );
} 