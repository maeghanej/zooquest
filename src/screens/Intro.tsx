import { Link } from "react-router-dom";
import { buttonStyles, cardStyles, textStyles, layoutStyles } from "../utils/styles.ts";

export default function Intro() {
  return (
    <div className={`${layoutStyles.screenContainer} ${layoutStyles.introBackground}`}>
      <div className={cardStyles.screen}>
        <h2 className={`${textStyles.h2} mb-6`}>How It Works</h2>
        <div className={`${layoutStyles.sectionSpacing} mb-8`}>
          <p className={textStyles.bodyLarge}>As you explore Wild Canada, use the knowledge you gain to successfully complete each challenge and earn your Wild Canada badge.</p>
          <div className={`${cardStyles.fact} mt-4`}>
            <h3 className={`${textStyles.accent} font-semibold mb-2`}>What you'll do:</h3>
            <ul className={`${textStyles.bodySmall} text-primary space-y-1`}>
              <li>• Test bighorn sheep knowledge</li>
              <li>• Match antlers with caribou</li>
              <li>• Learn about polar bear behavior</li>
              <li>• Build a river otter diet</li>
              <li>• Sort wolf vs dog traits</li>
              <li>• Discover grizzly bear seasons</li>
            </ul>
          </div>
        </div>
        <Link 
          to="/stop/bighornsheep" 
          className={`inline-block ${buttonStyles.large}`}
        >
          Let's Go!
        </Link>
      </div>
    </div>
  );
} 