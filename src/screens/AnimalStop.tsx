import { useParams, useNavigate } from "react-router-dom";
import { animalData } from "../data/animalData.ts";
import PhotoMatchGame from "../components/PhotoMatchGame.tsx";
import TrueFalseGame from "../components/TrueFalseGame.tsx";
import PhotoSortGame from "../components/PhotoSortGame.tsx";
import SeasonMatchGame from "../components/SeasonMatchGame.tsx";
import TextSortGame from "../components/TextSortGame.tsx";
import { buttonStyles, cardStyles, textStyles, layoutStyles } from "../utils/styles.ts";

export default function AnimalStop() {
  const { animal } = useParams();
  const navigate = useNavigate();
  const data = animalData[animal!];

  if (!data) {
    return (
      <div className={`${layoutStyles.screenContainer} bg-red-100`}>
        <div className={cardStyles.screen}>
          <h2 className={`${textStyles.h2} text-red-600 mb-4`}>Animal Not Found</h2>
          <p className={`${textStyles.body} mb-6`}>The animal you're looking for doesn't exist in our quest.</p>
          <button
            onClick={() => navigate("/")}
            className={buttonStyles.error}
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
          <PhotoMatchGame
            question={data.game.instructions}
            images={data.game.images!}
            gameContent={data.game.gameContent!}
            onComplete={handleComplete}
          />
        );
      case "true-false":
        return (
          <TrueFalseGame
            questions={data.game.questions!}
            gameContent={data.game.gameContent!}
            onComplete={handleComplete}
          />
        );
      case "photo-sort":
        return (
          <PhotoSortGame
            question={data.game.instructions}
            options={data.game.options!}
            sortCategories={data.game.sortCategories!}
            onComplete={handleComplete}
          />
        );
      case "season-match":
        return (
          <SeasonMatchGame
            question={data.game.instructions}
            behaviors={data.game.behaviors!}
            gameContent={data.game.gameContent!}
            onComplete={handleComplete}
          />
        );
      case "text-sort":
        return (
          <TextSortGame
            question={data.game.instructions}
            items={data.game.items!}
            gameContent={data.game.gameContent!}
            onComplete={handleComplete}
          />
        );
      default:
        return (
          <div className="bg-accent border-2 border-dashed border-secondary rounded-lg p-8 mb-8 text-center">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className={`${textStyles.h3} mb-2`}>Game Component</h3>
            <p className={textStyles.muted}>Interactive game will be implemented here</p>
            <div className={`mt-4 ${textStyles.bodySmall} ${textStyles.muted}`}>
              Game Type: {data.game.type}
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`${layoutStyles.screenContainer} ${layoutStyles.gameBackground} p-4`}>
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-4 w-full">
        <div className="text-center mb-8">
          <h2 className={`${textStyles.h2} mb-2`}>{data.title}</h2>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full mb-4"></div>
          <p className={`${textStyles.bodyLarge} mb-4`}>{data.description}</p>
          <div className={`${cardStyles.fact} mt-4`}>
            <p className={`${textStyles.bodySmall} text-primary`}>
              <strong>Habitat:</strong> {data.habitat}
            </p>
            <p className={`${textStyles.bodySmall} text-primary mt-1`}>
              <strong>Endangerment Status:</strong> {data.endangermentStatus}
            </p>
            <p className={`${textStyles.bodySmall} text-primary mt-1`}>
              <strong>Fun Fact:</strong> {data.funFact}
            </p>
          </div>
        </div>
        
        {renderGame()}

        {data.game.type !== "photo-match" && data.game.type !== "true-false" && data.game.type !== "photo-sort" && data.game.type !== "season-match" && data.game.type !== "text-sort" && (
          <div className="flex justify-center">
            <button
              className={buttonStyles.large}
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