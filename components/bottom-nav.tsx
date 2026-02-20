"use client"

import { Shuffle, RotateCw } from "lucide-react"
import { SparkleIcon } from "@/components/cute-mascots"

type Tab = "filter" | "roulette"

interface BottomNavProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg">
        <button
          onClick={() => onTabChange("filter")}
          className={`relative flex flex-1 flex-col items-center gap-0.5 py-3 transition-colors ${
            activeTab === "filter"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Whatever 추천"
        >
          <div className="relative">
            <Shuffle
              className={`h-5 w-5 transition-transform ${
                activeTab === "filter" ? "scale-110" : ""
              }`}
            />
            {activeTab === "filter" && (
              <SparkleIcon size={8} className="absolute -right-1.5 -top-1.5 text-primary animate-pulse" />
            )}
          </div>
          <span className="text-[10px] font-bold">{"Whatever 추천"}</span>
          {activeTab === "filter" && (
            <div className="absolute bottom-0 h-[3px] w-10 rounded-full bg-primary" />
          )}
        </button>
        <button
          onClick={() => onTabChange("roulette")}
          className={`relative flex flex-1 flex-col items-center gap-0.5 py-3 transition-colors ${
            activeTab === "roulette"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="룰렛 돌리기"
        >
          <div className="relative">
            <RotateCw
              className={`h-5 w-5 transition-transform ${
                activeTab === "roulette" ? "scale-110" : ""
              }`}
            />
            {activeTab === "roulette" && (
              <SparkleIcon size={8} className="absolute -right-1.5 -top-1.5 text-primary animate-pulse" />
            )}
          </div>
          <span className="text-[10px] font-bold">{"룰렛 돌리기"}</span>
          {activeTab === "roulette" && (
            <div className="absolute bottom-0 h-[3px] w-10 rounded-full bg-primary" />
          )}
        </button>
      </div>
    </nav>
  )
}
