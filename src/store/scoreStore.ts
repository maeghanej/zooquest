import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ScoreState {
  totalScore: number;
  maxScore: number;
  recordScore: (score: number, max: number) => void;
  resetScore: () => void;
}

export const useScoreStore = create<ScoreState>()(
  persist(
    (set) => ({
      totalScore: 0,
      maxScore: 0,
      recordScore: (score, max) =>
        set((state) => ({
          totalScore: state.totalScore + score,
          maxScore: state.maxScore + max,
        })),
      resetScore: () => set({ totalScore: 0, maxScore: 0 }),
    }),
    {
      name: "wild-canada-quest-scores", // unique name for localStorage key
      partialize: (state) => ({ 
        totalScore: state.totalScore, 
        maxScore: state.maxScore 
      }), // only persist these fields
    }
  )
); 