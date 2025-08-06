export interface AnimalData {
  title: string;
  description: string;
  habitat: string;
  endangermentStatus: string;
  game: {
    type: string;
    instructions: string;
    difficulty: string;
    images?: { src: string; alt: string; isCorrect: boolean; explanation: string }[];
    questions?: { question: string; correctAnswer: boolean; explanation: string }[];
    options?: { src: string; alt: string; isCorrect: boolean; explanation: string }[];
    sortCategories?: { positive: string; negative: string; title: string; description: string };
    behaviors?: { label: string; correctSeason: string; explanation: string }[];
    items?: { label: string; correctGroup: "wolf" | "dog"; explanation: string }[];
    question?: string;
    correctAnswer?: boolean;
    explanation?: string;
  };
  next: string;
  funFact: string;
}

export const animalData: Record<string, AnimalData> = {
  bighornsheep: {
    title: "Bighorn Sheep",
    description: "Magnificent bighorn sheep are skilled climbers that navigate steep mountain terrain with incredible agility.",
    habitat: "Rocky mountain slopes and alpine meadows",
    endangermentStatus: "Least Concern",
    game: {
      type: "true-false",
      instructions: "Tap true or false for each of these bighorn sheep facts!",
      difficulty: "Easy",
      questions: [
        {
          question: "Bighorn sheep can climb nearly vertical rock faces.",
          correctAnswer: true,
          explanation: "Bighorn sheep are incredible climbers! Their specialized hooves have a hard outer edge and soft inner pad that acts like a suction cup, allowing them to navigate nearly vertical rock faces with amazing skill."
        },
        {
          question: "Only male bighorn sheep have horns.",
          correctAnswer: false,
          explanation: "Both male and female bighorn sheep have horns! However, males (rams) have much larger, curved horns that can weigh up to 30 pounds, while females (ewes) have smaller, straighter horns."
        },
        {
          question: "Bighorn sheep live mostly in deserts and rainforests.",
          correctAnswer: false,
          explanation: "Bighorn sheep live in rocky mountain terrain, not deserts or rainforests! They prefer steep, rugged landscapes where they can use their climbing skills to escape predators and find food."
        },
        {
          question: "They use their horns to fight for dominance.",
          correctAnswer: true,
          explanation: "Male bighorn sheep engage in dramatic head-butting battles during mating season! They charge at each other at speeds up to 20 mph, and the sound of their horns clashing can be heard over a mile away."
        },
        {
          question: "Bighorn sheep often fall from cliffs due to poor balance.",
          correctAnswer: false,
          explanation: "Bighorn sheep rarely fall from cliffs! They have exceptional balance and are perfectly adapted for mountain life. Their sure-footedness and climbing ability make them one of the most skilled mountaineers in the animal kingdom."
        }
      ]
    },
    next: "/stop/caribou",
    funFact: "Bighorn sheep can leap 20 feet between rocky ledges and run up steep slopes at 15 mph!"
  },
  caribou: {
    title: "Caribou",
    description: "Majestic caribou roam the northern tundra in large herds, migrating across vast distances.",
    habitat: "Arctic tundra and boreal forests",
    endangermentStatus: "Least Concern",
    game: {
      type: "photo-match",
      instructions: "Which antlers belong to the caribou?",
      difficulty: "Easy",
      images: [
        { 
          src: "/images/caribou/antlers-caribou.jpg", 
          alt: "Caribou Antlers", 
          isCorrect: true,
          explanation: "Caribou antlers are unique because both males and females grow them! They're the largest relative to body size of any deer species and help caribou dig through snow for food."
        },
        { 
          src: "/images/caribou/antlers-moose.jpg", 
          alt: "Moose Antlers", 
          isCorrect: false,
          explanation: "Moose antlers are much larger and broader than caribou antlers. Only male moose grow antlers, and they have a distinctive palm-like shape with many points."
        },
        { 
          src: "/images/caribou/antlers-deer.jpg", 
          alt: "Deer Antlers", 
          isCorrect: false,
          explanation: "Deer antlers are typically smaller and more branched than caribou antlers. Only male deer grow antlers, and they're usually more delicate and pointed."
        },
        { 
          src: "/images/caribou/antlers-elk.jpg", 
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
    endangermentStatus: "Vulnerable",
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
    endangermentStatus: "Least Concern",
    game: {
      type: "photo-sort",
      instructions: "Which of these things would a river otter eat?",
      difficulty: "Easy",
      options: [
        { 
          src: "/images/otter/fish.jpg", 
          alt: "Fish", 
          isCorrect: true,
          explanation: "River otters love fish! They're excellent hunters and can catch fish with their sharp teeth and webbed feet. Fish make up a large part of their diet in rivers and lakes."
        },
        { 
          src: "/images/otter/rock.jpg", 
          alt: "Rock", 
          isCorrect: false,
          explanation: "Rocks are not food! River otters are carnivores and only eat meat. They might use rocks to crack open shellfish, but they don't eat the rocks themselves."
        },
        { 
          src: "/images/otter/frog.jpg", 
          alt: "Frog", 
          isCorrect: true,
          explanation: "River otters will eat frogs and other amphibians! They're opportunistic hunters and will catch frogs in shallow water or along the shoreline."
        },
        { 
          src: "/images/otter/apple.jpg", 
          alt: "Apple", 
          isCorrect: false,
          explanation: "River otters are carnivores and don't eat fruits or plants! They only eat meat from fish, frogs, crayfish, and other aquatic animals."
        }
      ],
      sortCategories: {
        positive: "Eat",
        negative: "Don't Eat", 
        title: "River Otter Food Challenge",
        description: "Learn about what river otters eat in their natural habitat!"
      }
    },
    next: "/stop/wolf",
    funFact: "River otters can hold their breath for up to 8 minutes while diving underwater!"
  },
  wolf: {
    title: "Grey Wolf",
    description: "Intelligent and social grey wolves are apex predators that live in complex pack structures.",
    habitat: "Forests, tundra, and mountainous regions",
    endangermentStatus: "Least Concern",
    game: {
      type: "text-sort",
      instructions: "Sort these traits into 'wolf' or 'dog' categories!",
      difficulty: "Medium",
      items: [
        { 
          label: "Lives in a pack with complex social roles", 
          correctGroup: "wolf",
          explanation: "Wolves live in family groups called packs with strict hierarchies. Each wolf has a specific role, from the alpha leaders to omega subordinates, which helps them hunt and survive together."
        },
        { 
          label: "Barks frequently to communicate", 
          correctGroup: "dog",
          explanation: "Dogs bark much more than wolves! Domestic dogs have developed frequent barking through thousands of years of breeding by humans. Wolves rarely bark and prefer howling, whining, and body language."
        },
    
        { 
          label: "Roams large territories in the wild", 
          correctGroup: "wolf",
          explanation: "Wolf packs maintain territories that can range from 50 to 1,000 square miles! They patrol these areas to find food and protect their family from rival packs."
        },
        { 
          label: "Can be trained to fetch and do tricks", 
          correctGroup: "dog",
          explanation: "Dogs have been bred to be highly trainable and eager to please humans. While wolves are intelligent, they're independent and don't naturally seek to obey human commands like dogs do."
        },
        { 
          label: "Plays an important role in balancing ecosystems", 
          correctGroup: "wolf",
          explanation: "Wolves are keystone species that help control deer and elk populations. This prevents overgrazing and allows forests and grasslands to thrive, benefiting many other animals."
        },
        
      ]
    },
    next: "/stop/grizzly",
    funFact: "A wolf's howl can be heard up to 6 miles away and helps coordinate pack hunts!"
  },
  grizzly: {
    title: "Grizzly Bear",
    description: "Powerful grizzly bears are omnivores that play a crucial role in their ecosystem.",
    habitat: "Mountain forests and alpine meadows",
    endangermentStatus: "Least Concern",
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