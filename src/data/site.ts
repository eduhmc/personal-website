// Everything about you that isn't a project or a job lives here.
// Anything wrapped in [brackets] is placeholder text — replace it with the real thing.

export const site = {
  name: 'Eduardo Huerta-Mercado',
  shortName: 'Eduardo',
  title: 'Eduardo Huerta-Mercado — Software engineer, product-minded',
  description:
    'Software engineer at Google working on the product side. Berkeley EECS, co-founder of UTK, a STEM nonprofit in Peru, Colombia and Argentina.',
  location: 'San Francisco',

  // The one-liner at the top of the home page.
  intro: 'I work on product-related stuff at Google.',

  about: [
    "I'm a software engineer at Google, on Core Web Frameworks. Before that I spent two years doing full-stack work on YouTube's main web app, where I shipped features like the comment teaser on the watch page. The part I like most is the product side: figuring out what to build and why.",
    "Before Google I interned at Tableau, was on course staff for Berkeley's intro CS class, and co-founded UTK, a nonprofit that set up STEM labs in 150+ schools in Peru, Colombia and Argentina.",
    "I studied EECS with a minor in Data Science at Berkeley. I was born and raised in Lima, Peru, live in San Francisco, and speak Spanish, English and Italian. Outside work I play soccer, tennis and pretty much any racquet sport, and I love music and playing guitar.",
  ],

  education: [
    { school: 'University of California, Berkeley', degree: 'B.S. Electrical Engineering & Computer Science · Minor in Data Science', years: '2018 – 2022' },
    { school: 'Stanford University', degree: 'Summer College Academy', years: '2016' },
  ],

  skills: [
    'Product management',
    'User research',
    'Python',
    'Java',
    'TypeScript / React',
    'SQL',
    'Kotlin',
    'C# / C',
    'Swift',
    'Spanish · English · Italian',
  ],

  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/eduardohm/' },
    { label: 'GitHub', href: 'https://github.com/eduhmc' },
  ],
};

// Groups for the experience section, in display order. Each project's `group` field points here.
export const workGroups = [
  { id: 'google', name: 'Google', years: '2022 — now' },
  { id: 'tableau', name: 'Salesforce · Tableau', years: '2021' },
  { id: 'berkeley', name: 'UC Berkeley', years: '2019 — 2022' },
  { id: 'side', name: 'Side projects', years: 'On my own time' },
  { id: 'utk', name: 'UTK · United Technologies for Kids', years: '2016 — 2021' },
] as const;

export const nav = [
  { label: 'About', href: '/#about', color: 'var(--pill-green)' },
  { label: 'Experience', href: '/#experience', color: 'var(--pill-blue)' },
  { label: 'Timeline', href: '/#timeline', color: 'var(--pill-yellow)' },
  { label: 'References', href: '/references', color: 'var(--pill-pink)' },
  { label: 'CV', href: '/cv', color: 'var(--paper-2)' },
];
