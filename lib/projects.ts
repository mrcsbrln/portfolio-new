export type Project = {
  name: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
  image: string;
};

export const projects: Project[] = [
  {
    name: "E-Commerce",
    description:
      "Fullstack E-commerce application built with NextJS, Typescript and Prisma ORM.",
    tags: ["Next.js", "TypeScript", "Prisma"],
    github: "https://github.com/mrcsbrln/next-ecommerce",
    live: "https://next-ecommerce-three-weld.vercel.app/",
    image: "/images/projects/ecommerce.png",
  },
  {
    name: "CoinPulse",
    description:
      "A cryptocurrency dashboard built with NextJS, Typescript, Tradingview, Shadcn UI and coingecko demo API.",
    tags: ["Next.js", "TypeScript"],
    github: "https://github.com/mrcsbrln/coinpulse",
    live: "https://coinpulse-lime.vercel.app/",
    image: "/images/projects/coinpulse.png",
  },
  {
    name: "DA Bubble",
    description:
      "A Slack Clone for team communication and collaboration with its intuitive interface, real-time messaging, and robust channel organization.",
    tags: ["Angular", "TypeScript", "Firebase"],
    github: "https://github.com/DanieleDona1/DABubble",
    live: "https://dabubble.marcus-hartmann.net/",
    image: "/images/projects/da-bubble.png",
  },
  {
    name: "Join",
    description:
      "Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.",
    tags: ["JavaScript", "HTML", "CSS", "Firebase"],
    github: "https://github.com/KevinPerret/Join",
    live: "https://join.marcus-hartmann.net/",
    image: "/images/projects/join.png",
  },
  {
    name: "El Pollo Loco",
    description:
      "Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.",
    tags: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/mrcsbrln/el_pollo_loco",
    live: "https://elpolloloco.marcus-hartmann.net/",
    image: "/images/projects/el-pollo-loco.png",
  },
  {
    name: "NgMovie",
    description:
      "An Angular-based webpage that retrieves movie data via The Movie Database (TMDB) API.",
    tags: ["Angular", "TypeScript", "REST API"],
    github: "https://github.com/mrcsbrln/ng-movie",
    live: "https://ngmovie.marcus-hartmann.net/",
    image: "/images/projects/ngmovie.png",
  },
];
