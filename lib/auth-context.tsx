"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export type Position = {
    marketId: string
    marketTitle: string
    outcome: "Yes" | "No"
    shares: number
    avgPrice: number
    currentPrice: number
}

export type Trade = {
    id: string
    type: "buy" | "sell"
    marketId: string
    marketTitle: string
    outcome: "Yes" | "No"
    shares: number
    price: number
    total: number
    timestamp: string
}

type User = {
    id: string
    name: string
    email: string
    balance: number
    positions: Position[]
    trades: Trade[]
}

type AuthContextType = {
    user: User | null
    login: (email: string) => void
    signup: (name: string, email: string) => void
    logout: () => void
    updateBalance: (amount: number) => void
    addPosition: (position: Position) => void
    addTrade: (trade: Omit<Trade, "id" | "timestamp">) => void
    sellPosition: (index: number) => void
    deposit: (amount: number) => void
    withdraw: (amount: number) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

    useEffect(() => {
        const stored = localStorage.getItem("specula_user")
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                if (!parsed.positions) parsed.positions = []
                if (!parsed.trades) parsed.trades = []
                setUser(parsed)
            } catch (e) {
                console.error("Failed to parse user data")
            }
        }
    }, [])

    const saveUser = (u: User) => {
        setUser(u)
        localStorage.setItem("specula_user", JSON.stringify(u))
    }

    const login = (email: string) => {
        const mockUser: User = {
            id: "u_123",
            name: email.split("@")[0],
            email,
            balance: 1000,
            positions: [],
            trades: [],
        }
        saveUser(mockUser)
        router.push("/")
    }

    const signup = (name: string, email: string) => {
        const mockUser: User = {
            id: "u_" + Math.random().toString(36).substr(2, 9),
            name,
            email,
            balance: 1000,
            positions: [],
            trades: [],
        }
        saveUser(mockUser)
        router.push("/")
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("specula_user")
        router.push("/login")
    }

    const updateBalance = (amount: number) => {
        if (!user) return
        saveUser({ ...user, balance: user.balance + amount })
    }

    const addPosition = (newPos: Position) => {
        if (!user) return
        // Merge if same market+outcome exists
        const existing = user.positions.findIndex(
            (p) => p.marketId === newPos.marketId && p.outcome === newPos.outcome
        )
        let updatedPositions: Position[]
        if (existing >= 0) {
            updatedPositions = [...user.positions]
            const old = updatedPositions[existing]
            const totalShares = old.shares + newPos.shares
            const totalCost = old.shares * old.avgPrice + newPos.shares * newPos.avgPrice
            updatedPositions[existing] = {
                ...old,
                shares: totalShares,
                avgPrice: totalCost / totalShares,
                currentPrice: newPos.currentPrice,
            }
        } else {
            updatedPositions = [...user.positions, newPos]
        }
        saveUser({ ...user, positions: updatedPositions })
    }

    const addTrade = (trade: Omit<Trade, "id" | "timestamp">) => {
        if (!user) return
        const newTrade: Trade = {
            ...trade,
            id: "t_" + Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString(),
        }
        saveUser({ ...user, trades: [newTrade, ...user.trades] })
    }

    const sellPosition = (index: number) => {
        if (!user || index < 0 || index >= user.positions.length) return
        const pos = user.positions[index]
        const proceeds = pos.shares * pos.currentPrice
        const updatedPositions = user.positions.filter((_, i) => i !== index)
        saveUser({
            ...user,
            balance: user.balance + proceeds,
            positions: updatedPositions,
        })
    }

    const deposit = (amount: number) => {
        if (!user || amount <= 0) return
        saveUser({ ...user, balance: user.balance + amount })
    }

    const withdraw = (amount: number): boolean => {
        if (!user || amount <= 0 || amount > user.balance) return false
        saveUser({ ...user, balance: user.balance - amount })
        return true
    }

    return (
        <AuthContext.Provider
            value={{ user, login, signup, logout, updateBalance, addPosition, addTrade, sellPosition, deposit, withdraw }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
