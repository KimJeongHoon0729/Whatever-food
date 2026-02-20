"use client"

import { useState, useCallback, useEffect } from "react"
import FilterView from "@/components/filter-view"
import RouletteView from "@/components/roulette-view"
import BottomNav from "@/components/bottom-nav"
import { RiceBallMascot } from "@/components/cute-mascots"
import { Settings, Check, BookOpen } from "lucide-react"
import { Onboarding, useOnboarding } from "@/components/onboarding"

type Tab = "filter" | "roulette"

const DEFAULT_TAB_KEY = "whatever-default-tab"

export default function Home() {
  const { show: showOnboarding, dismiss: dismissOnboarding, resetOnboarding } = useOnboarding()
  const [activeTab, setActiveTab] = useState<Tab>("filter")
  const [showSettings, setShowSettings] = useState(false)
  const [defaultTab, setDefaultTab] = useState<Tab>("filter")

  // 앱 시작 시 저장된 기본 탭 불러오기
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(DEFAULT_TAB_KEY) as Tab | null
      if (saved === "filter" || saved === "roulette") {
        setDefaultTab(saved)
        setActiveTab(saved)
      }
    } catch { /* ignore */ }
  }, [])

  const handleSetDefaultTab = (tab: Tab) => {
    setDefaultTab(tab)
    try {
      window.localStorage.setItem(DEFAULT_TAB_KEY, tab)
    } catch { /* ignore */ }
  }

  // 룰렛 메뉴 목록 — 공유 상태 (filter → roulette 방향)
  const [rouletteFoods, setRouletteFoods] = useState<string[]>([
    "김치찌개", "짜장면", "초밥", "파스타", "떡볶이", "치킨", "비빔밥", "라멘",
  ])

  const addToRoulette = useCallback((foodName: string) => {
    setRouletteFoods((prev) =>
      prev.includes(foodName) ? prev : [...prev, foodName]
    )
  }, [])

  const [filterFromRoulette, setFilterFromRoulette] = useState<string | null>(null)

  const goToFilterWithFood = useCallback((foodName: string) => {
    setFilterFromRoulette(foodName)
    setActiveTab("filter")
  }, [])

  const clearFilterFromRoulette = useCallback(() => {
    setFilterFromRoulette(null)
  }, [])

  return (
    <>
    {showOnboarding && <Onboarding onDone={dismissOnboarding} />}
    <main className="relative mx-auto min-h-dvh max-w-lg bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center border-b border-border bg-card/95 backdrop-blur-md px-5 py-2.5">
        <div className="flex flex-1 items-center justify-center gap-2">
          <RiceBallMascot size={36} className="shrink-0" />
          <div className="flex items-baseline gap-1.5">
            <h1 className="text-lg font-extrabold tracking-tight text-primary">{"Whatever"}</h1>
            <span className="text-xs font-semibold text-muted-foreground">{"- 오늘 뭐 먹지?"}</span>
          </div>
        </div>
        <button
          onClick={() => setShowSettings((v) => !v)}
          className={`shrink-0 rounded-xl p-2 transition-colors ${
            showSettings ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
          aria-label="설정"
        >
          <Settings className="h-4 w-4" />
        </button>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className="animate-in slide-in-from-top-2 fade-in-0 duration-200 border-b border-border bg-card px-5 py-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {"앱 시작 화면"}
          </p>
          <div className="flex gap-2">
            {(["filter", "roulette"] as Tab[]).map((tab) => {
              const isDefault = defaultTab === tab
              const label = tab === "filter" ? "🔀 조건 뽑기" : "🎡 룰렛 돌리기"
              return (
                <button
                  key={tab}
                  onClick={() => handleSetDefaultTab(tab)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-bold transition-all active:scale-95 ${
                    isDefault
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-muted"
                  }`}
                >
                  {isDefault && <Check className="h-3.5 w-3.5 shrink-0" />}
                  {label}
                </button>
              )
            })}
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            {"다음에 앱을 열 때 이 화면으로 시작해요"}
          </p>
          <div className="mt-4 border-t border-border pt-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {"도움말"}
            </p>
            <button
              onClick={() => { resetOnboarding(); setShowSettings(false) }}
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold text-foreground transition-all hover:bg-muted active:scale-95"
            >
              <BookOpen className="h-4 w-4 text-primary" />
              {"사용 설명 다시 보기"}
            </button>
          </div>
        </div>
      )}

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
    </>
  )
}
