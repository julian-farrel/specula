"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Filter, ListFilter, Search, SortAsc } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const pills = ["All", "Trump Presidency", "Gov Shutdown", "Inflation", "Elections", "Crypto", "Sports", "Tech Earnings"]

export function SubFilterBar() {
  const [active, setActive] = useState("All")

  return (
    <>
      <div className="border-b border-border/60 bg-secondary/80">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-center gap-3 px-4 py-2">
          {/* Small search (same level) */}
          <form className="relative hidden shrink-0 md:block">
            <label htmlFor="sub-search" className="sr-only">
              Search filters
            </label>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="sub-search"
              placeholder="Search markets"
              className="h-9 w-60 rounded-md border-input bg-card pl-9 text-xs placeholder:text-muted-foreground/70"
            />
          </form>

          {/* Filter/Sort icons (same level) */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-9 w-9 border-border/60 bg-transparent">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 border-border/60 bg-transparent">
              <SortAsc className="h-4 w-4" />
              <span className="sr-only">Sort</span>
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 border-border/60 bg-transparent">
              <ListFilter className="h-4 w-4" />
              <span className="sr-only">More filters</span>
            </Button>
          </div>

          {/* Pills (same level, scrollable horizontally in one line) */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 overflow-x-auto">
              {pills.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setActive(p)}
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
