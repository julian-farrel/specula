"use client"

import { useAuth } from "@/lib/auth-context"
import { TopNav } from "@/components/top-nav"
import { PortfolioList } from "@/components/portfolio-list"
import { ActivityFeed } from "@/components/activity-feed"
import { DepositModal } from "@/components/deposit-modal"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"

export default function PortfolioPage() {
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!user) {
                // router.push("/login") 
            }
        }, 500)
        return () => clearTimeout(timeout)
    }, [user, router])

    // We'll show a prompt if not logged in
    if (!user) {
        return (
            <main className="min-h-screen bg-background pb-12">
                <TopNav />
                <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
                    <p className="text-muted-foreground">Please log in to view portfolio</p>
                </div>
            </main>
        )
    }

    const positions = user.positions || []
    const positionsValue = positions.reduce((acc, pos) => acc + (pos.shares * pos.currentPrice), 0)
    const totalValue = user.balance + positionsValue
    const positionsCount = positions.length
    const totalTrades = user.trades?.length || 0

    // Calculate P&L from trades
    const totalBought = user.trades?.filter(t => t.type === "buy").reduce((s, t) => s + t.total, 0) || 0
    const totalSold = user.trades?.filter(t => t.type === "sell").reduce((s, t) => s + t.total, 0) || 0
    const realizedPnl = totalSold - totalBought + positionsValue

    return (
        <main className="min-h-screen bg-background pb-12">
            <TopNav />
            <div className="mx-auto w-full max-w-4xl px-4 py-8 space-y-8">

                {/* Header Stats */}
                <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
                        <h3 className="text-sm font-medium text-muted-foreground">Total Value</h3>
                        <div className="mt-2 text-2xl font-bold tracking-tight text-foreground">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-muted-foreground">Cash Balance</h3>
                            <DepositModal
                                trigger={
                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-primary hover:bg-primary/10">
                                        <Plus className="h-3.5 w-3.5" />
                                    </Button>
                                }
                            />
                        </div>
                        <div className="mt-2 text-2xl font-bold tracking-tight text-foreground">${user.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
                        <h3 className="text-sm font-medium text-muted-foreground">Positions</h3>
                        <div className="mt-2 text-2xl font-bold tracking-tight text-foreground">{positionsCount}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{totalTrades} total trades</div>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
                        <h3 className="text-sm font-medium text-muted-foreground">Position Value</h3>
                        <div className="mt-2 text-2xl font-bold tracking-tight text-foreground">${positionsValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4">Your Positions</h2>
                    <PortfolioList />
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4">Activity History</h2>
                    <ActivityFeed />
                </section>

            </div>
        </main>
    )
}
