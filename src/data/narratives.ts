export interface NarrativeModel {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  origin: string;
  keyTraits: {
    protagonist: string;
    structure: string;
    goal: string;
    vibe: string;
  };
  visualType: 'circle' | 'braid' | 'mandala' | 'network' | 'map';
  examples: { title: string; description: string }[];
}

export const narratives: NarrativeModel[] = [
  {
    id: 'heros-journey',
    title: "The Hero's Journey",
    shortDescription: "The classic monomyth: a single hero ventures out, faces trials, and returns changed.",
    fullDescription: "Roland Barthes called it the 'canonical narrative.' It privileges a single protagonist who leaves the known world, undergoes a transformation through conflict, and returns with a boon. It is linear, goal-oriented, and focuses on individual growth.",
    origin: "Western / Campbell",
    keyTraits: {
      protagonist: "Single Individual",
      structure: "Linear / Circular",
      goal: "Transformation & Return",
      vibe: "Epic, Focused, Triumphant"
    },
    visualType: 'circle',
    examples: [
      { title: "Star Wars", description: "Luke Skywalker leaves Tatooine, learns the Force, and returns as a Jedi." },
      { title: "The Hobbit", description: "Bilbo Baggins leaves the Shire, finds a ring, and returns with treasure and wisdom." },
      { title: "The Lion King", description: "Simba flees his kingdom, grows up, and returns to take his place as king." }
    ]
  },
  {
    id: 'scandinavian',
    title: "Scandinavian",
    shortDescription: "A collective saga of multiple characters bound by fate and ritual.",
    fullDescription: "Unlike Hollywood narratives, these are often built around multiple characters with a 'ritual-based truth' as the red thread. Characters meet in a central location, diverge to adventure, and realign. It is less about individual victory and more about collective adaptation and fate.",
    origin: "Northern Europe",
    keyTraits: {
      protagonist: "Collective / Multiple",
      structure: "Braided / Multi-threaded",
      goal: "Realignment & Truth",
      vibe: "Fatalistic, Communal, Gritty"
    },
    visualType: 'braid',
    examples: [
      { title: "The Poetic Edda", description: "A collection of Old Norse poems where gods and heroes face inevitable fate." },
      { title: "Beowulf", description: "A hero's life told through three distinct, ritualistic battles against monsters." },
      { title: "Vikings (TV Series)", description: "Focuses on the collective rise and fall of a family and their community." }
    ]
  },
  {
    id: 'indian',
    title: "Indian",
    shortDescription: "A branching, emotional journey focusing on 'Rasa' (flavor) over plot.",
    fullDescription: "Indian narrative forms are multiple and radically different. They may feel chaotic to a Western eye but follow a distinct logic of 'Rasa' (emotional essence). The structure is often non-linear, spiritual, and accommodates many differing perspectives and world-views simultaneously.",
    origin: "India",
    keyTraits: {
      protagonist: "Fluid / Spiritual",
      structure: "Fractal / Branching",
      goal: "Rasa (Emotional Essence)",
      vibe: "Vibrant, Spiritual, Complex"
    },
    visualType: 'mandala',
    examples: [
      { title: "The Mahabharata", description: "A massive, branching epic where every character has a complex backstory and moral weight." },
      { title: "Panchatantra", description: "Interwoven animal fables that teach wisdom through nested narratives." },
      { title: "Bollywood Musicals", description: "Stories where emotional 'Rasas' are expressed through song and dance, often pausing the plot." }
    ]
  },
  {
    id: 'west-african',
    title: "West African",
    shortDescription: "Context is king. The web of relationships defines the story.",
    fullDescription: "In these forms, the environmental context is privileged over the individual protagonist. The social context rules the individual. It often involves oral traditions, trickster figures, and a constant interplay between the human and the spirit world. The story is a web of stable plot elements.",
    origin: "West Africa",
    keyTraits: {
      protagonist: "Context-Dependent",
      structure: "Network / Web",
      goal: "Social Balance",
      vibe: "Rooted, Oral, Interconnected"
    },
    visualType: 'network',
    examples: [
      { title: "Anansi the Spider", description: "Trickster tales where the hero's success depends on outsmarting a rigid social context." },
      { title: "The Palm-Wine Drinkard", description: "A journey through a spirit-filled landscape where the environment is the main obstacle." },
      { title: "Things Fall Apart", description: "A novel where the protagonist's fate is inseparable from the changing social fabric of his village." }
    ]
  },
  {
    id: 'autochthonous',
    title: "Autochthonous",
    shortDescription: "Stories native to a place, interactive and deeply rooted.",
    fullDescription: "These are forms native to the place they live rather than just being born there. The work is admittedly limited, regardless of the medium. The narrative is an effect, not a driver. It invites the audience to interpret signs and create their own stories. It is interactive and 'author-less'.",
    origin: "Indigenous / Place-based",
    keyTraits: {
      protagonist: "The Land / Place",
      structure: "Spatial / Map-based",
      goal: "Interpretation & Presence",
      vibe: "Ancient, Interactive, Silent"
    },
    visualType: 'map',
    examples: [
      { title: "Songlines", description: "Aboriginal Australian narratives where the landscape itself is the map of the story." },
      { title: "Petroglyphs", description: "Ancient rock art that tells stories through spatial relationships rather than linear time." },
      { title: "Environmental Art", description: "Modern installations that invite the viewer to create a story by moving through a space." }
    ]
  },
  {
    id: 'story-circle',
    title: "Harmon's Story Circle",
    shortDescription: "A simplified 8-step cycle focused on character desire and internal change.",
    fullDescription: "Dan Harmon's distillation of the Hero's Journey into eight steps: You, Need, Go, Search, Find, Take, Return, Change. It emphasizes that the character must return to their starting point but as a changed person.",
    origin: "Modern / Dan Harmon",
    keyTraits: {
      protagonist: "Relatable Individual",
      structure: "8-Step Circular",
      goal: "Internal Change",
      vibe: "Rhythmic, Psychological, Efficient"
    },
    visualType: 'circle',
    examples: [
      { title: "Rick and Morty", description: "Almost every episode follows this cycle, with characters returning home changed (or not)." },
      { title: "Community", description: "Characters face a crisis, learn a lesson, and return to their study group." },
      { title: "The Dark Knight", description: "Batman faces a need, goes into chaos, and returns as a different kind of hero." }
    ]
  },
  {
    id: 'kishotenketsu',
    title: "Kishōtenketsu",
    shortDescription: "A four-act structure that develops without relying on conflict.",
    fullDescription: "Common in Chinese, Japanese, and Korean narratives. Introduction (Ki), Development (Shō), Twist (Ten), and Conclusion (Ketsu). The 'Twist' is often a change in perspective or a surprise that doesn't necessarily involve a clash of forces.",
    origin: "East Asian",
    keyTraits: {
      protagonist: "Observational",
      structure: "Four-Act / Non-Conflict",
      goal: "Perspective Shift",
      vibe: "Harmonious, Surprising, Contemplative"
    },
    visualType: 'braid',
    examples: [
      { title: "My Neighbor Totoro", description: "A story of childhood wonder that develops through observation rather than conflict." },
      { title: "Yonkoma Manga", description: "Four-panel comic strips that perfectly illustrate the Ki-Shō-Ten-Ketsu structure." },
      { title: "The Old Man and the Sea", description: "While it has conflict, the focus is often on the meditative process and perspective shift." }
    ]
  },
  {
    id: 'fichtean-curve',
    title: "Fichtean Curve",
    shortDescription: "A rapid series of crises building tension toward a final climax.",
    fullDescription: "Starts immediately with the inciting incident and moves through a series of 'rising action' crises. Each crisis is more intense than the last, keeping the pace high and the stakes rising constantly.",
    origin: "Classical / Thriller",
    keyTraits: {
      protagonist: "Active / Under Pressure",
      structure: "Rising Crises",
      goal: "Resolution of Tension",
      vibe: "High-Pace, Tense, Escalating"
    },
    visualType: 'network',
    examples: [
      { title: "Die Hard", description: "John McClane faces a non-stop series of escalating crises in a single building." },
      { title: "The Martian", description: "A series of technical failures that the protagonist must solve to survive." },
      { title: "Uncut Gems", description: "A high-tension thriller where the protagonist's situation constantly worsens." }
    ]
  },
  {
    id: 'snowflake',
    title: "Snowflake Method",
    shortDescription: "A recursive expansion from a single core idea into a complex world.",
    fullDescription: "Developed by Randy Ingermanson. It starts with a single sentence, then a paragraph, then character bios, expanding outward in layers. The story grows like a fractal, ensuring structural integrity at every scale.",
    origin: "Modern / Ingermanson",
    keyTraits: {
      protagonist: "Multidimensional",
      structure: "Recursive / Fractal",
      goal: "Structural Integrity",
      vibe: "Logical, Detailed, Expanding"
    },
    visualType: 'mandala',
    examples: [
      { title: "Dune", description: "A massive world built from a few core ideas about ecology, religion, and politics." },
      { title: "Game of Thrones", description: "A complex web of characters and history that grew from a single image of a direwolf." },
      { title: "Foundation", description: "A series that expands from a single mathematical premise about the future of humanity." }
    ]
  },
  {
    id: 'seven-point',
    title: "Seven-Point Structure",
    shortDescription: "A plot-driven model that balances the start, middle, and end with precision.",
    fullDescription: "Hook, Plot Point 1, Pinch Point 1, Midpoint, Pinch Point 2, Plot Point 2, Resolution. This model ensures that the story has a clear direction and that the stakes are constantly being raised or shifted.",
    origin: "Modern / Dan Wells",
    keyTraits: {
      protagonist: "Goal-Oriented",
      structure: "7-Point Linear",
      goal: "Resolution",
      vibe: "Balanced, Structured, Driven"
    },
    visualType: 'braid',
    examples: [
      { title: "Harry Potter", description: "Each book follows a precise set of plot points that lead to a final confrontation." },
      { title: "The Hunger Games", description: "A clear progression from the Reaping to the final victory in the arena." },
      { title: "Pride and Prejudice", description: "A classic novel that follows a clear structural path of misunderstanding and resolution." }
    ]
  },
  {
    id: 'in-media-res',
    title: "In Media Res",
    shortDescription: "Starting in the heat of the action to immediately hook the audience.",
    fullDescription: "Latin for 'in the midst of things.' The story begins at a critical point of action or tension, then uses flashbacks or dialogue to fill in the backstory. It prioritizes immediate engagement over chronological setup.",
    origin: "Classical / Homeric",
    keyTraits: {
      protagonist: "Already in Conflict",
      structure: "Non-Chronological",
      goal: "Contextualization",
      vibe: "Immediate, Intense, Fragmented"
    },
    visualType: 'network',
    examples: [
      { title: "The Odyssey", description: "Begins with Odysseus trapped on an island, long after the Trojan War has ended." },
      { title: "Pulp Fiction", description: "Starts with a diner robbery that is only resolved at the very end of the film." },
      { title: "Breaking Bad", description: "The pilot begins with Walt in his underwear in the desert, then flashes back to how he got there." }
    ]
  },
  {
    id: 'save-the-cat',
    title: "Save the Cat",
    shortDescription: "A 15-beat blueprint for commercial screenwriting success.",
    fullDescription: "Blake Snyder's famous beat sheet. It includes specific moments like 'The Catalyst,' 'Debate,' 'Break into Two,' 'B Story,' 'All is Lost,' and 'The Finale.' It's designed for maximum emotional resonance and pacing.",
    origin: "Modern / Blake Snyder",
    keyTraits: {
      protagonist: "Flawed but Likable",
      structure: "15-Beat Blueprint",
      goal: "Transformation",
      vibe: "Commercial, Paced, Emotional"
    },
    visualType: 'circle',
    examples: [
      { title: "Legally Blonde", description: "A perfect example of the 15-beat structure in a commercial comedy." },
      { title: "How to Train Your Dragon", description: "Follows the beats precisely to create a satisfying emotional arc." },
      { title: "The Matrix", description: "A sci-fi epic that hits every beat of the Snyder blueprint." }
    ]
  }
];
