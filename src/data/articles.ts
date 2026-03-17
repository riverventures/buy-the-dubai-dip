export interface Article {
  title: string
  source: string
  date: string
  quote: string
  url: string
  thumbnail: string
}

export const articles: Article[] = [
  {
    title: 'How About Them Emiratis',
    source: 'Semafor',
    date: 'March 16, 2026',
    quote: "Iran's attacks aim to shake confidence, but the Emirati model was built for moments like this.",
    url: 'https://www.semafor.com/article/03/16/2026/how-about-them-emiratis',
    thumbnail: '/thumbnails/semafor.jpg',
  },
  {
    title: "UAE's Pandemic Response a Good Test Case for Current Crisis",
    source: 'Semafor',
    date: 'March 2, 2026',
    quote: 'The flow of goods into the Emirates was expected to continue, and disruptions and safety risks have remained localized.',
    url: 'https://www.semafor.com/article/03/02/2026/uaes-pandemic-response-a-good-test-case-for-current-crisis-executive-says',
    thumbnail: '/thumbnails/semafor-pandemic.jpg',
  },
  {
    title: "How Dubai's Safe-Haven Status Is Being Put to the Test",
    source: 'Reuters',
    date: 'March 2, 2026',
    quote: "Each succession was built on the same promise: a stable, open alternative to wherever the region's last crisis struck.",
    url: 'https://www.reuters.com/world/middle-east/how-dubais-safe-haven-status-is-being-put-test-2026-03-02/',
    thumbnail: '/thumbnails/reuters.jpg',
  },
  {
    title: "Iran 'Cannot Be Allowed to Hold Global Economy Hostage'",
    source: 'Euronews',
    date: 'March 16, 2026',
    quote: 'The country has invested heavily in economic resilience, logistics networks and supply chain security.',
    url: 'https://www.euronews.com/my-europe/2026/03/16/iran-must-not-be-allowed-to-hold-global-economy-hostage-uae-minister-tells-euronews',
    thumbnail: '/thumbnails/euronews.jpg',
  },
  {
    title: 'UAE Economy Shows Resilience Despite War Risks',
    source: 'Khaleej Times',
    date: 'March 10, 2026',
    quote: 'Government liquid assets, including sovereign wealth funds, are estimated to exceed 210% of GDP, providing a powerful cushion.',
    url: 'https://www.khaleejtimes.com/business/economy/uae-economy-shows-resilience-despite-war-risks-agency-says',
    thumbnail: '/thumbnails/khaleejtimes.jpg',
  },
  {
    title: "S&P: Financial Resilience Strengthens Abu Dhabi Against Risk",
    source: 'Voice of Emirates',
    date: 'March 10, 2026',
    quote: "The government's net asset position, estimated at about 358% of GDP in 2026, provides significant protection against external shocks.",
    url: 'https://www.voiceofemirates.com/en/business/2026/03/10/standard-poors-financial-and-economic-resilience-strengthens-abu-dhabis-resilience-in-the-face-of-risk/',
    thumbnail: '/thumbnails/voiceofemirates.jpg',
  },
]
