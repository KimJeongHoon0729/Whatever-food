"use client"

import { useState, useCallback } from "react"
import FilterView from "@/components/filter-view"
import RouletteView from "@/components/roulette-view"
import BottomNav from "@/components/bottom-nav"
import { RiceBallMascot } from "@/components/cute-mascots"

type Tab = "filter" | "roulette"

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("filter")

  // 룰렛 메뉴 목록 — 공유 상태 (filter → roulette 방향)
  const [rouletteFoods, setRouletteFoods] = useState<string[]>([
    "김치찌개", "짜장면", "초밥", "파스타", "떡볶이", "치킨", "비빔밥", "라멘",
  ])

  // 필터에서 룰렛으로 메뉴 추가
  const addToRoulette = useCallback((foodName: string) => {
    setRouletteFoods((prev) =>
      prev.includes(foodName) ? prev : [...prev, foodName]
    )
  }, [])

  // 룰렛 → 필터 탭 이동 트리거 (당첨 메뉴 이름 전달)
  const [filterFromRoulette, setFilterFromRoulette] = useState<string | null>(null)

  const goToFilterWithFood = useCallback((foodName: string) => {
    setFilterFromRoulette(foodName)
    setActiveTab("filter")
  }, [])

  const clearFilterFromRoulette = useCallback(() => {
    setFilterFromRoulette(null)
  }, [])

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
        {activeTab === "filter" ? (
          <FilterView
            onAddToRoulette={addToRoulette}
            roulettefoods={rouletteFoods}
            highlightFood={filterFromRoulette}
            onClearHighlight={clearFilterFromRoulette}
          />
        ) : (
          <RouletteView
            foods={rouletteFoods}
            onFoodsChange={setRouletteFoods}
            onGoToFilter={goToFilterWithFood}
          />
        )}
      </div>

      {/* Bottom Nav */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </main>
  )
}
