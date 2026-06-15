"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth, type Trade } from "@/lib/auth-context"
import { ArrowDownRight, ArrowUpRight, History } from "lucide-react"

function TradeItem({ trade }: { trade: Trade }) {
    const isBuy = trade.type === "buy"
    const date = new Date(trade.timestamp)
    const timeStr = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })

    return (
        <div className="flex items-center justify-between py-3 border-b border-border/30 last:border-0">
            <div className="flex items-center gap-3">
                <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${isBuy
                        ? "bg-[var(--positive)]/15 text-[var(--positive)]"
                        : "bg-[var(--negative)]/15 text-[var(--negative)]"
                        }`}
                >
                    {isBuy ? (
                        <ArrowDownRight className="h-4 w-4" />
                    ) : (
                        <ArrowUpRight className="h-4 w-4" />
                    )}
                </div>
                <div className="space-y-0.5">
                    <div className="text-sm font-medium line-clamp-1 max-w-[250px]">
                        {trade.marketTitle}
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className={`text-[10px] ${isBuy
                                ? "text-[var(--positive)] border-[var(--positive)]/30"
                                : "text-[var(--negative)] border-[var(--negative)]/30"
                                }`}
                        >
                            {trade.type.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                            {trade.outcome} · {trade.shares.toFixed(1)} shares @ {(trade.price * 100).toFixed(0)}¢
                        </span>
                    </div>
                </div>
            </div>
            <div className="text-right space-y-0.5">
                <div className={`text-sm font-semibold ${isBuy ? "text-[var(--negative)]" : "text-[var(--positive)]"}`}>
                    {isBuy ? "-" : "+"}${trade.total.toFixed(2)}
                </div>
                <div className="text-[10px] text-muted-foreground">{timeStr}</div>
            </div>
        </div>
    )
}

export function ActivityFeed() {
    const { user } = useAuth()
    const trades = user?.trades || []

    if (trades.length === 0) {
        return (
            <div className="rounded-lg border border-border/60 bg-card p-8 text-center">
                <History className="h-8 w-8 mx-auto text-muted-foreground/40 mb-2" />
                <p className="text-sm text-muted-foreground">No trades yet</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Your trading activity will appear here</p>
            </div>
        )
    }

    return (
        <Card className="border-border/60 bg-card">
            <CardContent className="p-4">
                {trades.map((trade) => (
                    <TradeItem key={trade.id} trade={trade} />
                ))}
            </CardContent>
        </Card>
    )
}
