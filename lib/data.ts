
export type Outcome = {
  name: string
  pct: number
  type: "yes" | "no" | "other"
}

export type Market = {
  id: string
  title: string
  icon?: string
  leading: number
  outcomes: Outcome[]
  volumeUsd: number
  description?: string
  rules?: string
  endDate?: string
  category?: string
  status: "open" | "closed" | "resolved"
  liquidity: number
  resolvedAt?: string
  createdAt: string
}

export type Comment = {
  id: string
  author: string
  avatar: string
  text: string
  timestamp: string
  likes: number
  replies?: Comment[]
}

export type LeaderboardEntry = {
  rank: number
  name: string
  avatar: string
  pnl: number
  volume: number
  winRate: number
  trades: number
}

export type OrderBookEntry = {
  price: number
  amount: number
  total: number
}

export function generateOrderBook(yesPrice: number): { bids: OrderBookEntry[]; asks: OrderBookEntry[] } {
  const bids: OrderBookEntry[] = []
  const asks: OrderBookEntry[] = []
  let bidTotal = 0
  let askTotal = 0

  for (let i = 0; i < 5; i++) {
    const bidAmt = Math.round(1000 + Math.random() * 15000)
    bidTotal += bidAmt
    bids.push({ price: yesPrice - i, amount: bidAmt, total: bidTotal })

    const askAmt = Math.round(1000 + Math.random() * 15000)
    askTotal += askAmt
    asks.push({ price: (100 - yesPrice) + i + 1, amount: askAmt, total: askTotal })
  }
  return { bids, asks: asks.reverse() }
}

export const mockComments: Comment[] = [
  {
    id: "c1",
    author: "CryptoWhale",
    avatar: "https://avatar.vercel.sh/cryptowhale",
    text: "This market is underpriced. The probability should be much higher based on current macro conditions.",
    timestamp: "2h ago",
    likes: 24,
    replies: [
      {
        id: "c1r1",
        author: "TradingPro",
        avatar: "https://avatar.vercel.sh/tradingpro",
        text: "Agreed, I just loaded up on Yes shares. The smart money is clearly bullish here.",
        timestamp: "1h ago",
        likes: 8,
      },
    ],
  },
  {
    id: "c2",
    author: "DataNerd42",
    avatar: "https://avatar.vercel.sh/datanerd42",
    text: "Looking at historical data, similar events have resolved Yes ~70% of the time. Current pricing seems about right.",
    timestamp: "5h ago",
    likes: 15,
  },
  {
    id: "c3",
    author: "MarketMaker",
    avatar: "https://avatar.vercel.sh/marketmaker",
    text: "Liquidity is thin on the No side. Be careful with large orders, you'll move the price significantly.",
    timestamp: "8h ago",
    likes: 31,
  },
  {
    id: "c4",
    author: "PoliticsGuru",
    avatar: "https://avatar.vercel.sh/politicsguru",
    text: "Just saw some insider news that could shift this market. DYOR but I'm going all in.",
    timestamp: "12h ago",
    likes: 7,
    replies: [
      {
        id: "c4r1",
        author: "SkepticalSam",
        avatar: "https://avatar.vercel.sh/skepticalsam",
        text: "Source? This sounds like hopium without any backing evidence.",
        timestamp: "11h ago",
        likes: 19,
      },
    ],
  },
]

export const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: "AlphaTrader", avatar: "https://avatar.vercel.sh/alphatrader", pnl: 42150, volume: 385000, winRate: 78, trades: 234 },
  { rank: 2, name: "CryptoWhale", avatar: "https://avatar.vercel.sh/cryptowhale", pnl: 38200, volume: 510000, winRate: 72, trades: 412 },
  { rank: 3, name: "PredictorX", avatar: "https://avatar.vercel.sh/predictorx", pnl: 29800, volume: 220000, winRate: 81, trades: 156 },
  { rank: 4, name: "MarketMaven", avatar: "https://avatar.vercel.sh/marketmaven", pnl: 24500, volume: 190000, winRate: 69, trades: 298 },
  { rank: 5, name: "DataNerd42", avatar: "https://avatar.vercel.sh/datanerd42", pnl: 21300, volume: 175000, winRate: 74, trades: 187 },
  { rank: 6, name: "BullishBets", avatar: "https://avatar.vercel.sh/bullishbets", pnl: 18900, volume: 145000, winRate: 66, trades: 321 },
  { rank: 7, name: "RiskTaker99", avatar: "https://avatar.vercel.sh/risktaker99", pnl: 15200, volume: 280000, winRate: 58, trades: 445 },
  { rank: 8, name: "SharpShooter", avatar: "https://avatar.vercel.sh/sharpshooter", pnl: 12800, volume: 95000, winRate: 83, trades: 89 },
  { rank: 9, name: "TrendFollower", avatar: "https://avatar.vercel.sh/trendfollower", pnl: 10500, volume: 120000, winRate: 71, trades: 167 },
  { rank: 10, name: "EventBets", avatar: "https://avatar.vercel.sh/eventbets", pnl: 8900, volume: 85000, winRate: 65, trades: 203 },
]

export const markets: Market[] = [
  {
    id: "1",
    title: "US government shutdown in 2025?",
    category: "Politics",
    icon: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=64&h=64&fit=crop&auto=format",
    leading: 62,
    outcomes: [
      { name: "Yes", pct: 62, type: "yes" },
      { name: "No", pct: 38, type: "no" },
    ],
    volumeUsd: 1245032,
    description: "This market forecasts whether the United States federal government will enter a shutdown in 2025. A shutdown occurs when there is a lapse in annual appropriations implementation.",
    rules: "The market will resolve to 'Yes' if a funding gap results in a partial or full shutdown of federal agencies for at least 24 hours.",
    endDate: "2025-12-31",
    status: "open",
    liquidity: 342000,
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    title: "BTC above $100k by Dec 31, 2025?",
    category: "Crypto",
    icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=040",
    leading: 41,
    outcomes: [
      { name: "Yes", pct: 41, type: "yes" },
      { name: "No", pct: 59, type: "no" },
    ],
    volumeUsd: 985432,
    description: "This market resolves based on the price of Bitcoin (BTC) reaching or exceeding $100,000 USD on any major exchange by the end of 2025.",
    rules: "Market resolves to 'Yes' if the daily close price of BTC exceeds $100,000 on CoinMarketCap.",
    endDate: "2025-12-31",
    status: "open",
    liquidity: 521000,
    createdAt: "2025-02-01",
  },
  {
    id: "3",
    title: "ETH above $50k by Dec 31, 2025?",
    category: "Crypto",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=040",
    leading: 80,
    outcomes: [
      { name: "Yes", pct: 80, type: "yes" },
      { name: "No", pct: 20, type: "no" },
    ],
    volumeUsd: 521314,
    description: "Will Ethereum (ETH) trade above $50,000 before the end of the year?",
    endDate: "2025-12-31",
    status: "open",
    liquidity: 198000,
    createdAt: "2025-03-10",
  },
  {
    id: "4",
    title: "Will Team USA win the next World Cup?",
    category: "Sports",
    icon: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=64&h=64&fit=crop&auto=format",
    leading: 55,
    outcomes: [
      { name: "Yes", pct: 55, type: "yes" },
      { name: "No", pct: 45, type: "no" },
    ],
    volumeUsd: 2234501,
    description: "Prediction on whether Team USA will win the 2026 FIFA World Cup.",
    endDate: "2026-07-19",
    status: "open",
    liquidity: 890000,
    createdAt: "2025-01-05",
  },
  {
    id: "5",
    title: "US Recession before 2026?",
    category: "Economy",
    icon: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=64&h=64&fit=crop&auto=format",
    leading: 38,
    outcomes: [
      { name: "Yes", pct: 38, type: "yes" },
      { name: "No", pct: 62, type: "no" },
    ],
    volumeUsd: 845123,
    description: "Will the NBER declare a recession in the US starting before Jan 1, 2026?",
    endDate: "2025-12-31",
    status: "open",
    liquidity: 275000,
    createdAt: "2025-04-20",
  },
  {
    id: "6",
    title: "S&P 500 above 6000 by end of year?",
    category: "Finance",
    icon: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=64&h=64&fit=crop&auto=format",
    leading: 47,
    outcomes: [
      { name: "Yes", pct: 47, type: "yes" },
      { name: "No", pct: 53, type: "no" },
    ],
    volumeUsd: 1100532,
    endDate: "2025-12-31",
    status: "open",
    liquidity: 410000,
    createdAt: "2025-02-28",
  },
  {
    id: "7",
    title: "Indonesia go into recession in 2026?",
    category: "Economy",
    icon: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=64&h=64&fit=crop&auto=format",
    leading: 50,
    outcomes: [
      { name: "Yes", pct: 50, type: "yes" },
      { name: "No", pct: 50, type: "no" },
    ],
    volumeUsd: 3218471,
    endDate: "2026-12-31",
    status: "open",
    liquidity: 1200000,
    createdAt: "2025-05-01",
  },
  {
    id: "8",
    title: "Fed cuts rates twice in 2025?",
    category: "Economy",
    icon: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=64&h=64&fit=crop&auto=format",
    leading: 90,
    outcomes: [
      { name: "Yes", pct: 90, type: "yes" },
      { name: "No", pct: 10, type: "no" },
    ],
    volumeUsd: 371411,
    endDate: "2025-12-31",
    status: "open",
    liquidity: 89000,
    createdAt: "2025-06-15",
  },
  {
    id: "9",
    title: "Bitcoin dominance above 60% in 2025?",
    category: "Crypto",
    icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=040",
    leading: 30,
    outcomes: [
      { name: "Yes", pct: 70, type: "yes" },
      { name: "No", pct: 30, type: "no" },
    ],
    volumeUsd: 313313,
    endDate: "2025-12-31",
    status: "open",
    liquidity: 102000,
    createdAt: "2025-03-22",
  },
  {
    id: "10",
    title: "Apple releases a foldable iPhone in 2025?",
    category: "Tech",
    icon: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=64&h=64&fit=crop&auto=format",
    leading: 10,
    outcomes: [
      { name: "Yes", pct: 90, type: "yes" },
      { name: "No", pct: 10, type: "no" },
    ],
    volumeUsd: 531234,
    endDate: "2025-12-31",
    status: "open",
    liquidity: 156000,
    createdAt: "2025-04-01",
  },
  {
    id: "11",
    title: "US unemployment above 6% in 2025?",
    category: "Economy",
    icon: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=64&h=64&fit=crop&auto=format",
    leading: 31,
    outcomes: [
      { name: "Yes", pct: 31, type: "yes" },
      { name: "No", pct: 69, type: "no" },
    ],
    volumeUsd: 95352,
    endDate: "2025-12-31",
    status: "open",
    liquidity: 34000,
    createdAt: "2025-05-10",
  },
  {
    id: "12",
    title: "Lakers reach the NBA Finals in 2026?",
    category: "Sports",
    icon: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=64&h=64&fit=crop&auto=format",
    leading: 32,
    outcomes: [
      { name: "Yes", pct: 32, type: "yes" },
      { name: "No", pct: 68, type: "no" },
    ],
    volumeUsd: 312119,
    endDate: "2026-06-01",
    status: "open",
    liquidity: 95000,
    createdAt: "2025-06-01",
  },
]

// All unique categories from markets
export const allCategories = Array.from(new Set(markets.map(m => m.category).filter(Boolean))) as string[]
