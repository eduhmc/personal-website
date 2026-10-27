// Everything about you that isn't a project or a job lives here.
// Anything wrapped in [brackets] is placeholder text — replace it with the real thing.

export const site = {
  name: 'Eduardo Huerta-Mercado',
  shortName: 'Eduardo',
  title: 'Eduardo Huerta-Mercado — Software engineer, product-minded',
  description:
    'Software engineer at YouTube who cares most about what we build and why. Berkeley EECS, co-founder of a STEM nonprofit in Peru, and product-minded builder.',
  location: 'San Francisco',

  // Hero sentence. Wrap ONE word in *asterisks* to set it in italics.
  intro: "I'm Eduardo, an engineer at YouTube who cares most about *why* we build, not just how.",

  // Quick-facts card next to the hero.
  facts: [
    { label: 'Now', value: 'Software Engineer, YouTube' },
    { label: 'Focus', value: 'Product × engineering' },
    { label: 'Studied', value: 'EECS + Data Science, UC Berkeley' },
    { label: 'Based', value: 'San Francisco · from Lima, Peru' },
  ],

  about: [
    "I write code for a living, but the part I enjoy most comes before the code: figuring out who a feature is for, what problem it actually solves, and how we'll know it worked. At YouTube I work on the main desktop web app, where small product decisions reach a very large number of people.",
    'Before Google, I built on the side of the problem that is less glamorous and more human. I co-founded UTK, a nonprofit that brought makerspaces and STEM programs to more than 150 schools in Peru and Colombia, and I founded INvent at Berkeley to train student instructors for it. That is where I learned product the hard way: talking to users, running on tiny budgets, and cutting scope until something shipped.',
    "I'm looking for roles where engineering and product overlap: product-minded engineering, or product management with a technical edge. I speak English, Spanish and Italian.",
  ],

  // Short "how I think about product" principles shown on the home page.
  // DRAFT: these are a starting point — rewrite them in your own words.
  principles: [
    { title: 'Start from the user, not the spec', body: 'Before writing a line of code I want to know who this is for and what they do today without it.' },
    { title: 'Ship small, measure honestly', body: 'The smallest version that teaches us something beats the perfect version that ships late.' },
    { title: 'Engineers should own the why', body: 'Knowing the reasoning behind a feature makes for better technical tradeoffs, and better pushback.' },
  ],

  now: [
    'Building desktop experiences on the YouTube Main App Web team',
    'Growing toward product: [a PM course, book, or side project you are doing]',
    '[Something personal: a trip, a sport, a goal for this year]',
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
  { label: 'Work', href: '/#work', color: 'var(--pill-blue)' },
  { label: 'Experience', href: '/#experience', color: 'var(--pill-yellow)' },
  { label: 'Lab', href: '/lab', color: 'var(--pill-green)' },
  { label: 'CV', href: '/cv', color: 'var(--pill-pink)' },
];
