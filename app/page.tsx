"use client"

import { useState } from "react"
import FilterView from "@/components/filter-view"
import RouletteView from "@/components/roulette-view"
import BottomNav from "@/components/bottom-nav"
import { RiceBallMascot } from "@/components/cute-mascots"

type Tab = "filter" | "roulette"

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("filter")

  return (
    <main className="relative mx-auto min-h-dvh max-w-lg bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-center gap-2 border-b border-border bg-card/95 backdrop-blur-md px-5 py-2.5">
        <RiceBallMascot size={36} className="shrink-0" />
        <div className="flex items-baseline gap-1.5">
          <h1 className="text-lg font-extrabold tracking-tight text-primary">
            {"Whatever"}
          </h1>
          <span className="text-xs font-semibold text-muted-foreground">
            {"- "}
            {"오늘 뭐 먹지?"}
          </span>
        </div>
      </header>

      {/* Views */}
      <div className="relative">
        {activeTab === "filter" ? <FilterView /> : <RouletteView />}
      </div>

      {/* Bottom Nav */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </main>
  )
}
