"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { Loader2, Plus, Minus, X } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DepositModal({ trigger }: { trigger?: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    const [amount, setAmount] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState<string | null>(null)
    const { user, deposit, withdraw } = useAuth()

    const handleDeposit = async () => {
        const val = Number(amount)
        if (val <= 0) return
        setLoading(true)
        await new Promise((r) => setTimeout(r, 600))
        deposit(val)
        setSuccess(`Deposited $${val.toFixed(2)}`)
        setLoading(false)
        setAmount("")
        setTimeout(() => setSuccess(null), 2000)
    }

    const handleWithdraw = async () => {
        const val = Number(amount)
        if (val <= 0) return
        setLoading(true)
        await new Promise((r) => setTimeout(r, 600))
        const ok = withdraw(val)
        if (ok) {
            setSuccess(`Withdrew $${val.toFixed(2)}`)
        } else {
            setSuccess("Insufficient balance")
        }
        setLoading(false)
        setAmount("")
        setTimeout(() => setSuccess(null), 2000)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" size="sm" className="border-primary/40 text-primary hover:bg-primary/10">
                        <Plus className="h-3.5 w-3.5 mr-1" />
                        Funds
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md border-border/60 bg-card">
                <DialogHeader>
                    <DialogTitle>Manage Funds</DialogTitle>
                    <DialogDescription>
                        Current balance: <span className="font-semibold text-foreground">${user?.balance.toFixed(2) ?? "0.00"}</span>
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="deposit" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-secondary">
                        <TabsTrigger value="deposit">
                            <Plus className="h-3.5 w-3.5 mr-1" /> Deposit
                        </TabsTrigger>
                        <TabsTrigger value="withdraw">
                            <Minus className="h-3.5 w-3.5 mr-1" /> Withdraw
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="deposit" className="space-y-4 pt-4">
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
                            {[100, 500, 1000, 5000].map((val) => (
                                <Button
                                    key={val}
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 text-xs border-border/60"
                                    onClick={() => setAmount(val.toString())}
                                >
                                    ${val.toLocaleString()}
                                </Button>
                            ))}
                        </div>
                        {success && <div className="text-sm text-center text-[var(--positive)] font-medium">{success}</div>}
                        <Button
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={handleDeposit}
                            disabled={loading || !amount || Number(amount) <= 0}
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Deposit"}
                        </Button>
                    </TabsContent>

                    <TabsContent value="withdraw" className="space-y-4 pt-4">
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                            <Input
                                type="number"
                                placeholder="0"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                min={0}
                                max={user?.balance ?? 0}
                                className="pl-7 bg-secondary border-input text-lg font-medium"
                            />
                        </div>
                        <div className="flex gap-2">
                            {[100, 500].map((val) => (
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
                        {success && (
                            <div className={`text-sm text-center font-medium ${success.includes("Insufficient") ? "text-[var(--negative)]" : "text-[var(--positive)]"}`}>
                                {success}
                            </div>
                        )}
                        <Button
                            variant="outline"
                            className="w-full border-[var(--negative)]/40 text-[var(--negative)] hover:bg-[var(--negative)]/10"
                            onClick={handleWithdraw}
                            disabled={loading || !amount || Number(amount) <= 0}
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Withdraw"}
                        </Button>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
