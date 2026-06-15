"use client"

import { TopNav } from "@/components/top-nav"
import { SubFilterBar } from "@/components/sub-filter-bar"
import { MarketCard } from "@/components/market-card"
import { markets } from "@/lib/data"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"
import { TrendingUp, Users, BarChart3, Zap } from "lucide-react"

export default function HomePage() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const query = searchParams.get("q")?.toLowerCase()
  const sort = searchParams.get("sort") || "volume"

  const filtered = useMemo(() => {
    let result = [...markets]

    // Category filter
    if (category && category !== "All" && category !== "Trending" && category !== "New") {
      result = result.filter((m) => m.category === category)
    }

    // Search query
    if (query) {
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(query) ||
          m.category?.toLowerCase().includes(query) ||
          m.description?.toLowerCase().includes(query)
      )
    }

    // Sort
    switch (sort) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "probability":
        result.sort((a, b) => b.leading - a.leading)
        break
      case "ending-soon":
        result.sort((a, b) => new Date(a.endDate || "9999").getTime() - new Date(b.endDate || "9999").getTime())
        break
      case "volume":
      default:
        result.sort((a, b) => b.volumeUsd - a.volumeUsd)
        break
    }

    // For "Trending", sort by volume desc; for "New", by createdAt desc
    if (category === "Trending") {
      result.sort((a, b) => b.volumeUsd - a.volumeUsd)
    } else if (category === "New") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return result
  }, [category, query, sort])

  const totalVolume = markets.reduce((sum, m) => sum + m.volumeUsd, 0)
  const totalLiquidity = markets.reduce((sum, m) => sum + m.liquidity, 0)

  return (
    <main className="min-h-dvh">
      <TopNav />
      <SubFilterBar />

      {/* Hero Stats Banner */}
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 rounded-xl bg-card/50 border border-border/40 p-4">
              <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Total Volume</div>
                <div className="text-lg font-bold tabular-nums">${(totalVolume / 1e6).toFixed(1)}M</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-card/50 border border-border/40 p-4">
              <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Active Markets</div>
                <div className="text-lg font-bold tabular-nums">{markets.filter(m => m.status === "open").length}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-card/50 border border-border/40 p-4">
              <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Liquidity</div>
                <div className="text-lg font-bold tabular-nums">${(totalLiquidity / 1e6).toFixed(1)}M</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-card/50 border border-border/40 p-4">
              <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Traders</div>
                <div className="text-lg font-bold tabular-nums">12.4K</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Markets" className="mx-auto w-full max-w-7xl px-4 py-6">
        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted-foreground">
            {filtered.length} market{filtered.length !== 1 ? "s" : ""}
            {query && <span> matching &quot;{query}&quot;</span>}
            {category && category !== "All" && <span> in {category}</span>}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <BarChart3 className="h-8 w-8 text-muted-foreground/40" />
            </div>
            <p className="text-muted-foreground font-medium">No markets found</p>
            <p className="text-sm text-muted-foreground/60 mt-1">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((m) => (
              <MarketCard key={m.id} market={m} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}