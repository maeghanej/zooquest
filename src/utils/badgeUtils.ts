export interface BadgeInfo {
  tier: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
}

export const getBadgeTier = (score: number, maxScore: number): BadgeInfo => {
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
  
  if (percentage >= 90) {
    return {
      tier: "master",
      name: "Wild Canada Master",
      description: "Exceptional knowledge of Canadian wildlife!",
      emoji: "🏆",
      color: "from-yellow-400 to-orange-500"
    };
  } else if (percentage >= 75) {
    return {
      tier: "explorer",
      name: "Wild Canada Explorer",
      description: "Great understanding of Canadian animals!",
      emoji: "🌟",
      color: "from-green-400 to-blue-500"
    };
  } else {
    return {
      tier: "learner",
      name: "Wild Canada Learner",
      description: "Keep exploring to learn more about Canadian wildlife!",
      emoji: "🌿",
      color: "from-blue-400 to-green-500"
    };
  }
}; 