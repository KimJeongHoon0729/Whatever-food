"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { DumplingMascot, BowlMascot, SparkleIcon, HeartIcon } from "@/components/cute-mascots"

const FOOD_TYPES = [
  { label: "한식", icon: "🍚" },
  { label: "중식", icon: "🥟" },
  { label: "일식", icon: "🍣" },
  { label: "양식", icon: "🍝" },
  { label: "분식", icon: "🍢" },
  { label: "패스트푸드", icon: "🍔" },
]

const TASTE_TYPES = [
  { label: "매콤한", icon: "🌶️" },
  { label: "얼큰한", icon: "🔥" },
  { label: "단짠단짠", icon: "🍯" },
  { label: "느끼한", icon: "🧈" },
  { label: "깔끔한", icon: "✨" },
]

const FOOD_RECOMMENDATIONS: Record<string, string[]> = {
  "한식": ["김치찌개", "된장찌개", "불고기", "비빔밥", "갈비탕", "잡채", "제육볶음", "삼겹살"],
  "중식": ["짜장면", "짬뽕", "탕수육", "마라탕", "볶음밥", "양장피", "꿔바로우"],
  "일식": ["초밥", "라멘", "돈카츠", "우동", "오코노미야끼", "타코야키", "카레"],
  "양식": ["파스타", "스테이크", "리조또", "피자", "버거", "그라탕", "오믈렛"],
  "분식": ["떡볶이", "순대", "김밥", "라면", "튀김", "오뎅", "쫄면"],
  "패스트푸드": ["치킨", "햄버거", "감자튀김", "핫도그", "타코", "나초"],
}

const FOOD_EMOJIS = ["🍕", "🍜", "🍛", "🍲", "🥘", "🍱", "🌮", "🥗", "🍔", "🍣", "🍝", "🍚", "🥟", "🍢", "🌶️", "🍗"]

export default function FilterView() {
  const [selectedFoods, setSelectedFoods] = useState<string[]>([])
  const [selectedTastes, setSelectedTastes] = useState<string[]>([])
  const [showModal, setShowModal] = useState(false)
  const [recommendation, setRecommendation] = useState({ name: "", emoji: "" })
  const [isAnimating, setIsAnimating] = useState(false)

  const toggleFood = (food: string) => {
    setSelectedFoods((prev) =>
      prev.includes(food) ? prev.filter((f) => f !== food) : [...prev, food]
    )
  }

  const toggleTaste = (taste: string) => {
    setSelectedTastes((prev) =>
      prev.includes(taste) ? prev.filter((t) => t !== taste) : [...prev, taste]
    )
  }

  const getRecommendation = () => {
    const categories = selectedFoods.length > 0 ? selectedFoods : FOOD_TYPES.map((f) => f.label)
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const foods = FOOD_RECOMMENDATIONS[randomCategory] || ["비빔밥"]
    const randomFood = foods[Math.floor(Math.random() * foods.length)]
    const randomEmoji = FOOD_EMOJIS[Math.floor(Math.random() * FOOD_EMOJIS.length)]

    setRecommendation({ name: randomFood, emoji: randomEmoji })
    setIsAnimating(true)
    setShowModal(true)
    setTimeout(() => setIsAnimating(false), 600)
  }

  return (
    <div className="flex flex-col gap-5 px-5 pt-5 pb-28">
      {/* Hero section with mascot */}
      <div className="flex flex-col items-center gap-2 rounded-3xl bg-card p-5 border border-border shadow-sm">
        <div className="flex items-center gap-3">
          <DumplingMascot size={56} className="animate-[bounce_3s_ease-in-out_infinite]" />
          <BowlMascot size={56} className="animate-[bounce_3s_ease-in-out_infinite_0.5s]" />
        </div>
        <h2 className="text-xl font-extrabold text-foreground text-balance text-center">
          {"오늘 땡기는 스타일은?"}
        </h2>
        <p className="text-xs font-medium text-muted-foreground text-center leading-relaxed">
          {"조건을 골라보세요, 나머지는 Whatever이 골라줄게!"}
        </p>
      </div>

      {/* Food Types */}
      <section>
        <div className="mb-3 flex items-center gap-1.5">
          <SparkleIcon size={14} className="text-primary" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {"음식 종류"}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {FOOD_TYPES.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => toggleFood(label)}
              className={`flex items-center gap-1.5 rounded-full border-2 px-3.5 py-2 text-sm font-bold transition-all active:scale-95 ${
                selectedFoods.includes(label)
                  ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "border-border bg-card text-card-foreground hover:border-primary/40 hover:bg-muted"
              }`}
            >
              <span className="text-base">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Taste Types */}
      <section>
        <div className="mb-3 flex items-center gap-1.5">
          <HeartIcon size={14} className="text-primary" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {"맛"}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {TASTE_TYPES.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => toggleTaste(label)}
              className={`flex items-center gap-1.5 rounded-full border-2 px-3.5 py-2 text-sm font-bold transition-all active:scale-95 ${
                selectedTastes.includes(label)
                  ? "border-accent bg-accent text-accent-foreground shadow-md shadow-accent/20"
                  : "border-border bg-card text-card-foreground hover:border-accent/40 hover:bg-muted"
              }`}
            >
              <span className="text-base">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Selected Summary */}
      {(selectedFoods.length > 0 || selectedTastes.length > 0) && (
        <div className="rounded-2xl bg-card p-4 shadow-sm border border-border">
          <p className="mb-2 text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <SparkleIcon size={12} className="text-accent" />
            {"선택한 조건"}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {[...selectedFoods, ...selectedTastes].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recommend Button */}
      <button
        onClick={getRecommendation}
        className="group relative mx-auto w-full max-w-xs overflow-hidden rounded-2xl bg-primary px-6 py-4 text-base font-extrabold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-[0.97]"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <HeartIcon size={18} className="transition-transform group-hover:scale-110" />
          {"메뉴 추천받기"}
        </span>
      </button>

      {/* Result Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-5"
          onClick={() => setShowModal(false)}
        >
          <div
            className={`relative w-full max-w-xs rounded-3xl bg-card p-8 text-center shadow-2xl border border-border ${
              isAnimating ? "animate-in zoom-in-90 fade-in-0 duration-500" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-3 top-3 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Decorative sparkles */}
            <div className="absolute left-4 top-6">
              <SparkleIcon size={12} className="text-primary/40 animate-pulse" />
            </div>
            <div className="absolute right-10 top-8">
              <SparkleIcon size={10} className="text-accent/50 animate-pulse delay-300" />
            </div>

            {/* Emoji + mascot */}
            <div className="mb-3 flex justify-center">
              <div className="relative">
                <span className="text-6xl block animate-bounce">{recommendation.emoji}</span>
              </div>
            </div>

            <p className="text-xs font-bold text-muted-foreground tracking-wide">
              {"오늘의 추천 메뉴는..."}
            </p>
            <h3 className="mt-2 text-3xl font-extrabold text-foreground">
              {recommendation.name}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {"맛있게 먹어요!"}
            </p>

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-xl border-2 border-border bg-card px-4 py-3 text-sm font-bold text-card-foreground transition-all hover:bg-muted active:scale-95"
              >
                {"닫기"}
              </button>
              <button
                onClick={getRecommendation}
                className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg active:scale-95"
              >
                {"다른 거!"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
