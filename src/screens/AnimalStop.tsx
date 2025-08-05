import { useParams, useNavigate } from "react-router-dom";
import { animalData } from "../data/animalData.ts";
import CaribouPhotoMatchGame from "../components/CaribouPhotoMatchGame.tsx";
import PolarBearTrueFalseGame from "../components/PolarBearTrueFalseGame.tsx";
import OtterFoodSortGame from "../components/OtterFoodSortGame.tsx";
import GrizzlySeasonMatchGame from "../components/GrizzlySeasonMatchGame.tsx";

export default function AnimalStop() {
  const { animal } = useParams();
  const navigate = useNavigate();
  const data = animalData[animal!];

  if (!data) {
    return (
      <div className="min-h-screen bg-red-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-4 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Animal Not Found</h2>
          <p className="text-gray-600 mb-6">The animal you're looking for doesn't exist in our quest.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleComplete = () => {
    navigate(data.next);
  };

  const renderGame = () => {
    switch (data.game.type) {
      case "photo-match":
        return (
          <CaribouPhotoMatchGame
            question={data.game.instructions}
            images={data.game.images!}
            onComplete={handleComplete}
          />
        );
      case "true-false":
        return (
          <PolarBearTrueFalseGame
            questions={data.game.questions!}
            onComplete={handleComplete}
          />
        );
      case "food-sort":
        return (
          <OtterFoodSortGame
            question={data.game.instructions}
            options={data.game.options!}
            onComplete={handleComplete}
          />
        );
      case "season-match":
        return (
          <GrizzlySeasonMatchGame
            question={data.game.instructions}
            behaviors={data.game.behaviors!}
            onComplete={handleComplete}
          />
        );
      default:
        return (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-dashed border-green-300 rounded-lg p-8 mb-8 text-center">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Game Component</h3>
            <p className="text-gray-500">Interactive game will be implemented here</p>
            <div className="mt-4 text-sm text-gray-400">
              Game Type: {data.game.type}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-4 w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{data.title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 text-lg">{data.description}</p>
          <div className="bg-blue-50 p-4 rounded-lg mt-4">
            <p className="text-sm text-blue-700">
              <strong>Habitat:</strong> {data.habitat}
            </p>
            <p className="text-sm text-blue-700 mt-1">
              <strong>Fun Fact:</strong> {data.funFact}
            </p>
          </div>
        </div>
        
        {renderGame()}

        {data.game.type !== "photo-match" && data.game.type !== "true-false" && data.game.type !== "food-sort" && data.game.type !== "season-match" && (
          <div className="flex justify-center">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200"
              onClick={() => navigate(data.next)}
            >
              Continue Adventure
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 