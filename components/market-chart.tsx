"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"

const timeRanges = ["1D", "1W", "1M", "ALL"] as const
type TimeRange = typeof timeRanges[number]

function generateMockHistory(currentProb: number, range: TimeRange) {
    const days = range === "1D" ? 1 : range === "1W" ? 7 : range === "1M" ? 30 : 90
    const points = range === "1D" ? 24 : days
    const data = []
    let prob = currentProb

    const now = new Date()

    for (let i = points; i >= 0; i--) {
        const date = new Date(now)
        if (range === "1D") {
            date.setHours(date.getHours() - i)
        } else {
            date.setDate(date.getDate() - i)
        }

        const volatility = range === "1D" ? 3 : range === "1W" ? 5 : 8
        const change = (Math.random() - 0.5) * volatility
        prob = Math.max(1, Math.min(99, prob + change))

        const label = range === "1D"
            ? date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
            : date.toLocaleDateString("en-US", { month: "short", day: "numeric" })

        data.push({
            date: label,
            prob: Number(prob.toFixed(1)),
        })
    }
    data[data.length - 1].prob = currentProb
    return data
}

export function MarketChart({ currentProb, color = "#1ee6a8" }: { currentProb: number, color?: string }) {
    const [range, setRange] = useState<TimeRange>("1M")
    const data = useMemo(() => generateMockHistory(currentProb, range), [currentProb, range])

    return (
        <div className="space-y-3">
            {/* Time range selector */}
            <div className="flex items-center gap-1">
                {timeRanges.map((r) => (
                    <button
                        key={r}
                        onClick={() => setRange(r)}
                        className={cn(
                            "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                            range === r
                                ? "bg-primary/15 text-primary"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        )}
                    >
                        {r}
                    </button>
                ))}
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorProb" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                            minTickGap={40}
                        />
                        <YAxis
                            hide
                            domain={[0, 100]}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "var(--card)",
                                borderColor: "var(--border)",
                                borderRadius: "8px",
                                color: "var(--foreground)"
                            }}
                            itemStyle={{ color: color }}
                            formatter={(value: number) => [`${value}%`, "Probability"]}
                            labelStyle={{ color: "var(--muted-foreground)" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="prob"
                            stroke={color}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorProb)"
                            animationDuration={500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
