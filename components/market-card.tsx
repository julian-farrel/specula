"use client"

import { useState, useEffect } from "react" // <-- ADDED HOOKS
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RadialGauge } from "./radial-gauge"
import { BarChart3 } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type Outcome = {
  name: string
  pct: number
  type: "yes" | "no" | "other"
}

export type Market = {
  id: string
  title: string
  icon?: string
  leading: number
  outcomes: Outcome[]
  volumeUsd: number
}

function OutcomeRow({ outcome }: { outcome: Outcome }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="text-sm text-foreground/90">{outcome.name}</div>
        <div className="flex items-center gap-2">
          <div className="text-xs tabular-nums text-muted-foreground">{Math.round(outcome.pct)}%</div>
          <Button
            size="sm"
            variant="ghost"
            className={cn(
              "h-6 rounded-md px-2 text-[11px]",
              outcome.type === "yes" &&
                "bg-[var(--color-positive)]/20 text-foreground hover:bg-[var(--color-positive)]/25",
              outcome.type === "no" &&
                "bg-[var(--color-negative)]/20 text-foreground hover:bg-[var(--color-negative)]/25",
              outcome.type === "other" && "bg-primary/15 text-foreground hover:bg-primary/20",
            )}
          >
            {outcome.type === "no" ? "No" : outcome.type === "yes" ? "Yes" : "Buy"}
          </Button>
        </div>
      </div>
      {/* Thin progress bar */}
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn(
            "h-full rounded-full",
            outcome.type === "yes" && "bg-[var(--color-positive)]",
            outcome.type === "no" && "bg-[var(--color-negative)]",
            outcome.type === "other" && "bg-primary",
          )}
          style={{ width: `${outcome.pct}%` }}
        />
      </div>
    </div>
  )
}

export function MarketCard({ market }: { market: Market }) {
  // Create a state to hold the volume string. It's initialized with the plain
  // number so the server and client render the exact same thing initially.
  const [formattedVolume, setFormattedVolume] = useState(market.volumeUsd.toString());

  // This effect runs ONLY on the client, after the component has "hydrated".
  // It then updates the state with the locale-specific formatted number.
  useEffect(() => {
    setFormattedVolume(market.volumeUsd.toLocaleString());
  }, [market.volumeUsd]);

  const yes = market.outcomes.find((o) => o.type === "yes")?.pct ?? 0
  const no = market.outcomes.find((o) => o.type === "no")?.pct ?? 0

  return (
    <div className="group relative">
      <Card
        className="relative overflow-hidden border-border/60 bg-card transition-all duration-200
                   hover:-translate-y-1 hover:border-primary/50 hover:ring-1 hover:ring-primary/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
          <div className="flex items-center gap-3">
            {market.icon ? (
              <Image
                src={market.icon || "/placeholder.svg"}
                alt=""
                width={28}
                height={28}
                className="rounded-md ring-1 ring-border"
              />
            ) : (
              <div className="h-7 w-7 rounded-md bg-primary/15 ring-1 ring-border" aria-hidden />
            )}
            <div className="space-y-1">
              <Badge
                variant="outline"
                className="border-border/60 text-[10px] uppercase tracking-wide text-muted-foreground"
              >
                Binary
              </Badge>
              <h3 className="max-w-[18ch] text-pretty text-sm font-semibold leading-5 text-foreground">
                {market.title}
              </h3>
            </div>
          </div>
          <RadialGauge value={market.leading} label="Leading probability" />
        </CardHeader>

        <CardContent className="space-y-3 p-4 pt-0">
          {market.outcomes.map((o) => (
            <OutcomeRow key={o.name} outcome={o} />
          ))}
          <div className="mt-2 flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              {/* Use the state variable here for a safe, hydration-friendly render */}
              <span className="tabular-nums">${formattedVolume}</span>
              <span>volume</span>
            </div>
            <Button variant="outline" size="sm" className="h-7 rounded-md border-border/60 text-xs bg-transparent">
              View market
            </Button>
          </div>
        </CardContent>
      </Card>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-2 top-1 bottom-1 -z-10 rounded-xl
                   bg-primary/25 opacity-0 blur-xl transition duration-300
                   group-hover:opacity-100"
      />
    </div>
  )
}