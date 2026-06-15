"use client"

import { Button } from "@/components/ui/button"
import { Filter, SortAsc, ListFilter, TrendingUp, Clock, BarChart3 } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const pills = ["All", "Trump Presidency", "Gov Shutdown", "Inflation", "Elections", "Crypto", "Sports", "Tech Earnings"]

export type SortOption = "volume" | "newest" | "probability" | "ending-soon"

export function SubFilterBar() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [active, setActive] = useState("All")
  const currentSort = (searchParams.get("sort") as SortOption) || "volume"

  const setSort = (sort: SortOption) => {
    const params = new URLSearchParams(searchParams.toString())
    if (sort === "volume") {
      params.delete("sort")
    } else {
      params.set("sort", sort)
    }
    router.push(`/?${params.toString()}`)
  }

  const handlePillClick = (pill: string) => {
    setActive(pill)
    const params = new URLSearchParams(searchParams.toString())
    if (pill === "All") {
      params.delete("tag")
    } else {
      params.set("tag", pill)
    }
    router.push(`/?${params.toString()}`)
  }

  return (
    <>
      <div className="border-b border-border/60 bg-secondary/80">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-center gap-3 px-4 py-2">
          {/* Sort dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 border-border/60 bg-transparent gap-1.5">
                <SortAsc className="h-4 w-4" />
                <span className="text-xs hidden sm:inline">
                  {currentSort === "volume" && "Volume"}
                  {currentSort === "newest" && "Newest"}
                  {currentSort === "probability" && "Probability"}
                  {currentSort === "ending-soon" && "Ending Soon"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setSort("volume")} className={currentSort === "volume" ? "text-primary" : ""}>
                <BarChart3 className="mr-2 h-4 w-4" /> Volume
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort("newest")} className={currentSort === "newest" ? "text-primary" : ""}>
                <Clock className="mr-2 h-4 w-4" /> Newest
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort("probability")} className={currentSort === "probability" ? "text-primary" : ""}>
                <TrendingUp className="mr-2 h-4 w-4" /> Probability
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort("ending-soon")} className={currentSort === "ending-soon" ? "text-primary" : ""}>
                <Filter className="mr-2 h-4 w-4" /> Ending Soon
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Pills (same level, scrollable horizontally in one line) */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {pills.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePillClick(p)}
                  className={cn(
                    "shrink-0 rounded-full border px-3 py-1 text-xs transition-colors",
                    active === p
                      ? "border-[var(--color-primary)] bg-[color-mix(in_oklch,var(--color-primary)_18%,transparent)] text-foreground"
                      : "border-border/60 bg-card text-muted-foreground hover:text-foreground",
                  )}
                  aria-pressed={active === p}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
