"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, Trash2, Shuffle } from "lucide-react"
import { TacoMascot, SparkleIcon, HeartIcon } from "@/components/cute-mascots"

const STORAGE_KEY = "whatever-roulette-foods"

const WHEEL_COLORS = [
  "#F5B7B1", // soft pink
  "#FDEBD0", // cream
  "#D5F5E3", // mint
  "#D6EAF8", // baby blue
  "#F9E79F", // soft yellow
  "#E8DAEF", // lavender
  "#FADBD8", // rose
  "#D4EFDF", // sage
]

function loadFromStorage(): { foods: string[]; checkedFoods: string[] } | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as unknown
    if (!data || typeof data !== "object" || !Array.isArray((data as { foods?: unknown }).foods))
      return null
    const { foods, checkedFoods: storedChecked } = data as {
      foods: unknown
      checkedFoods?: unknown
    }
    const foodsList = Array.isArray(foods)
      ? (foods as unknown[]).filter((f): f is string => typeof f === "string")
      : []
    const checkedList = Array.isArray(storedChecked)
      ? (storedChecked as unknown[]).filter((c): c is string => typeof c === "string")
      : []
    const checkedFiltered = foodsList.length > 0 ? checkedList.filter((c) => foodsList.includes(c)) : []
    const finalFoods = foodsList
    const finalChecked =
      foodsList.length > 0
        ? checkedFiltered.length > 0
          ? checkedFiltered
          : foodsList
        : []
    return { foods: finalFoods, checkedFoods: finalChecked }
  } catch {
    return null
  }
}

interface RouletteViewProps {
  foods: string[]
  onFoodsChange: (foods: string[]) => void
  onGoToFilter: (foodName: string) => void
}

export default function RouletteView({ foods, onFoodsChange, onGoToFilter }: RouletteViewProps) {
  const [checkedFoods, setCheckedFoods] = useState<Set<string>>(new Set(foods))
  const [newFood, setNewFood] = useState("")
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [winner, setWinner] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // foods prop이 바뀌면 (필터에서 추가) checkedFoods에 새 항목 자동 체크
  useEffect(() => {
    setCheckedFoods((prev) => {
      const next = new Set(prev)
      foods.forEach((f) => next.add(f))
      return next
    })
  }, [foods])

  // localStorage 동기화 (checkedFoods 상태만)
  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ foods, checkedFoods: Array.from(checkedFoods) })
      )
    } catch { /* ignore */ }
  }, [foods, checkedFoods])

  const activeFoods = foods.filter((f) => checkedFoods.has(f))

  const addFood = () => {
    const trimmed = newFood.trim()
    if (trimmed && !foods.includes(trimmed)) {
      onFoodsChange([...foods, trimmed])
      setCheckedFoods((prev) => new Set([...prev, trimmed]))
      setNewFood("")
      inputRef.current?.focus()
    }
  }

  const removeFood = (food: string) => {
    onFoodsChange(foods.filter((f) => f !== food))
    setCheckedFoods((prev) => {
      const next = new Set(prev)
      next.delete(food)
      return next
    })
  }

  const toggleCheck = (food: string) => {
    setCheckedFoods((prev) => {
      const next = new Set(prev)
      if (next.has(food)) {
        next.delete(food)
      } else {
        next.add(food)
      }
      return next
    })
  }

  const randomSelect = (count: number) => {
    const shuffled = [...foods].sort(() => Math.random() - 0.5)
    const selected = new Set(shuffled.slice(0, Math.min(count, foods.length)))
    setCheckedFoods(selected)
  }

  const spinWheel = () => {
    if (activeFoods.length < 2 || isSpinning) return
    setWinner(null)
    setIsSpinning(true)

    const spins = 5 + Math.random() * 5
    const extraDegrees = Math.random() * 360
    const totalRotation = spins * 360 + extraDegrees

    setRotation((prev) => prev + totalRotation)

    setTimeout(() => {
      const finalAngle = (rotation + totalRotation) % 360
      const sliceAngle = 360 / activeFoods.length
      const normalizedAngle = (360 - (finalAngle % 360)) % 360
      const winnerIndex = Math.floor(normalizedAngle / sliceAngle) % activeFoods.length
      setWinner(activeFoods[winnerIndex])
      setIsSpinning(false)
    }, 4000)
  }

  return (
    <div className="flex flex-col gap-5 px-5 pt-5 pb-28">
      {/* Title area */}
      <div className="flex flex-col items-center gap-2 rounded-3xl bg-card p-5 border border-border shadow-sm">
        <TacoMascot size={52} className="animate-[bounce_3s_ease-in-out_infinite]" />
        <h2 className="text-xl font-extrabold text-foreground">
          {"룰렛 돌리기"}
        </h2>
        <p className="text-xs font-medium text-muted-foreground text-center">
          {"고민 끝! 돌려서 정하자!"}
        </p>
      </div>

      {/* Roulette Wheel */}
      <div className="relative mx-auto flex items-center justify-center py-2">
        {/* Pointer - cute triangle */}
        <div className="absolute -top-1 z-10 flex flex-col items-center">
          <div className="relative">
            <HeartIcon size={22} className="text-primary drop-shadow-md" />
          </div>
        </div>

        {/* Wheel */}
        <div
          className="relative h-60 w-60 rounded-full border-[5px] border-card overflow-hidden shadow-[0_8px_32px_rgba(232,146,138,0.2),inset_0_0_0_2px_rgba(232,146,138,0.15)]"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning
              ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
              : "none",
          }}
        >
          {activeFoods.length > 0 ? (
            <svg viewBox="0 0 200 200" className="h-full w-full">
              {activeFoods.map((food, i) => {
                const sliceAngle = 360 / activeFoods.length
                const startAngle = i * sliceAngle - 90
                const endAngle = startAngle + sliceAngle
                const startRad = (startAngle * Math.PI) / 180
                const endRad = (endAngle * Math.PI) / 180
                const x1 = 100 + 100 * Math.cos(startRad)
                const y1 = 100 + 100 * Math.sin(startRad)
                const x2 = 100 + 100 * Math.cos(endRad)
                const y2 = 100 + 100 * Math.sin(endRad)
                const largeArc = sliceAngle > 180 ? 1 : 0

                const midAngle = ((startAngle + endAngle) / 2) * (Math.PI / 180)
                const textX = 100 + 58 * Math.cos(midAngle)
                const textY = 100 + 58 * Math.sin(midAngle)
                const textRotation = (startAngle + endAngle) / 2 + 90

                return (
                  <g key={food}>
                    <path
                      d={`M100,100 L${x1},${y1} A100,100 0 ${largeArc},1 ${x2},${y2} Z`}
                      fill={WHEEL_COLORS[i % WHEEL_COLORS.length]}
                      stroke="white"
                      strokeWidth="1"
                    />
                    <text
                      x={textX}
                      y={textY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                      className={`font-bold fill-[#4A3728] ${activeFoods.length > 6 ? "text-[7px]" : "text-[9px]"}`}
                    >
                      {food.length > 5 ? food.slice(0, 5) + "..." : food}
                    </text>
                  </g>
                )
              })}
            </svg>
          ) : (
            <div className="flex h-full items-center justify-center bg-muted">
              <p className="text-sm text-muted-foreground">{"메뉴를 추가해주세요"}</p>
            </div>
          )}
        </div>

        {/* Spin button - center */}
        <button
          onClick={spinWheel}
          disabled={activeFoods.length < 2 || isSpinning}
          className="absolute z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 font-extrabold text-xs transition-all hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSpinning ? (
            <span className="animate-spin">
              <SparkleIcon size={20} />
            </span>
          ) : (
            "SPIN!"
          )}
        </button>
      </div>

      {/* Winner Display */}
      {winner && (
        <div className="mx-auto w-full max-w-sm animate-in fade-in-0 zoom-in-95 rounded-2xl bg-primary p-4 text-center shadow-lg shadow-primary/20 border border-primary/20">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <SparkleIcon size={12} className="text-primary-foreground/60" />
            <p className="text-xs font-bold text-primary-foreground/70 uppercase tracking-wider">
              {"당첨!"}
            </p>
            <SparkleIcon size={12} className="text-primary-foreground/60" />
          </div>
          <p className="text-2xl font-extrabold text-primary-foreground mb-3">
            {winner}
          </p>
          <button
            onClick={() => onGoToFilter(winner)}
            className="flex items-center justify-center gap-1.5 mx-auto rounded-xl bg-primary-foreground/15 hover:bg-primary-foreground/25 px-4 py-2 text-xs font-bold text-primary-foreground transition-all active:scale-95"
          >
            <Shuffle className="h-3.5 w-3.5" />
            {"필터에서 비슷한 메뉴 찾기"}
          </button>
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={newFood}
          onChange={(e) => setNewFood(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addFood()}
          placeholder="메뉴 이름 입력..."
          className="flex-1 rounded-2xl border-2 border-border bg-card px-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:shadow-sm focus:shadow-primary/10"
        />
        <button
          onClick={addFood}
          disabled={!newFood.trim()}
          className="flex items-center gap-1 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-md shadow-primary/15 transition-all hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" />
          <span>{"추가"}</span>
        </button>
      </div>

      {/* Quick Select */}
      <div className="flex gap-2">
        {[3, 5, 7].map((n) => (
          <button
            key={n}
            onClick={() => randomSelect(n)}
            className="flex-1 rounded-2xl border-2 border-border bg-card px-3 py-2.5 text-xs font-bold text-card-foreground transition-all hover:border-primary/30 hover:bg-muted active:scale-95"
          >
            {`랜덤 ${n}개`}
          </button>
        ))}
        <button
          onClick={() => setCheckedFoods(new Set(foods))}
          className="flex-1 rounded-2xl border-2 border-primary/20 bg-primary/5 px-3 py-2.5 text-xs font-bold text-primary transition-all hover:bg-primary/10 active:scale-95"
        >
          {"전체 선택"}
        </button>
      </div>

      {/* Food List */}
      <div className="flex flex-col gap-1.5">
        <p className="mb-1 text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
          <SparkleIcon size={11} className="text-primary/60" />
          {`메뉴 목록 (${activeFoods.length}/${foods.length})`}
        </p>
        {foods.map((food) => (
          <div
            key={food}
            className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3 border border-border transition-colors hover:bg-muted"
          >
            <label className="flex flex-1 cursor-pointer items-center gap-3">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={checkedFoods.has(food)}
                  onChange={() => toggleCheck(food)}
                  className="peer sr-only"
                />
                <div className="h-5 w-5 rounded-lg border-2 border-border bg-card transition-colors peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center">
                  {checkedFoods.has(food) && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span
                className={`text-sm font-semibold transition-colors ${
                  checkedFoods.has(food)
                    ? "text-card-foreground"
                    : "text-muted-foreground line-through"
                }`}
              >
                {food}
              </span>
            </label>
            <button
              onClick={() => removeFood(food)}
              className="rounded-xl p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              aria-label={`${food} 삭제`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
