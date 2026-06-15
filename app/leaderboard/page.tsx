"use client"

import { TopNav } from "@/components/top-nav"
import { leaderboardData } from "@/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, TrendingUp, BarChart3, Target } from "lucide-react"

export default function LeaderboardPage() {
    return (
        <main className="min-h-screen bg-background pb-12">
            <TopNav />
            <div className="mx-auto w-full max-w-4xl px-4 py-8 space-y-8">

                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/15 mb-2">
                        <Trophy className="h-7 w-7 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold">Leaderboard</h1>
                    <p className="text-muted-foreground">Top traders ranked by profit & loss</p>
                </div>

                {/* Top 3 podium */}
                <div className="grid grid-cols-3 gap-4">
                    {[1, 0, 2].map((idx) => {
                        const entry = leaderboardData[idx]
                        const isFirst = idx === 0
                        return (
                            <div
                                key={entry.rank}
                                className={`flex flex-col items-center rounded-xl border border-border/60 bg-card p-5 ${isFirst ? "ring-1 ring-primary/30 -mt-2 pb-7" : ""
                                    }`}
                            >
                                <div className={`text-2xl font-bold mb-2 ${isFirst ? "text-primary" : "text-muted-foreground"}`}>
                                    #{entry.rank}
                                </div>
                                <Avatar className={`${isFirst ? "h-16 w-16" : "h-12 w-12"} border-2 ${isFirst ? "border-primary/40" : "border-border/50"}`}>
                                    <AvatarImage src={entry.avatar} alt={entry.name} />
                                    <AvatarFallback>{entry.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="mt-2 font-semibold text-sm">{entry.name}</div>
                                <div className="text-[var(--positive)] font-bold text-lg mt-1">
                                    +${entry.pnl.toLocaleString()}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">{entry.winRate}% win rate</div>
                            </div>
                        )
                    })}
                </div>

                {/* Full table */}
                <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
                    {/* Header */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-3 text-xs font-medium text-muted-foreground border-b border-border/40 bg-secondary/30">
                        <div className="col-span-1">#</div>
                        <div className="col-span-3">Trader</div>
                        <div className="col-span-2 text-right">P&L</div>
                        <div className="col-span-2 text-right">Volume</div>
                        <div className="col-span-2 text-right">Win Rate</div>
                        <div className="col-span-2 text-right">Trades</div>
                    </div>

                    {/* Rows */}
                    {leaderboardData.map((entry) => (
                        <div
                            key={entry.rank}
                            className="grid grid-cols-12 gap-4 px-4 py-3.5 items-center border-b border-border/20 last:border-0 hover:bg-secondary/20 transition-colors"
                        >
                            <div className="col-span-1">
                                {entry.rank <= 3 ? (
                                    <span className={`text-sm font-bold ${entry.rank === 1 ? "text-yellow-500" : entry.rank === 2 ? "text-gray-400" : "text-amber-600"}`}>
                                        {entry.rank}
                                    </span>
                                ) : (
                                    <span className="text-sm text-muted-foreground">{entry.rank}</span>
                                )}
                            </div>
                            <div className="col-span-3 flex items-center gap-2.5">
                                <Avatar className="h-8 w-8 border border-border/50">
                                    <AvatarImage src={entry.avatar} alt={entry.name} />
                                    <AvatarFallback>{entry.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">{entry.name}</span>
                            </div>
                            <div className="col-span-2 text-right text-sm font-semibold text-[var(--positive)]">
                                +${entry.pnl.toLocaleString()}
                            </div>
                            <div className="col-span-2 text-right text-sm text-muted-foreground tabular-nums">
                                ${entry.volume.toLocaleString()}
                            </div>
                            <div className="col-span-2 text-right">
                                <Badge variant="outline" className={`text-[10px] ${entry.winRate >= 75
                                    ? "text-[var(--positive)] border-[var(--positive)]/30"
                                    : entry.winRate >= 60
                                        ? "text-primary border-primary/30"
                                        : "text-muted-foreground border-border/60"
                                    }`}>
                                    {entry.winRate}%
                                </Badge>
                            </div>
                            <div className="col-span-2 text-right text-sm text-muted-foreground tabular-nums">
                                {entry.trades}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
