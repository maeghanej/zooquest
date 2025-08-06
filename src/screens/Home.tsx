import { Link } from "react-router-dom";
import { useScoreStore } from "../store/scoreStore.ts";
import { buttonStyles, cardStyles, textStyles, layoutStyles } from "../utils/styles.ts";

export default function Home() {
  const { resetScore } = useScoreStore();

  const handleBeginAdventure = () => {
    resetScore();
  };

  return (
    <div className={`${layoutStyles.screenContainer} ${layoutStyles.homeBackground}`}>
      <div className={cardStyles.screen}>
        <h1 className={`${textStyles.h1} mb-4`}>Wild Canada Quest</h1>
        <p className={`${textStyles.bodyLarge} mb-8`}>
          Adventure through the seven biomes of Canada and learn about the amazing ways animals adapt to their environments.
        </p>
        <Link 
          to="/intro" 
          className={`inline-block ${buttonStyles.large}`}
          onClick={handleBeginAdventure}
        >
          Begin Adventure
        </Link>
      </div>
    </div>
  );
} 