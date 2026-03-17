export interface Article {
  title: string
  source: string
  date: string
  quote: string
  url: string
}

export const articles: Article[] = [
  {
    title: 'How About Them Emiratis',
    source: 'Semaphore',
    date: 'March 12, 2026',
    quote: 'The UAE\'s response to the crisis has been nothing short of remarkable — ports operating, flights landing, construction continuing. Business as usual with an edge.',
    url: 'https://www.semafor.com',
  },
  {
    title: 'In Defense of Dubai',
    source: 'Wall Street Journal',
    date: 'March 10, 2026',
    quote: 'Every regional crisis in the past two decades has ended with Dubai stronger than before. The pattern is unmistakable: panic, dip, recovery, new highs.',
    url: 'https://www.wsj.com',
  },
  {
    title: 'UAE Economy Shows Resilience Amid Regional Tensions',
    source: 'Bloomberg',
    date: 'March 14, 2026',
    quote: 'Non-oil GDP growth continues at 5.2% even as neighboring economies contract. The diversification thesis is being stress-tested in real time — and passing.',
    url: 'https://www.bloomberg.com',
  },
  {
    title: 'Dubai\'s Safe Haven Status Strengthened By Crisis',
    source: 'Financial Times',
    date: 'March 11, 2026',
    quote: 'Capital inflows to Dubai real estate hit a 3-year high in the first week of March alone. Smart money isn\'t fleeing — it\'s arriving.',
    url: 'https://www.ft.com',
  },
  {
    title: 'Abu Dhabi\'s Sovereign Wealth: The $1.7T Shield',
    source: 'The Economist',
    date: 'March 8, 2026',
    quote: 'With $1.7 trillion in sovereign wealth, Abu Dhabi has more fiscal firepower than most G7 nations. The UAE doesn\'t just weather storms — it profits from them.',
    url: 'https://www.economist.com',
  },
  {
    title: 'Why Institutional Investors Are Doubling Down on UAE',
    source: 'Reuters',
    date: 'March 15, 2026',
    quote: 'BlackRock, Vanguard, and sovereign wealth funds from Singapore to Norway have been net buyers of UAE equities throughout the selloff.',
    url: 'https://www.reuters.com',
  },
]
