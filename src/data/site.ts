// Everything about you that isn't a project or a job lives here.
// Anything wrapped in [brackets] is placeholder text — replace it with the real thing.

export const site = {
  name: 'Eduardo Huerta-Mercado',
  shortName: 'Eduardo',
  title: 'Eduardo Huerta-Mercado — Software engineer, product-minded',
  description:
    'Software engineer at YouTube working on the product side. Berkeley EECS, co-founder of UTK, a STEM nonprofit in Peru and Colombia.',
  location: 'San Francisco',

  // The one-liner at the top of the home page.
  intro: 'I work on product-related stuff at Google.',

  about: [
    "I'm a software engineer at YouTube, on the Main App Web team. I've shipped features like the comment teaser on the watch page, and the part I like most is the product side: figuring out what to build and why.",
    "Before Google I interned at Tableau, was on course staff for Berkeley's intro CS class, and co-founded UTK, a nonprofit that set up STEM labs in 150+ schools in Peru and Colombia.",
    "I studied EECS at Berkeley. I'm from Lima, live in San Francisco, and speak English, Spanish and Italian.",
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
    'English · Spanish · Italian',
  ],

  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/eduardohm/' },
    { label: 'GitHub', href: 'https://github.com/eduhmc' },
  ],
};

export const nav = [
  { label: 'About', href: '/#about', color: 'var(--pill-green)' },
  { label: 'Projects', href: '/#projects', color: 'var(--pill-blue)' },
  { label: 'Experience', href: '/#experience', color: 'var(--pill-yellow)' },
  { label: 'References', href: '/references', color: 'var(--pill-pink)' },
  { label: 'CV', href: '/cv', color: 'var(--paper-2)' },
];
