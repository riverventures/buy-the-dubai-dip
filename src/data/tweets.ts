export interface Tweet {
  author: string
  handle: string
  avatar: string
  text: string
  url: string
  date: string
  likes: number
  retweets: number
  replies: number
  image?: string
}

export const tweets: Tweet[] = [
  {
    author: 'Pluto',
    handle: '@Pluto_0x',
    avatar: 'https://pbs.twimg.com/profile_images/2006731112043974656/J3VK_pna_400x400.jpg',
    text: "I think over the next 12 months there may be a once in a lifetime opportunity to buy UAE equities\n\nThe kind of setup where even if you go all in, you still feel underexposed.\n\nThis is roughly my plan:\n\nPhase 1 — Start slowly accumulating the more defensive, resilient names over the next 6 to 8 months: Salik, Dewa, Adnoc Gas + Drilling, Fab, Taqa, Adib\n\nPhase 2 — Dubai is far more exposed than Abu Dhabi to tourism, real estate, discretionary spending, and foreign sentiment. That means it will likely take longer to find a bottom. But it will also offer the best opportunities once the market fully prices the damage: Emaar Properties + Development, Emirates NBD\n\nIf you have lived in UAE, you know for a fact that they will bounce back, is not a matter of \"if\" but only a matter of \"when\"",
    url: 'https://x.com/Pluto_0x/status/2033510524416053415',
    date: 'Mar 16, 2026',
    likes: 912,
    retweets: 64,
    replies: 61,
  },
  {
    author: 'Jeremy',
    handle: '@Jeremybtc',
    avatar: 'https://pbs.twimg.com/profile_images/1971331259952660483/Tc82pxDk_400x400.jpg',
    text: "Buying into Dubai's stock market could be the most generational opportunity of the next decade\n\nMost people won't realize it until it's too late\n\n🇦🇪",
    url: 'https://x.com/Jeremybtc/status/2033834297598349490',
    date: 'Mar 17, 2026',
    likes: 114,
    retweets: 7,
    replies: 69,
  },
  {
    author: 'Alex Scott',
    handle: '@afscott',
    avatar: 'https://pbs.twimg.com/profile_images/2000062958282612736/b_t2xCoV_400x400.jpg',
    text: '"dubai property prices crashing"\nbut we are still above the five year uptrend during which prices have been on an absolute tear',
    url: 'https://x.com/afscott/status/2032821654100091391',
    date: 'Mar 14, 2026',
    likes: 39,
    retweets: 7,
    replies: 16,
    image: 'https://pbs.twimg.com/media/HDYIhOMa8AAUOkX.jpg',
  },
]
