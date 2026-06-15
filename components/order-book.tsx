"use client"

import { useMemo } from "react"
import { generateOrderBook } from "@/lib/data"
import { cn } from "@/lib/utils"

export function OrderBook({ yesPrice }: { yesPrice: number }) {
    const { bids, asks } = useMemo(() => generateOrderBook(yesPrice), [yesPrice])

    const maxTotal = Math.max(
        ...bids.map((b) => b.total),
        ...asks.map((a) => a.total)
    )

    return (
        <div className="rounded-lg border border-border/60 bg-card p-4 space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Order Book</h3>

            {/* Header */}
            <div className="grid grid-cols-3 text-xs text-muted-foreground pb-1 border-b border-border/40">
                <span>Price</span>
                <span className="text-right">Amount</span>
                <span className="text-right">Total</span>
            </div>

            {/* Asks (sells) — red side */}
            <div className="space-y-0.5">
                {asks.map((entry, i) => (
                    <div key={`ask-${i}`} className="relative grid grid-cols-3 text-xs py-1 px-1 rounded-sm">
                        <div
                            className="absolute inset-0 rounded-sm bg-[var(--negative)]/10"
                            style={{ width: `${(entry.total / maxTotal) * 100}%`, right: 0, left: "auto" }}
                        />
                        <span className="relative text-[var(--negative)] font-mono">{entry.price}¢</span>
                        <span className="relative text-right font-mono text-foreground/70">${entry.amount.toLocaleString()}</span>
                        <span className="relative text-right font-mono text-foreground/50">${entry.total.toLocaleString()}</span>
                    </div>
                ))}
            </div>

            {/* Spread */}
            <div className="flex items-center justify-center gap-2 py-1">
                <div className="h-px flex-1 bg-border/40" />
                <span className="text-[10px] font-mono text-muted-foreground px-2">
                    Spread {Math.abs(100 - yesPrice - (100 - yesPrice + 1))}¢
                </span>
                <div className="h-px flex-1 bg-border/40" />
            </div>

            {/* Bids (buys) — green side */}
            <div className="space-y-0.5">
                {bids.map((entry, i) => (
                    <div key={`bid-${i}`} className="relative grid grid-cols-3 text-xs py-1 px-1 rounded-sm">
                        <div
                            className="absolute inset-0 rounded-sm bg-[var(--positive)]/10"
                            style={{ width: `${(entry.total / maxTotal) * 100}%` }}
                        />
                        <span className="relative text-[var(--positive)] font-mono">{entry.price}¢</span>
                        <span className="relative text-right font-mono text-foreground/70">${entry.amount.toLocaleString()}</span>
                        <span className="relative text-right font-mono text-foreground/50">${entry.total.toLocaleString()}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
