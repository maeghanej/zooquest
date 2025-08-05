export interface AnimalData {
  title: string;
  description: string;
  habitat: string;
  game: {
    type: string;
    instructions: string;
    difficulty: string;
    images?: { src: string; alt: string; isCorrect: boolean; explanation: string }[];
    questions?: { question: string; correctAnswer: boolean; explanation: string }[];
    options?: { src: string; alt: string; isEdible: boolean; explanation: string }[];
    behaviors?: { label: string; correctSeason: string; explanation: string }[];
    question?: string;
    correctAnswer?: boolean;
    explanation?: string;
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
      instructions: "Is this action cool or not cool for polar bears?",
      difficulty: "Medium",
      questions: [
        {
          question: "Polar bears can swim for days to find food when sea ice melts.",
          correctAnswer: true,
          explanation: "Polar bears are excellent swimmers and can swim for days at a time! They use their large paws as paddles and can cover hundreds of miles in search of food when sea ice is scarce. This adaptation helps them survive in a changing Arctic environment."
        },
        {
          question: "Polar bears hibernate during the winter months.",
          correctAnswer: false,
          explanation: "Polar bears don't hibernate like other bears! They remain active year-round, hunting seals on sea ice. Only pregnant females den up to give birth and care for their cubs during the winter."
        },
        {
          question: "Polar bears have black skin under their white fur.",
          correctAnswer: true,
          explanation: "Polar bears have black skin that helps absorb heat from the sun! Their white fur is actually transparent and hollow, which helps insulate them and camouflage them in the snow and ice."
        }
      ]
    },
    next: "/stop/otter",
    funFact: "Polar bears have black skin under their white fur to absorb heat from the sun!"
  },
  otter: {
    title: "River Otter",
    description: "Playful river otters are excellent swimmers and can be found in rivers, lakes, and coastal areas.",
    habitat: "Rivers, lakes, and coastal waters",
    game: {
      type: "food-sort",
      instructions: "Which of these things would a river otter eat?",
      difficulty: "Easy",
      options: [
        { 
          src: "/images/fish.jpg", 
          alt: "Fish", 
          isEdible: true,
          explanation: "River otters love fish! They're excellent hunters and can catch fish with their sharp teeth and webbed feet. Fish make up a large part of their diet in rivers and lakes."
        },
        { 
          src: "/images/rock.jpg", 
          alt: "Rock", 
          isEdible: false,
          explanation: "Rocks are not food! River otters are carnivores and only eat meat. They might use rocks to crack open shellfish, but they don't eat the rocks themselves."
        },
        { 
          src: "/images/frog.jpg", 
          alt: "Frog", 
          isEdible: true,
          explanation: "River otters will eat frogs and other amphibians! They're opportunistic hunters and will catch frogs in shallow water or along the shoreline."
        },
        { 
          src: "/images/apple.jpg", 
          alt: "Apple", 
          isEdible: false,
          explanation: "River otters are carnivores and don't eat fruits or plants! They only eat meat from fish, frogs, crayfish, and other aquatic animals."
        }
      ]
    },
    next: "/stop/grizzly",
    funFact: "River otters can hold their breath for up to 8 minutes while diving underwater!"
  },
  grizzly: {
    title: "Grizzly Bear",
    description: "Powerful grizzly bears are omnivores that play a crucial role in their ecosystem.",
    habitat: "Mountain forests and alpine meadows",
    game: {
      type: "season-match",
      instructions: "Match the bear's behavior to each season!",
      difficulty: "Hard",
      behaviors: [
        { 
          label: "Wakes from hibernation", 
          correctSeason: "spring",
          explanation: "In spring, grizzly bears emerge from their winter dens after months of hibernation. They're hungry and immediately start looking for food to replenish their energy after the long winter sleep."
        },
        { 
          label: "Eats nonstop to gain weight", 
          correctSeason: "fall",
          explanation: "During fall, grizzlies enter a phase called hyperphagia where they eat almost constantly to build up fat reserves. They need to gain hundreds of pounds to survive the winter hibernation."
        },
        { 
          label: "Sleeps in a den", 
          correctSeason: "winter",
          explanation: "Grizzly bears hibernate during winter to conserve energy when food is scarce. They find or dig dens in the mountains and can sleep for 5-7 months without eating, drinking, or going to the bathroom."
        },
        { 
          label: "Fishes for salmon", 
          correctSeason: "summer",
          explanation: "Summer is peak fishing season for grizzlies! They gather at rivers and streams to catch salmon during the annual salmon runs. This high-protein food helps them build strength for the coming winter."
        }
      ]
    },
    next: "/complete",
    funFact: "Grizzly bears can run up to 35 miles per hour, faster than most humans!"
  },
}; 