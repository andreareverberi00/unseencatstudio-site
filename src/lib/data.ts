export const siteConfig = {
  studioName: "Unseen Cat Studio",
  tagline: "Crafting nightmares you can't look away from.",
  location: "Italy",
  email: "contact@unseencatstudio.com",
  socials: {
    twitter: "https://twitter.com/unseencatstudio",
    instagram: "https://instagram.com/unseencatstudio",
    steam: "https://store.steampowered.com/developer/unseencatstudio",
  },
};

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface MediaItem {
  type: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
}

export interface MainGame {
  title: string;
  subtitle: string;
  description: string;
  steamUrl: string;
  steamWidgetId: string;
  ctaText: string;
  thumbnailImage: ImageAsset;
  media: MediaItem[];
}

export const mainGame: MainGame = {
  title: "Bedtime Nightmare",
  subtitle: "Complete nightly tasks and keep the lights alive. Survive what lurks in the dark.",
  description:
    "You wake up in the middle of the night: the room is too dark, but the mess won't let you sleep. The lights keep you safe, the darkness does not… and you're not sure you're alone. Finish your task… before something finishes you.",
  steamUrl: "https://store.steampowered.com/app/3979840/Bedtime_Nightmare/",
  steamWidgetId: "3979840",
  ctaText: "Wishlist on Steam",
  thumbnailImage: {
    src: "/media/placeholders/current-media.svg",
    alt: "Bedtime Nightmare thumbnail",
  },
  media: [
    {
      type: "image",
      src: "/media/placeholders/current-media.svg",
      alt: "Bedroom scene with flashlight and night ambience",
    },
    {
      type: "image",
      src: "/media/placeholders/project-shot.svg",
      alt: "Player objective UI with dark room background",
    },
  ],
};

export interface ProjectSection {
  title: string;
  content: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  color: string;
  thumbnailImage: ImageAsset;
  media: MediaItem[];
  date: string;
  duration: string;
  engine: string;
  context: string;
  overview: string;
  sections: ProjectSection[];
  playUrl: string;
  playLabel: string;
}

export const projects: Project[] = [
  {
    id: "turbo-trash",
    title: "Turbo Trash",
    tagline: "Sort. Fling. Save the planet.",
    color: "#2ecc71",
    thumbnailImage: {
      src: "/media/placeholders/project-thumb.svg",
      alt: "Turbo Trash gameplay thumbnail",
    },
    media: [
      {
        type: "image",
        src: "/media/placeholders/project-shot.svg",
        alt: "Turbo Trash conveyor belt sorting gameplay",
      },
      {
        type: "image",
        src: "/media/placeholders/project-shot.svg",
        alt: "Turbo Trash perk selection screen",
      },
    ],
    date: "June 2024",
    duration: "3 months",
    engine: "Unity",
    context: "First collaborative project made during Digital Bros Game Academy.",
    overview:
      "Turbo Trash is a mobile hyper-casual game aimed at teaching waste management with an eco-conscious twist. You play as a sorting robot using 'TecLev' levitation technology to grab and fling various objects into the correct bins: glass, paper, plastic, organic, and metals/e-waste.",
    sections: [
      {
        title: "Gameplay",
        content:
          "The game has a strict yet friendly boss (a voice on the speaker) encouraging you to do your best, rewarding accuracy, and penalizing mistakes by draining your energy. Objects roll down an increasingly fast conveyor belt, with overtime periods intensifying the pace. You can also unlock perks and different antennas to tweak gameplay and adapt to challenges. The ultimate goal? To become 'employee of the month' and beat high scores on the leaderboard.",
      },
      {
        title: "Visual Style",
        content:
          "A mix of futuristic tech and cartoonish style, with a 'clean industrial' look — despite being set in a waste collection center.",
      },
    ],
    playUrl:
      "https://play.unity.com/en/games/d76a7f3f-b0ab-4ead-97ba-a5064f6c3b3e/turbo-trash",
    playLabel: "Play on Unity Play",
  },
  {
    id: "space-pizza",
    title: "Space Pizza",
    tagline: "Delivering pizza across the galaxy, one slice at a time.",
    color: "#e67e22",
    thumbnailImage: {
      src: "/media/placeholders/project-thumb.svg",
      alt: "Space Pizza gameplay thumbnail",
    },
    media: [
      {
        type: "image",
        src: "/media/placeholders/project-shot.svg",
        alt: "Space Pizza customer order screen",
      },
      {
        type: "image",
        src: "/media/placeholders/project-shot.svg",
        alt: "Space Pizza kitchen management gameplay",
      },
    ],
    date: "February 2025",
    duration: "10 days (Game Jam)",
    engine: "Unity",
    context: "Made for the Pizza Game Jam, February 2025.",
    overview:
      "Space Pizza is a pixel art time management game set in a vibrant cyberpunk world. Players assume the role of an astronaut who, after a space accident, finds themselves stranded on a distant planet. To earn the money needed to repair their spaceship, they take a job at a bustling space diner, preparing and delivering pizzas to quirky alien customers.",
    sections: [
      {
        title: "Gameplay",
        content:
          "The game revolves around a daily work cycle where players receive orders and prepare pizzas based on customer requests. Customers make specific pizza requests with a timer for delivery — failure to deliver on time results in losing money. Players gather ingredients from a limited pool, requiring strategic management to avoid discarding essential items. Customer feedback affects earnings, where reviews can lead to penalties or bonuses based on performance.",
      },
      {
        title: "Ingredients",
        content:
          "Players manage two categories of ingredients. Good ones: Tomato, Mozzarella, Olives, Basil, Salami. Bad ones: Alien Tentacle, Gear, Slime, Cyborg Eye, Space Insect.",
      },
      {
        title: "Narrative",
        content:
          "The story unfolds as players navigate the life of an astronaut facing challenges in an alien world. The narrative is enriched by dialogue presented in a graphic novel style, enhancing the overall experience and connection to the characters.",
      },
      {
        title: "Visual Style",
        content:
          "Charming pixel art graphics immerse players in a vivid cyberpunk space environment. The user interface draws inspiration from management simulators, offering a sleek design that complements the gameplay.",
      },
    ],
    playUrl: "https://diegogu.itch.io/space-pizza",
    playLabel: "Play on itch.io",
  },
  {
    id: "ankle-breaker",
    title: "Ankle Breaker",
    tagline: "Slide. Cheat. Survive the referee.",
    color: "#3498db",
    thumbnailImage: {
      src: "/media/placeholders/project-thumb.svg",
      alt: "Ankle Breaker gameplay thumbnail",
    },
    media: [
      {
        type: "image",
        src: "/media/placeholders/project-shot.svg",
        alt: "Ankle Breaker slide tackle action scene",
      },
      {
        type: "image",
        src: "/media/placeholders/project-shot.svg",
        alt: "Ankle Breaker referee vision cone challenge",
      },
    ],
    date: "January 2026",
    duration: "Jam submission (ScoreJam #37)",
    engine: "Unity",
    context: "Submission to ScoreJam #37.",
    overview:
      "Ankle Breaker is a fast-paced arcade game where winning isn't about scoring goals — it's about getting away with fouls. Slide-tackle opponents, build streaks, and rack up points… but don't get caught by the referee, whose vision and awareness increase over time. Every foul is a risk. Every power-up changes the rules. How long can you keep cheating before justice gets you?",
    sections: [
      {
        title: "Gameplay",
        content:
          "Slide into opponents to score points. Chain successful fouls to increase your multiplier. Avoid the referee's cone of vision. Survive as long as possible. Choose power-ups that buff you or mess with NPCs and the referee. The referee gets stronger over time — you need to get smarter.",
      },
      {
        title: "Power-Ups",
        content:
          "Every 100 points, the game pauses and lets you choose a power-up: Big Boys Club (make NPCs bigger), Heavy Legs (reduce NPCs speed), Sugar Rush (increase player speed), Tunnel Vision (decrease referee cone angle), Short-Sighted Ref (decrease referee cone length), Slippery Business (decrease player tackle cooldown). Choose wisely — the difficulty keeps ramping up.",
      },
      {
        title: "Features",
        content:
          "Fast arcade gameplay. Score-based progression. Power-up choices mid-run. Increasing difficulty over time. Global leaderboard — compete for the highest score and prove you're the best professional fouler out there.",
      },
    ],
    playUrl: "https://diegogu.itch.io/ankle-breaker",
    playLabel: "Play on itch.io",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  avatarImage?: ImageAsset;
}

export const team: TeamMember[] = [
  {
    name: "Andrea Reverberi",
    role: "Game Designer",
    bio: "The one who decides how the game should feel — and then makes sure it actually does. Obsessed with player experience and the little details that make you say 'wait, that was intentional?'",
    initials: "AR",
    avatarImage: {
      src: "/media/placeholders/team-avatar.svg",
      alt: "Andrea Reverberi portrait",
    },
  },
  {
    name: "Diego Gurrieri",
    role: "Game Programmer",
    bio: "Turns ideas into playable things. If it moves, breaks, or somehow works against all odds — he probably wrote the code behind it.",
    initials: "DG",
    avatarImage: {
      src: "/media/placeholders/team-avatar.svg",
      alt: "Diego Gurrieri portrait",
    },
  },
  {
    name: "Alessandro Sirio Ceresa",
    role: "Social Media Manager & 2D Artist",
    bio: "Draws the worlds you explore and makes sure people actually hear about them. The bridge between pixels on screen and posts on your feed.",
    initials: "AS",
    avatarImage: {
      src: "/media/placeholders/team-avatar.svg",
      alt: "Alessandro Sirio Ceresa portrait",
    },
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Bedtime Nightmare", href: "#current-project" },
  { label: "Games", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
