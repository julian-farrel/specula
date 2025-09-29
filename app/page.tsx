import { TopNav } from "@/components/top-nav"
import { SubFilterBar } from "@/components/sub-filter-bar"
import { MarketCard, type Market } from "@/components/market-card"

// I've added the `icon` property to each market object below.
// These paths point to images you would place in your /public/icons/ folder.
const markets: Market[] = [
  {
    id: "1",
    title: "US government shutdown in 2025?",
    icon: "/icons/politics.svg", // <-- ADDED
    leading: 62,
    outcomes: [
      { name: "Yes", pct: 62, type: "yes" },
      { name: "No", pct: 38, type: "no" },
    ],
    volumeUsd: 1245032,
  },
  {
    id: "2",
    title: "BTC above $100k by Dec 31, 2025?",
    icon: "/icons/btc.svg", // <-- ADDED
    leading: 41,
    outcomes: [
      { name: "Yes", pct: 41, type: "yes" },
      { name: "No", pct: 59, type: "no" },
    ],
    volumeUsd: 985432,
  },
  {
    id: "3",
    title: "ETH above $50k by Dec 31, 2025?",
    icon: "/icons/btc.svg", // <-- ADDED
    leading: 80,
    outcomes: [
      { name: "Yes", pct: 80, type: "yes" },
      { name: "No", pct: 20, type: "no" },
    ],
    volumeUsd: 521314,
  },
  {
    id: "4",
    title: "Will Team USA win the next World Cup?",
    icon: "/icons/btc.svg", // <-- ADDED
    leading: 55,
    outcomes: [
      { name: "Yes", pct: 55, type: "yes" },
      { name: "No", pct: 45, type: "no" },
    ],
    volumeUsd: 2234501,
  },
  {
    id: "5",
    title: "US Recession before 2026?",
    icon: "/icons/btc.svg", // <-- ADDED
    leading: 38,
    outcomes: [
      { name: "Yes", pct: 38, type: "yes" },
      { name: "No", pct: 62, type: "no" },
    ],
    volumeUsd: 845123,
  },
  {
    id: "6",
    title: "S&P 500 above 6000 by end of year?",
    icon: "/icons/btc.svg", // <-- ADDED
    leading: 47,
    outcomes: [
      { name: "Yes", pct: 47, type: "yes" },
      { name: "No", pct: 53, type: "no" },
    ],
    volumeUsd: 1100532,
  },
  {
    id: "7",
    title: "Indonesia go into recession in 2026?",
    icon: "/icons/btc.svg", // <-- ADDED
    leading: 50,
    outcomes: [
      { name: "Yes", pct: 50, type: "yes" },
      { name: "No", pct: 50, type: "no" },
    ],
    volumeUsd: 3218471,
  },
  {
    id: "8",
    title: "Fed cuts rates twice in 2025?",
    icon: "/icons/btc.svg", // <-- ADDED
    leading: 90,
    outcomes: [
      { name: "Yes", pct: 90, type: "yes" },
      { name: "No", pct: 10, type: "no" },
    ],
    volumeUsd: 371411,
  },
  {
    id: "9",
    title: "Bitcoin dominance above 60% in 2025?",
    icon: "/icons/btc.svg", // <-- ADDED
    leading: 30,
    outcomes: [
      { name: "Yes", pct: 70, type: "yes" },
      { name: "No", pct: 30, type: "no" },
    ],
    volumeUsd: 313313,
  },
  {
    id: "10",
    title: "Apple releases a foldable iPhone in 2025?",
    icon: "/icons/btc.svg", // <-- ADDED
    leading: 10,
    outcomes: [
      { name: "Yes", pct: 90, type: "yes" },
      { name: "No", pct: 10, type: "no" },
    ],
    volumeUsd: 531234,
  },
  {
    id: "11",
    title: "US unemployment above 6% in 2025?",
    icon: "/icons/btc.svg", // <-- ADDED
    leading: 31,
    outcomes: [
      { name: "Yes", pct: 31, type: "yes" },
      { name: "No", pct: 69, type: "no" },
    ],
    volumeUsd: 95352,
  },
  {
    id: "12",
    title: "Lakers reach the NBA Finals in 2026?",
    icon: "/icons/btc.svg", // <-- ADDED
    leading: 32,
    outcomes: [
      { name: "Yes", pct: 32, type: "yes" },
      { name: "No", pct: 68, type: "no" },
    ],
    volumeUsd: 312119,
  },
]

export default function HomePage() {
  return (
    <main className="min-h-dvh">
      <TopNav />
      <SubFilterBar />

      <section aria-label="Markets" className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {markets.map((m) => (
            <MarketCard key={m.id} market={m} />
          ))}
        </div>
      </section>
    </main>
  )
}