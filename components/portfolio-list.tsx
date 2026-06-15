"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"

export function PortfolioList() {
    const { user } = useAuth()
    const positions = user?.positions || []

    if (positions.length === 0) {
        return <div className="text-center text-muted-foreground py-8">No active positions</div>
    }

    return (
        <div className="space-y-3">
            {positions.map((pos, i) => {
                const value = pos.shares * pos.currentPrice
                const cost = pos.shares * pos.avgPrice
                const pnl = value - cost
                const pnlPercent = cost > 0 ? (pnl / cost) * 100 : 0
                const isProfitable = pnl >= 0

                return (
                    <Card key={i} className="border-border/60 bg-card hover:border-primary/40 transition-colors">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="space-y-1">
                                <div className="font-medium line-clamp-1 max-w-[300px]">{pos.marketTitle}</div>
                                <div className="flex gap-2">
                                    <Badge variant="outline" className={pos.outcome === "Yes" ? "text-[var(--positive)] border-[var(--positive)]/30" : "text-[var(--negative)] border-[var(--negative)]/30"}>
                                        {pos.outcome}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">{pos.shares.toFixed(1)} shares</span>
                                </div>
                            </div>
                            <div className="text-right space-y-1">
                                <div className="font-bold">${value.toFixed(2)}</div>
                                <div className={`text-xs ${isProfitable ? "text-[var(--positive)]" : "text-[var(--negative)]"}`}>
                                    {isProfitable ? "+" : ""}{pnl.toFixed(2)} ({pnlPercent.toFixed(1)}%)
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}
