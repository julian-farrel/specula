"use client"

import { markets, mockComments } from "@/lib/data"
import { TopNav } from "@/components/top-nav"
import { MarketChart } from "@/components/market-chart"
import { TradePanel } from "@/components/trade-panel"
import { OrderBook } from "@/components/order-book"
import { CommentSection } from "@/components/comment-section"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Info, Share2, ExternalLink, Users, Droplets } from "lucide-react"
import { useMemo } from "react"

function getTimeRemaining(endDate?: string) {
    if (!endDate) return null
    const end = new Date(endDate).getTime()
    const now = Date.now()
    const diff = end - now
    if (diff <= 0) return "Ended"
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days > 30) return `${Math.floor(days / 30)}mo ${days % 30}d`
    return `${days}d remaining`
}

export default function MarketPage({ params }: { params: { id: string } }) {
    const marketId = params.id
    const market = markets.find(m => m.id === marketId)

    const relatedMarkets = useMemo(() => {
        if (!market) return []
        return markets
            .filter(m => m.id !== market.id && m.category === market.category)
            .slice(0, 3)
    }, [market])

    if (!market) {
        return (
            <main className="min-h-screen">
                <TopNav />
                <div className="flex h-[50vh] items-center justify-center">Market not found</div>
            </main>
        )
    }

    const yesOutcome = market.outcomes.find(o => o.type === "yes")!
    const noOutcome = market.outcomes.find(o => o.type === "no")!
    const timeRemaining = getTimeRemaining(market.endDate)

    return (
        <main className="min-h-screen bg-background pb-12">
            <TopNav />
            <div className="mx-auto w-full max-w-7xl px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Chart and Info */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="flex items-start gap-4">
                            {market.icon ? (
                                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg ring-1 ring-border">
                                <Image
                                    src={market.icon}
                                    alt=""
                                    width={48}
                                    height={48}
                                    className="h-full w-full object-cover"
                                    unoptimized
                                />
                                </div>
                            ) : (
                                <div className="h-12 w-12 rounded-lg bg-primary/15 ring-1 ring-border" aria-hidden />
                            )}
                            <div className="space-y-1 flex-1">
                                <div className="flex items-start justify-between gap-4">
                                    <h1 className="text-2xl font-bold leading-tight">{market.title}</h1>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="shrink-0 h-9 w-9 border-border/60"
                                        onClick={() => navigator.clipboard.writeText(window.location.href)}
                                    >
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    {market.category && <Badge variant="secondary" className="bg-secondary">{market.category}</Badge>}
                                    <Badge
                                        variant="outline"
                                        className={`text-[10px] ${market.status === "open"
                                            ? "text-[var(--positive)] border-[var(--positive)]/30"
                                            : market.status === "resolved"
                                                ? "text-primary border-primary/30"
                                                : "text-muted-foreground border-border/60"
                                            }`}
                                    >
                                        {market.status.toUpperCase()}
                                    </Badge>
                                    {timeRemaining && (
                                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> {timeRemaining}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Price and stats */}
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="text-4xl font-bold text-[var(--positive)]">
                                {market.leading}% <span className="text-lg font-normal text-muted-foreground">Yes</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <Droplets className="h-4 w-4" />
                                    <span className="tabular-nums">${market.liquidity.toLocaleString()}</span>
                                    <span>liquidity</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Users className="h-4 w-4" />
                                    <span className="tabular-nums">${market.volumeUsd.toLocaleString()}</span>
                                    <span>volume</span>
                                </div>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="rounded-xl border border-border/60 bg-card p-4 overflow-hidden">
                            <MarketChart currentProb={market.leading} />
                        </div>

                        {/* Market Rules */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Info className="h-4 w-4" /> Market Rules
                            </h3>
                            <div className="prose prose-sm prose-invert max-w-none text-muted-foreground bg-secondary/30 p-4 rounded-lg">
                                <p>{market.description}</p>
                                {market.rules && (
                                    <>
                                        <h4 className="text-foreground font-medium mt-4 mb-2">Resolution Source</h4>
                                        <p>{market.rules}</p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Comments */}
                        <CommentSection comments={mockComments} />
                    </div>

                    {/* Right Column: Trade Panel + Order Book + Related */}
                    <div className="lg:col-span-4 space-y-6">
                        <TradePanel
                            yesPrice={yesOutcome.pct}
                            noPrice={noOutcome.pct}
                            marketId={market.id}
                            marketTitle={market.title}
                        />

                        <OrderBook yesPrice={yesOutcome.pct} />

                        {/* Related Markets */}
                        {relatedMarkets.length > 0 && (
                            <div className="rounded-lg border border-border/60 bg-card p-4 space-y-3">
                                <h3 className="text-sm font-medium text-muted-foreground">Related Markets</h3>
                                <div className="space-y-2">
                                    {relatedMarkets.map((rm) => (
                                        <Link
                                            key={rm.id}
                                            href={`/markets/${rm.id}`}
                                            className="block rounded-lg p-3 bg-secondary/50 hover:bg-secondary transition-colors group"
                                        >
                                            <div className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                                                {rm.title}
                                            </div>
                                            <div className="flex items-center justify-between mt-1.5">
                                                <span className="text-xs text-[var(--positive)] font-medium">{rm.leading}% Yes</span>
                                                <span className="text-xs text-muted-foreground tabular-nums">${rm.volumeUsd.toLocaleString()}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    )
}
