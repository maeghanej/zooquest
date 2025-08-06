// Style constants for common patterns in ZooQuest
// Using your brand colors: magnetic-navy, compass-gold, warm-sand, stone-gray, signal-black

export const buttonStyles = {
  // Primary action buttons - gold with dark text
  primary: "bg-secondary hover:bg-secondary/90 text-primary font-medium px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105",
  
  // Secondary action buttons  
  secondary: "bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105",
  
  // Success states (correct answers, continue buttons)
  success: "bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200",
  
  // Error states
  error: "bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200",
  
  // Neutral/subtle buttons
  neutral: "bg-neutral hover:bg-neutral/80 text-primary font-medium px-6 py-2 rounded-lg transition-all duration-200",
  
  // Large prominent buttons (like "Let's Go", "Play Again") - gold with dark text
  large: "bg-secondary hover:bg-secondary/90 text-primary font-semibold px-8 py-3 rounded-lg text-lg transition-all duration-200 transform hover:scale-105",
  
  // Game choice buttons (True/False, sorting options)
  choice: "px-8 py-4 rounded-lg border-2 font-semibold text-lg transition-all duration-200 transform hover:scale-105",
} as const;

export const cardStyles = {
  // Main screen containers
  screen: "bg-white rounded-lg shadow-xl p-8 max-w-md mx-4 text-center",
  
  // Game containers (wider)
  game: "bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-4",
  
  // Information boxes
  info: "bg-accent p-4 rounded-lg border border-neutral/20",
  
  // Success feedback
  success: "border-green-500 bg-green-50",
  
  // Error feedback  
  error: "border-red-500 bg-red-50",
  
  // Neutral state
  neutral: "border-neutral bg-white",
  
  // Fact boxes
  fact: "bg-accent p-3 rounded-lg border border-secondary/20",
} as const;

export const textStyles = {
  // Headings (using Manrope)
  h1: "text-4xl font-bold text-primary font-heading",
  h2: "text-3xl font-bold text-primary font-heading", 
  h3: "text-2xl font-bold text-primary font-heading",
  h4: "text-xl font-semibold text-primary font-heading",
  
  // Body text (using IBM Plex Sans) - now using navy instead of grey
  body: "text-primary font-body",
  bodyLarge: "text-lg text-primary font-body",
  bodySmall: "text-sm text-primary font-body",
  
  // Special text
  accent: "text-secondary font-medium",
  muted: "text-stone-gray", // keep grey for truly muted text
  error: "text-red-600",
  success: "text-green-600",
} as const;

export const layoutStyles = {
  // Full screen containers 
  screenContainer: "min-h-screen flex items-center justify-center",
  
  // Solid background colors for different screens
  homeBackground: "bg-accent", // warm sand for home
  introBackground: "bg-accent", // warm sand for intro  
  gameBackground: "bg-accent", // warm sand for games
  finalBackground: "bg-secondary", // compass gold for celebration
  
  // Spacing
  sectionSpacing: "space-y-6",
  itemSpacing: "space-y-4",
  
  // Common flexbox patterns
  centerContent: "flex items-center justify-center",
  spaceBetween: "flex items-center justify-between",
} as const;

export const gameStyles = {
  // Question/instruction text
  question: "text-primary text-lg font-body",
  instruction: "text-sm text-stone-gray mt-2 font-body",
  
  // Game choice states
  choiceDefault: "border-neutral hover:border-primary bg-white",
  choiceSelected: "border-primary bg-primary/10",
  choiceCorrect: "border-green-500 bg-green-50 text-green-800",
  choiceIncorrect: "border-red-500 bg-red-50 text-red-800",
  
  // Score and progress
  score: "text-2xl font-bold text-secondary font-heading",
  progress: "text-sm text-stone-gray font-body", // keep grey for progress
  
  // Game grids
  optionsGrid: "grid grid-cols-2 gap-4 max-w-2xl mx-auto",
  behaviorsGrid: "grid gap-4 max-w-2xl mx-auto",
} as const;

// Helper function to combine styles
export const cn = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Example usage patterns:
export const exampleUsage = {
  primaryButton: buttonStyles.primary,
  gameCard: `${cardStyles.game} ${layoutStyles.sectionSpacing}`,
  pageTitle: textStyles.h1,
  questionText: `${textStyles.bodyLarge} ${gameStyles.question}`,
} as const;