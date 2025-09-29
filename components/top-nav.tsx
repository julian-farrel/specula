"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CircleUser, Search } from "lucide-react"
import { useState } from "react"

const categories = ["Trending", "New", "Politics", "Sports", "Crypto", "Tech", "World", "Geopolitics", "Elections"]

export function TopNav() {
  const [active, setActive] = useState("Trending")

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-card/80 backdrop-blur-md">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-3 items-center gap-4 px-4 py-3">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-primary/20 ring-1 ring-primary/40" aria-hidden />
            <span className="text-sm font-medium text-muted-foreground">Specula</span>
          </Link>
        </div>

        {/* Center: Large Search */}
        <form className="relative">
          <label htmlFor="global-search" className="sr-only">
            Search Specula
          </label>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="global-search"
            placeholder="Search"
            className="h-10 w-full rounded-lg border-input bg-secondary pl-9 text-sm placeholder:text-muted-foreground/70"
          />
        </form>

        {/* Right: Links + Deposit + Profile */}
        <div className="flex items-center justify-end gap-3">
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Portfolio
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Cash
          </Link>
          <Button className="h-9 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">Connect</Button>
          {/* <Avatar className="h-9 w-9">
            <AvatarFallback>
              <CircleUser className="h-5 w-5" />
            </AvatarFallback>
          </Avatar> */}
        </div>
      </div>

      {/* Categories row */}
      <nav aria-label="Primary categories" className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 overflow-x-auto px-4 py-2">
          {/* Center the categories row */}
          <div className="mx-auto flex items-center gap-3">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={cn(
                  "shrink-0 rounded-md px-2.5 py-1 text-sm transition-colors",
                  active === c ? "text-[var(--color-primary)]" : "text-muted-foreground hover:text-foreground",
                )}
                aria-current={active === c ? "page" : undefined}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
