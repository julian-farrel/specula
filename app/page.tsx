import { TopNav } from "@/components/top-nav"
import { SubFilterBar } from "@/components/sub-filter-bar"
import { MarketCard, type Market } from "@/components/market-card"

const markets: Market[] = [
  {
    id: "1",
    title: "US government shutdown in 2025?",
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
    leading: 41,
    outcomes: [
      { name: "Yes", pct: 41, type: "yes" },
      { name: "No", pct: 59, type: "no" },
    ],
    volumeUsd: 985432,
  },
  {
    id: "3",
    title: "Will Team USA win the next World Cup?",
    leading: 28,
    outcomes: [
      { name: "Yes", pct: 28, type: "yes" },
      { name: "No", pct: 72, type: "no" },
    ],
    volumeUsd: 452199,
  },
  {
    id: "4",
    title: "Trump elected President in 2024?",
    leading: 55,
    outcomes: [
      { name: "Yes", pct: 55, type: "yes" },
      { name: "No", pct: 45, type: "no" },
    ],
    volumeUsd: 2234501,
  },
  {
    id: "5",
    title: "ETH hits new ATH in 2025?",
    leading: 64,
    outcomes: [
      { name: "Yes", pct: 64, type: "yes" },
      { name: "No", pct: 36, type: "no" },
    ],
    volumeUsd: 734221,
  },
  {
    id: "6",
    title: "Will there be a government shutdown in 2026?",
    leading: 33,
    outcomes: [
      { name: "Yes", pct: 33, type: "yes" },
      { name: "No", pct: 67, type: "no" },
    ],
    volumeUsd: 321553,
  },
  {
    id: "7",
    title: "S&P 500 above 6000 by end of year?",
    leading: 47,
    outcomes: [
      { name: "Yes", pct: 47, type: "yes" },
      { name: "No", pct: 53, type: "no" },
    ],
    volumeUsd: 1100532,
  },
  {
    id: "8",
    title: "US Recession before 2026?",
    leading: 38,
    outcomes: [
      { name: "Yes", pct: 38, type: "yes" },
      { name: "No", pct: 62, type: "no" },
    ],
    volumeUsd: 845123,
  },
  {
    id: "9",
    title: "Fed cuts rates twice in 2025?",
    leading: 52,
    outcomes: [
      { name: "Yes", pct: 52, type: "yes" },
      { name: "No", pct: 48, type: "no" },
    ],
    volumeUsd: 654321,
  },
  {
    id: "10",
    title: "Apple releases a foldable iPhone in 2025?",
    leading: 23,
    outcomes: [
      { name: "Yes", pct: 23, type: "yes" },
      { name: "No", pct: 77, type: "no" },
    ],
    volumeUsd: 312045,
  },
  {
    id: "11",
    title: "ETH ETFs approved in EU by 2025?",
    leading: 58,
    outcomes: [
      { name: "Yes", pct: 58, type: "yes" },
      { name: "No", pct: 42, type: "no" },
    ],
    volumeUsd: 489221,
  },
  {
    id: "12",
    title: "Bitcoin dominance above 60% in 2025?",
    leading: 35,
    outcomes: [
      { name: "Yes", pct: 35, type: "yes" },
      { name: "No", pct: 65, type: "no" },
    ],
    volumeUsd: 201778,
  },
  {
    id: "13",
    title: "Lakers reach the NBA Finals in 2026?",
    leading: 29,
    outcomes: [
      { name: "Yes", pct: 29, type: "yes" },
      { name: "No", pct: 71, type: "no" },
    ],
    volumeUsd: 442190,
  },
  {
    id: "14",
    title: "US unemployment above 6% in 2025?",
    leading: 18,
    outcomes: [
      { name: "Yes", pct: 18, type: "yes" },
      { name: "No", pct: 82, type: "no" },
    ],
    volumeUsd: 182445,
  },
  {
    id: "15",
    title: "OpenAI releases GPT-6 in 2025?",
    leading: 44,
    outcomes: [
      { name: "Yes", pct: 44, type: "yes" },
      { name: "No", pct: 56, type: "no" },
    ],
    volumeUsd: 998765,
  },
  {
    id: "16",
    title: "US inflation below 2% by Q4 2025?",
    leading: 31,
    outcomes: [
      { name: "Yes", pct: 31, type: "yes" },
      { name: "No", pct: 69, type: "no" },
    ],
    volumeUsd: 351220,
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
