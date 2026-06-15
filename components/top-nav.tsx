"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CircleUser, Search, LogOut, Menu, X, Trophy } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { DepositModal } from "@/components/deposit-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const categories = ["All", "Trending", "New", "Politics", "Sports", "Crypto", "Tech", "Economy", "Finance"]

export function TopNav() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const activeCategory = searchParams.get("category") || "All"
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const setCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (cat === "All") {
      params.delete("category")
    } else {
      params.set("category", cat)
    }
    router.push(`/?${params.toString()}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (searchValue.trim()) {
      params.set("q", searchValue.trim())
    } else {
      params.delete("q")
    }
    router.push(`/?${params.toString()}`)
  }

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
        <form className="relative hidden md:block" onSubmit={handleSearch}>
          <label htmlFor="global-search" className="sr-only">
            Search Specula
          </label>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="global-search"
            placeholder="Search markets..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="h-10 w-full rounded-lg border-input bg-secondary pl-9 text-sm placeholder:text-muted-foreground/70 focus-visible:ring-primary/50"
          />
        </form>

        {/* Right: Links + Profile */}
        <div className="flex items-center justify-end gap-3">
          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/leaderboard" className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1">
              <Trophy className="h-3.5 w-3.5" />
              Ranks
            </Link>

            {user ? (
              <>
                <Link href="/portfolio" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Portfolio
                </Link>
                <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5 border border-border/50">
                  <span className="text-xs text-muted-foreground">Balance</span>
                  <span className="text-sm font-semibold tabular-nums text-foreground">
                    ${user.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <DepositModal />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9 border border-border/50">
                        <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/portfolio">Portfolio</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/leaderboard">Leaderboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => logout()} className="text-red-500 focus:text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/signup">Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/60 bg-card p-4 space-y-3">
          <form onSubmit={handleSearch} className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search markets..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="h-10 w-full rounded-lg border-input bg-secondary pl-9 text-sm"
            />
          </form>
          <div className="flex flex-col gap-2">
            <Link href="/leaderboard" className="text-sm text-muted-foreground hover:text-foreground py-2" onClick={() => setMobileMenuOpen(false)}>
              Leaderboard
            </Link>
            {user ? (
              <>
                <Link href="/portfolio" className="text-sm text-muted-foreground hover:text-foreground py-2" onClick={() => setMobileMenuOpen(false)}>
                  Portfolio
                </Link>
                <div className="text-sm text-foreground py-2">Balance: ${user.balance.toFixed(2)}</div>
                <Button variant="outline" size="sm" onClick={() => { logout(); setMobileMenuOpen(false) }} className="text-red-500 border-red-500/30">
                  Log out
                </Button>
              </>
            ) : (
              <div className="flex gap-2">
                <Button asChild variant="ghost" className="flex-1">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
                </Button>
                <Button asChild className="flex-1 bg-primary text-primary-foreground">
                  <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Categories row */}
      <nav aria-label="Primary categories" className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 overflow-x-auto px-4 py-2 no-scrollbar">
          <div className="mx-auto flex items-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all",
                  activeCategory === c
                    ? "bg-primary/15 text-primary ring-1 ring-primary/20"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
                aria-current={activeCategory === c ? "page" : undefined}
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
