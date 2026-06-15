"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { Loader2 } from "lucide-react"

type OutcomeType = "yes" | "no"

export function TradePanel({
    yesPrice,
    noPrice,
    marketId,
    marketTitle
}: {
    yesPrice: number
    noPrice: number
    marketId: string
    marketTitle: string
}) {
    const [selectedOutcome, setSelectedOutcome] = useState<OutcomeType>("yes")
    const [amount, setAmount] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { user, updateBalance, addPosition, addTrade, sellPosition } = useAuth()

    const price = selectedOutcome === "yes" ? yesPrice : noPrice
    const shares = Number(amount || 0) / (price / 100)
    const potentialReturn = amount ? (Number(amount) / (price / 100)) : 0
    const profit = potentialReturn - Number(amount || 0)
    const roi = amount ? (profit / Number(amount)) * 100 : 0

    // Find user's positions for this market
    const userPositions = user?.positions.filter(p => p.marketId === marketId) || []

    const handleBuy = async () => {
        if (!user) {
            alert("Please login to trade")
            return
        }
        const cost = Number(amount)
        if (cost <= 0) return
        if (cost > user.balance) {
            alert("Insufficient balance")
            return
        }

        setIsSubmitting(true)
        await new Promise(r => setTimeout(r, 800))

        updateBalance(-cost)
        addPosition({
            marketId,
            marketTitle,
            outcome: selectedOutcome === "yes" ? "Yes" : "No",
            shares: shares,
            avgPrice: price / 100,
            currentPrice: price / 100
        })
        addTrade({
            type: "buy",
            marketId,
            marketTitle,
            outcome: selectedOutcome === "yes" ? "Yes" : "No",
            shares: shares,
            price: price / 100,
            total: cost
        })

        setIsSubmitting(false)
        setAmount("")
    }

    const handleSell = async (posIndex: number) => {
        if (!user) return
        const globalIndex = user.positions.findIndex(
            (p, i) => p.marketId === marketId && user.positions.slice(0, i + 1).filter(pp => pp.marketId === marketId).length === posIndex + 1
        )
        if (globalIndex < 0) return

        const pos = user.positions[globalIndex]
        setIsSubmitting(true)
        await new Promise(r => setTimeout(r, 800))

        addTrade({
            type: "sell",
            marketId,
            marketTitle,
            outcome: pos.outcome,
            shares: pos.shares,
            price: pos.currentPrice,
            total: pos.shares * pos.currentPrice,
        })
        sellPosition(globalIndex)

        setIsSubmitting(false)
    }

    return (
        <Card className="border-border/60 bg-card">
            <CardHeader className="pb-3">
                <CardTitle>Trade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Tabs defaultValue="buy" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-secondary">
                        <TabsTrigger value="buy">Buy</TabsTrigger>
                        <TabsTrigger value="sell">Sell</TabsTrigger>
                    </TabsList>
                    <TabsContent value="buy" className="space-y-4 pt-4">

                        {/* Toggle Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant={selectedOutcome === "yes" ? "default" : "outline"}
                                className={`h-12 flex-col items-start space-y-1 ${selectedOutcome === "yes"
                                        ? "bg-[var(--positive)] text-white hover:bg-[var(--positive)]/90"
                                        : "border-border/60 hover:bg-[var(--positive)]/10"
                                    }`}
                                onClick={() => setSelectedOutcome("yes")}
                            >
                                <div className="font-semibold text-base">Yes</div>
                                <div className="text-xs opacity-90">{yesPrice}¢</div>
                            </Button>
                            <Button
                                variant={selectedOutcome === "no" ? "default" : "outline"}
                                className={`h-12 flex-col items-start space-y-1 ${selectedOutcome === "no"
                                        ? "bg-[var(--negative)] text-white hover:bg-[var(--negative)]/90"
                                        : "border-border/60 hover:bg-[var(--negative)]/10"
                                    }`}
                                onClick={() => setSelectedOutcome("no")}
                            >
                                <div className="font-semibold text-base">No</div>
                                <div className="text-xs opacity-90">{noPrice}¢</div>
                            </Button>
                        </div>

                        {/* Amount Input */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Amount</span>
                                <span>Balance: ${user?.balance.toFixed(2) ?? "0.00"}</span>
                            </div>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    min={0}
                                    className="pl-7 bg-secondary border-input text-lg font-medium"
                                />
                            </div>
                            <div className="flex gap-2">
                                {[10, 50, 100].map((val) => (
                                    <Button
                                        key={val}
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 text-xs border-border/60"
                                        onClick={() => setAmount(val.toString())}
                                    >
                                        ${val}
                                    </Button>
                                ))}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 text-xs border-border/60"
                                    onClick={() => setAmount(user?.balance.toString() ?? "0")}
                                >
                                    Max
                                </Button>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="rounded-lg bg-secondary p-3 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Avg Price</span>
                                <span>{price}¢</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shares</span>
                                <span>{shares.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Potential Return</span>
                                <span className="text-[var(--positive)] font-medium">
                                    ${potentialReturn.toFixed(2)} <span className="text-xs">({roi.toFixed(0)}%)</span>
                                </span>
                            </div>
                        </div>

                        <Button
                            className="w-full text-lg h-12"
                            onClick={handleBuy}
                            disabled={isSubmitting || !amount || Number(amount) <= 0}
                        >
                            {isSubmitting ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                `Buy ${selectedOutcome.toUpperCase()}`
                            )}
                        </Button>

                    </TabsContent>

                    <TabsContent value="sell" className="space-y-4 pt-4">
                        {userPositions.length === 0 ? (
                            <div className="text-center py-8 space-y-2">
                                <p className="text-sm text-muted-foreground">No positions to sell</p>
                                <p className="text-xs text-muted-foreground/60">Buy shares first to sell them here</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {userPositions.map((pos, i) => {
                                    const value = pos.shares * pos.currentPrice
                                    const cost = pos.shares * pos.avgPrice
                                    const pnl = value - cost
                                    return (
                                        <div key={i} className="rounded-lg bg-secondary p-3 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <div className={`text-sm font-medium ${pos.outcome === "Yes" ? "text-[var(--positive)]" : "text-[var(--negative)]"}`}>
                                                        {pos.outcome}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {pos.shares.toFixed(1)} shares @ {(pos.avgPrice * 100).toFixed(0)}¢
                                                    </div>
                                                </div>
                                                <div className="text-right space-y-0.5">
                                                    <div className="text-sm font-semibold">${value.toFixed(2)}</div>
                                                    <div className={`text-xs ${pnl >= 0 ? "text-[var(--positive)]" : "text-[var(--negative)]"}`}>
                                                        {pnl >= 0 ? "+" : ""}{pnl.toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full border-[var(--negative)]/40 text-[var(--negative)] hover:bg-[var(--negative)]/10"
                                                onClick={() => handleSell(i)}
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : `Sell for $${value.toFixed(2)}`}
                                            </Button>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
