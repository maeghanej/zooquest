export interface AnimalData {
  title: string;
  description: string;
  habitat: string;
  game: {
    type: string;
    instructions: string;
    difficulty: string;
    images?: { src: string; alt: string; isCorrect: boolean; explanation: string }[];
  };
  next: string;
  funFact: string;
}

export const animalData: Record<string, AnimalData> = {
  caribou: {
    title: "Caribou",
    description: "Majestic caribou roam the northern tundra in large herds, migrating across vast distances.",
    habitat: "Arctic tundra and boreal forests",
    game: {
      type: "photo-match",
      instructions: "Which antlers belong to the caribou?",
      difficulty: "Easy",
      images: [
        { 
          src: "/images/antlers_caribou.jpg", 
          alt: "Caribou Antlers", 
          isCorrect: true,
          explanation: "Caribou antlers are unique because both males and females grow them! They're the largest relative to body size of any deer species and help caribou dig through snow for food."
        },
        { 
          src: "/images/antlers_moose.jpg", 
          alt: "Moose Antlers", 
          isCorrect: false,
          explanation: "Moose antlers are much larger and broader than caribou antlers. Only male moose grow antlers, and they have a distinctive palm-like shape with many points."
        },
        { 
          src: "/images/antlers_deer.jpg", 
          alt: "Deer Antlers", 
          isCorrect: false,
          explanation: "Deer antlers are typically smaller and more branched than caribou antlers. Only male deer grow antlers, and they're usually more delicate and pointed."
        },
        { 
          src: "/images/antlers_elk.jpg", 
          alt: "Elk Antlers", 
          isCorrect: false,
          explanation: "Elk antlers are very large and have a distinctive branching pattern. Only male elk grow antlers, and they can reach impressive sizes with many points."
        }
      ]
    },
    next: "/stop/polarbear",
    funFact: "Caribou are the only deer species where both males and females grow antlers!"
  },
  polarbear: {
    title: "Polar Bear",
    description: "The largest land carnivore, polar bears are perfectly adapted to life on sea ice.",
    habitat: "Arctic sea ice and coastal areas",
    game: {
      type: "true-false",
      instructions: "Is this action cool or not cool for polar bears? Learn about behaviors that help or harm these amazing animals.",
      difficulty: "Medium"
    },
    next: "/stop/otter",
    funFact: "Polar bears have black skin under their white fur to absorb heat from the sun!"
  },
  otter: {
    title: "River Otter",
    description: "Playful river otters are excellent swimmers and can be found in rivers, lakes, and coastal areas.",
    habitat: "Rivers, lakes, and coastal waters",
    game: {
      type: "observation",
      instructions: "What is the otter playing with? Watch carefully and identify the objects in the otter's environment.",
      difficulty: "Easy"
    },
    next: "/stop/grizzly",
    funFact: "River otters can hold their breath for up to 8 minutes while diving underwater!"
  },
  grizzly: {
    title: "Grizzly Bear",
    description: "Powerful grizzly bears are omnivores that play a crucial role in their ecosystem.",
    habitat: "Mountain forests and alpine meadows",
    game: {
      type: "seasonal-match",
      instructions: "Choose what the grizzly does in each season! Learn about their annual cycle and behaviors.",
      difficulty: "Hard"
    },
    next: "/complete",
    funFact: "Grizzly bears can run up to 35 miles per hour, faster than most humans!"
  },
}; 